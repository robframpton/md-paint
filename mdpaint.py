import os
import platform
import sublime
import sublime_plugin
import subprocess

if platform.system() == 'Darwin':
	os_name = 'osx'
elif  platform.system() == 'Windows':
	os_name = 'windows'
else:
	os_name = 'linux'

BIN_PATH = os.path.join(
	sublime.packages_path(),
	os.path.dirname(os.path.realpath(__file__)),
	'node_modules/md-paint/bin/paint.js'
)

class MarkdownpaintCommand(sublime_plugin.TextCommand):
	def run(self, edit):
		file_path = self.view.file_name()

		return self.node_bridge(BIN_PATH, [file_path])

	def node_bridge(self, bin, args=[]):
		env = None
		startupinfo = None
		if os_name == 'osx':
			env = os.environ.copy()
			env['PATH'] += ':/usr/local/bin'
		elif os_name == 'windows':
			startupinfo = subprocess.STARTUPINFO()
			startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
		try:
			p = subprocess.Popen(
				['node', bin] + args,
				stdout=subprocess.PIPE,
				stdin=subprocess.PIPE,
				stderr=subprocess.PIPE,
				env=env,
				startupinfo=startupinfo
			)
		except OSError:
			raise Exception('Error: Couldn\'t find "node" in "%s"' % env['PATH'])
