Another Youtube Player!
===================


Ever found your self having multiple tabs on your browser where most of them are **Youtube** music videos ? I do.

**Yays** allow you to collect & save your favorite youtube music links in one place, this way you will gain more space

----------


Screenshot
-------------

![enter image description here](https://raw.githubusercontent.com/Bahlaouane-Hamza/Yays/master/screenshot.png?Dsfdsf)


> **Note:**


> - Currently, only **OS X** is supported 

#### <i class="icon-file"></i> Add a new link

To quickly add a new link to your collection you can select the link in your browser, hit <kbd>Cmd+C</kbd> & then <kbd>Cmd+G</kbd>.

Or you can drag & drop the link in your collection.

Or just use the add red button at the bottom.


#### <i class="icon-cog"></i> Installation

> **Requirement:**

> - You will need NodeJs installed with NPM from [nodejs.org](https://nodejs.org/)
> - Get Electron from [electron.atom.io](http://electron.atom.io/)
> - One last thing, [Bower.io](http://bower.io/)

Once you are ready, start by cloning the repository
``` Bash
$ git clone https://github.com/Bahlaouane-Hamza/Yays.git
```
 Install NodeJs & Bower dependencies
``` Bash
$ npm install && bower install
```

**Run the app**
``` Bash
$ npm start
```

**Build the app**
``` Bash
$ npm build
```
Make sure to adapt package.json to your needs by changing the targeted platform & architecture


----------

> **Note:** Work in progress!

#### TODO

* Preference panel
* Release with check updates feature 
* Fallback for <kbd>Cmd+G</kbd>
