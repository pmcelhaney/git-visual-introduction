
<h1>Git Resources</h1>

<h2><a href="presentation.html">HTML5 Visual Presentation</a></h2>
<p>Use space bar to go forward, the 'b' button to go back. Printing will print both the
commands and the script.</p>

<h2><a href="https://github.com/AlexZeitler/gitcheatsheet/raw/7c749a57f180abfe0112071d886296a70f6b4bb8/gitcheatsheet.pdf">Alex Zeitler's Git Cheat Sheet</a></h2>
<p>There are several out there. This one is my favorite.</p>

<h2>My Git Config File</h2>
<pre>
[user]
name = Patrick McElhaney
email = patrick.mcelhaney@ally.com
[core]
editor = mate -w
excludesfile = ~/.gitignore
[color]
diff = auto
status = auto
branch = auto
interactive = auto
ui = true
pager = true
[alias]
todo = !python <a href="http://stevelosh.com/projects/t/" title="t.py script by Steve Losh">/usr/bin/t/t.py</a> --task-dir $(git rev-parse --show-toplevel) --list todo
</pre>

<h2>Git-aware Prompt: Add this to your ~/.bash_profile</h2>
<pre>
export GIT_PS1_SHOWDIRTYSTATE=true
export GIT_PS1_SHOWUNTRACKEDFILES=true
PS1='\n\w$(__git_ps1 " (%s)")\n$ '
</pre>



<h2>More Places to Learn about Git</h2>

<p>Some of my favorite tutorials:</p>

<ul>
    <li><a href="http://gitimmersion.com/" title="Git Immersion - Brought to you by EdgeCase">Git Immersion by EdgeCase</a></li>
    <li><a href="http://tom.preston-werner.com/2009/05/19/the-git-parable.html" title="The Git Parable">The Git Parable</a></li>
    <li><a href="http://help.github.com/">help.github</a></li>
    <li><a href="http://www.kernel.org/pub/software/scm/git/docs/gittutorial.html">Official Git Tutorial</a></li>
</ul>

<h2>Git Blame</h2>
<cite>
<a href="mailto:pmcelhaney@gmail.com">Patrick McElhaney</a><br>
Ally | Senior Web Presentation Architect
</cite>


