'''import threading
from unify.nucleus import SimpleAsyncSubscription

print "INIT CHAT"
p = threading.Thread(target = SimpleAsyncSubscription.go, args = ())
p.daemon = True

p.start()
'''