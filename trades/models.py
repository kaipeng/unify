from django.db import models

# Create your models here.

class Transaction(models.Model):
	TRANS_TYPE = (
        ('T', 'Trade'),
        ('C', 'Cash'),
        ('A', 'Adjustment'),
    )
    name = models.CharField(max_length=60)
    trans_type = models.CharField(max_length=1, choices=TRANS_TYPE)

class Trade(models.Model):
	BUY = 'B'
	SELL = 'S'
	SELL_SHORT = 'SS'
	SIDE_CHOICES = (
		(BUY, "Buy"),
		(SELL, "Sell"),
		(SELL_SHORT, "Sell Short")
	)

    security_symbol = models.CharField(max_length = 50)
    trade_date = models.DateTimeField('trade date')
    entry_date = models.DateTimeField('entry date')
    modified_date = models.DateTimeField('modified date')
    side = models.CharField(max_length = 2, choices = TRADE_SIDE_CHOICES)
    quantity = models.DecimalField()