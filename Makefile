start-http:
	nest start -p units/apps/http/tsconfig.build.json -w

start-rabbit:
	nest start -p units/apps/rabbit/tsconfig.build.json -w

start-client:
	nest start -p units/apps/client/tsconfig.build.json