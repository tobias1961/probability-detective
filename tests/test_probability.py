def expected(p, points): return p * points
def fair(ap, apts, bp, bpts): return abs(expected(ap,apts)-expected(bp,bpts)) < 1e-12
assert expected(.5,3)==1.5
assert fair(.5,3,.5,3)
assert not fair(.5,4,.5,3)
assert all(1 <= x <= 6 for x in range(1,7))
print("PASS: probability domain calculations/state")
