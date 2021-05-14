import sqlite3
import shutil

#make duplicate of current db just in case
original = r'db.sqlite3'
backup = r'db_backup.sqlite3'
shutil.copyfile(original,backup)


con = sqlite3.connect('db.sqlite3')
c = con.cursor()



#
def createPostCode():



    #NSW
    for i in range(1000,2600):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'NSW')" % i)
    for i in range(2619,2900):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'NSW')" % i)
    for i in range(2921,3000):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'NSW')" % i)
    #ACT
    for i in range(200,300):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('0%d', 'ACT')" % i)
    for i in range(2600,2619):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'ACT')" % i) 
    for i in range(2900,2920):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'ACT')" % i)
    #VIC
    for i in range(3000,4000):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'VIC')" % i)
    for i in range(8000,9000):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'VIC')" % i)
    #QLD
    for i in range(4000,5000):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'VIC')" % i)
    for i in range(9000,10000):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'VIC')" % i)
    #SA
    for i in range(5000,5800):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'VIC')" % i)
    for i in range(5800,6000):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'VIC')" % i)
    #WA
    for i in range(6000,6798):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'VIC')" % i)
    for i in range(6800,7000):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'VIC')" % i)
    #TAS
    for i in range(7000,8000):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('%d', 'VIC')" % i)
    #NT
    for i in range(800,1000):
        c.execute("INSERT INTO visitinfo_postcode VALUES ('0%d', 'VIC')" % i)


createPostCode()

print("done?")
for i in c.execute('select * FROM visitinfo_postcode;'):
    print(i)

con.commit()
c.close()



#def createStreet():




# def createAddress():


# def createLocations():


# def createUsers():


# def createVisits():


# def createDependants():


