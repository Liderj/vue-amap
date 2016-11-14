.PHONY: dist test

dev:
	@npm start

faas:deploy
	@npm run faas

dist:
	@npm run build

deploy:
	@npm run deploy

test:
	@npm test
