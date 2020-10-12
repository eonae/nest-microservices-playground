start-app:
	nest start -p units/apps/hybrid-app/tsconfig.build.json -w

produce-commands:
	nest start -p units/apps/client/tsconfig.build.json

produce-events:
	nest start -p units/apps/event-producer/tsconfig.build.json