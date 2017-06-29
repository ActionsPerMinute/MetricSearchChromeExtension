Metric Search Chrome Extension
==============================
Extension to provide a search functionality in the Metric Browser of Appdynamics. 

Usage
-----

If the search box does not immediately appear in the metric browser, try hiding and showing the metric Tree using the first button

Type in a search term and press enter.
To stop the search, delete the text in the search box.
To clear the results press enter without a search term.

Known Issues
------------

- It causes the bottom of the normal Metric Browser to be unreachable after expanding the tree to the tune of 150px
- It is single threaded, but experiments on local instances did not show any speed up with the metric calls in parrallel; probably due to bad implementation.

To Do
-----

- Allow the search box to appear and be removed with a button
- Test multithreading again
- Potentially open the metric tree at the found entry using a click on the specific entry
- Allow subtrees to be ignored
