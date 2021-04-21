# History: 21-04-2021
# Version 1.0.0
# dataInput.py file is main to act as the layer for users to provide their
# data. This layer should only be concerned in obtaining and storing data.


import csv
from passlib.hash import pbkdf2_sha256
from datetime import date
user_counter = 0


def create_account(_firstname, _lastname, _email, password):
    # print(_firstname, _lastname, _email, password)
    # print(hash)
    # print(pbkdf2_sha256.verify(password, hash))

    hash = pbkdf2_sha256.hash(password)

    global user_counter
    user_counter += 1

    my_list = [str(user_counter), _firstname, _lastname, _email, hash, "\n"]
    my_string = ':'.join(my_list)

    file = open("stored-accounts.txt", "a")
    file.write(my_string)
    file.close()


def manual_checking_in(_firstname, _lastname, _email, _mobile, _location):

    today = date.today()

    my_list = [_firstname, _lastname, _email, str(_mobile), _location, str(today)]
    my_string = ':'.join(my_list)

    file = open("checking_in_records.txt", "a")
    file.write(my_string)
    file.close()


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
            address = row[5]
            occupation = row[6]
            print(row)


def printData():
    print(f'first name is:  {firstname}')
    print(f'last name is:  {lastname}')
    print(f'dob is:  {dob}')
    print(f'email is:  {email}')
    print(f'mobile is:  {mobile}')
    print(f'address is:  {address}')
    print(f'occupation is:  {occupation}')
