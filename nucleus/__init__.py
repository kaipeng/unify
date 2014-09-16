'''
import threading
import SimpleAsyncSubscription

print "INIT BLOOMBERG"
p = threading.Thread(target = SimpleAsyncSubscription.go, args = ())
p.daemon = True
p.start()
'''