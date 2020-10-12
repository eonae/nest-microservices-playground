start-http:
	nest start -p http/tsconfig.build.json -w

start-rabbit:
	nest start -p rabbit/tsconfig.build.json -w

start-client:
	nest start -p client/tsconfig.build.json