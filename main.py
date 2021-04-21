# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

import dataInput as dataInput

if __name__ == '__main__':
    filename = "sample-data.txt"
    dataInput.filepathexists(filename)
    dataInput.readfile(filename)
    dataInput.printData()

