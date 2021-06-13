# Automated-Resume-Extraction (BACK-END)
## Installation
To begin install the dependencies.

> npm install

After the dependency installation you will need the following binaries accessible on your path to process pdfs.

#### pdf-to-text:
pdf-to-text is used to extract text out of searchable pdf documents

> npm install -g pdf-to-text

## Download library from above 'Software Folder' for windows  OR

## Ubuntu

 pdf-to-text is included in the poppler-utils library. To installer poppler-utils execute

> sudo apt-get install poppler-utils


## Windows
Important! You will have to add some variables to the PATH of your machine. You do this by right clicking your computer in file explorer, select Properties, select Advanced System Settings, Environment Variables. You can then add the folder that contains the executables to the path variable.

> pdftotext can be installed using the recompiled poppler utils for windows, which have been collected and bundled here: http://blog.alivate.com.au/poppler-windows/ Unpack these in a folder, (example: "C:\poppler-utils") and add this to the PATH.

Everything should work after all this! If not, try restarting to make sure the PATH variables are correctly used.
