import csv


def filepathexists(fileName):
    try:
        file = open(fileName, "r")
        print('File successfully opened')
    except FileNotFoundError:
        print('File cannot be found. Check the path variable and fileName')
    finally:
        file.close()


def readfile(fileName):
    with open(fileName, 'r') as f:
        reader = csv.reader(f, dialect='excel', delimiter=':')
        for row in reader:
            global firstname, lastname, dob, email, mobile, address, occupation
            firstname = row[0]
            lastname = row[1]
            dob = row[2]
            email = row[3]
            mobile = row[4]
            address = row [5]
            occupation = row [6]
            print(row)


def printData():
    print(f'first name is:  {firstname}')
    print(f'last name is:  {lastname}')
    print(f'dob is:  {dob}')
    print(f'email is:  {email}')
    print(f'mobile is:  {mobile}')
    print(f'address is:  {address}')
    print(f'occupation is:  {occupation}')



