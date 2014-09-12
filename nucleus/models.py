from django.db import models
from django.contrib.auth.models import User
# Create your models here.


'''

#Securities
class Security(models.Model):
    symbol = models.CharField(max_length=30)
    symbol_drw = models.CharField(max_length=30)
    symbol_clearing = models.CharField(max_length=100)
    symbol_bb = models.CharField(max_length=50)
    suffix_bb = models.CharField(max_length=10)

    description = models.CharField(max_length=500)

    currency = models.ForeignKey('Currency')
    scale = models.DecimalField()
    point_value = models.DecimalField()

    data = models.CharField()

class Stock(Security):
    accrued_interest = models.DecimalField()

class Bond(Security):
    accrued_interest = models.DecimalField()

class Option(Security):
    pass
class Currency(Security):
    pass


#Time Series Data
class Event(models.Model):
    security = models.ForeignKey('Security')
    timestamp = models.DateTimeField()

    type = models.ForeignKey('SecurityType')

    key = models.CharField(max_length=50)
    value = models.CharField(max_length=50)

    data = models.CharField()





class EventType(models.Model):
    name = models.CharField(max_length=30)


#Transactional Data
class Transaction(models.Model):
    security = models.ForeignKey('Security')
    quantity = models.DecimalField()
    price = models.DecimalField()
    activity = models.CharField(max_length=30)
    timestamp = models.DateTimeField()
    settle_date = models.DateTimeField()
    edit_date = models.DateTimeField()

    source = models.ForeignKey('Entity')
    destination = models.ForeignKey('Entity')

    data = models.CharField()

#Calculated Balances


#Need table of rules for filtering trades internally- start generic, can get more granular with custom filters

#Organizational Data
class Entity(models.Model):
    name = models.CharField(max_length=100)

class Clearing(models.Model): #make user
    name = models.CharField(max_length=100)

class Account(models.Model): #make user
    name = models.CharField(max_length=100)
    clearing = models.ForeignKey('Clearing')

class Trader(models.Model): #make user
    name = models.CharField(max_length=50)
    trader_id = models.CharField(max_length=50)
    user = models.ForeignKey('User')

class Desk(models.Model): #attached to strategies
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)

class Strategy(models.Model): #attached to strategies
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    desk = models.ForeignKey('Desk')

class Bundle(models.Model): #attached to strategies
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    strategy = models.ForeignKey('Strategy')

class Tag(models.Model): #attached to trades
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('Tag')
    #creating new -> use dot notation -> recursively create tag hierarchy

class Comment(models.Model): #attached to trades
    body = models.CharField(max_length=1000)
    user = models.ForeignKey('User')

'''