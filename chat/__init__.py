import SimpleAsyncSubscription, threading
print "INIT CHAT"
p = threading.Thread(target = SimpleAsyncSubscription.go, args = ())
p.daemon = True

p.start()
