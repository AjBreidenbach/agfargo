const 
	colors = ['Purple', 'Pink', 'Green', 'Yellow', 'Blue', 'Gray', 'Red', 'Orange'],
	animals = [
	'Zebra', 'Gorilla', 'Elephant', 'Monkey', 'Squirrel', 'Armadillo', 'Grizzly', 'Tomcat', 'Piglet', 'Labrador', 'Stallion', 'Crocodile', 'Kangaroo', 'Pelican', 'Hedgehog', 'Hippo', 'Rhino', 'Mallard', 'Mouse', 'Hamster', 'Stork', 'Gecko', 'Eagle', 'Nightowl', 'Raven', 'Cheetah', 'Lioness', 'Tiger', 'Lynx', 'Goldfish', 'Squid', 'Panda', 'Bullmoose', 'Seaotter', 'Cow', 'Dove', 'Honeybee', 'Lobster', 'Walrus', 'Tadpole', 'Crayfish', 'Wolf', 'Sheep', 'Lemur', 'Ox', 'Yak', 'Bison', 'Bluejay', 'Turkey', 'Rooster', 'Orca', 'Whaleshark', 'Dolphin', 'Ferret', 'Raccoon', 'Penguin', 'Gosling', 'Hare', 'Sealion', 'Fox', 'Cactus', 'Tulip', 'Sunflower', 'Pinetree'
	],
	adjectives = [
	'Jubilant', 'Cheerful', 'Beautiful', 'Artsy', 'Violet', 'Yawning', 'Lazy', 'Hustling', 'Grumpy', 'Thirsty', 'Brave', 'Gentle', 'Jolly', 'Lively', 'Lovely', 'Courteous', 'Polite', 'Proud', 'Silly', 'Witty', 'Chubby', 'Petite', 'Fancy', 'Handsome', 'Scruffy', 'Fluffy', 'Plump', 'Careful', 'Clever', 'Famous', 'Rowdy', 'Charming', 'Clumsy', 'Foolish', 'Friendly', 'Hilarious', 'Hungry', 'Innocent', 'Curious', 'Magnificent', 'Mysterious', 'Naughty', 'Puzzled', 'Bashful', 'Smirking', 'Groggy', 'Uptight', 'Zany', 'Goofy', 'Velvety', 'Interesting', 'Greedy', 'Generous', 'Sophisticated', 'Heartwarming', 'Cynical', 'Toughtful', 'Arrogant', 'Giant', 'Peaceful', 'Stupendous', 'Heroic', 'Awkward', 'Merry'
	],
	cap =32761, //32768,
	prime = 181

function l (x) {console.log(x); return x;}

function bitPosition(n, pos) {return ((n >> pos) & 1)}

function forwardShuffle1(n) {
	return (
		(bitPosition(n, 0)) +
		(bitPosition(n, 1) << 3) +
		(bitPosition(n, 2) << 6) +
		(bitPosition(n, 3) << 9) +
		(bitPosition(n, 4) << 11) +
		(bitPosition(n, 5) << 13) +
		(bitPosition(n, 6) << 1) +
		(bitPosition(n, 7) << 4) +
		(bitPosition(n, 8) << 7) +
		(bitPosition(n, 9) << 2) +
		(bitPosition(n, 10) << 5) +
		(bitPosition(n, 11) << 8) +
		(bitPosition(n, 12) << 10) +
		(bitPosition(n, 13) << 12) +
		(bitPosition(n, 14) << 14)
	)
}

function forwardShuffle2(n) {
	return (n * prime + Math.floor(n / prime)) % cap 
}


function reverseShuffle1(n) {
	return (
		(bitPosition(n, 0)) +
		(bitPosition(n, 3) << 1) +
		(bitPosition(n, 6) << 2) +
		(bitPosition(n, 9) << 3) +
		(bitPosition(n, 11) << 4) +
		(bitPosition(n, 13) << 5) +
		(bitPosition(n, 1) << 6) +
		(bitPosition(n, 4) << 7) +
		(bitPosition(n, 7) << 8) +
		(bitPosition(n, 2) << 9) +
		(bitPosition(n, 5) << 10) +
		(bitPosition(n, 8) << 11) +
		(bitPosition(n, 10) << 12) +
		(bitPosition(n, 12) << 13) +
		(bitPosition(n, 14) << 14)
	)
}

function reverseShuffle2(n) {
	return (
		Math.floor(n / 181) + (n % 181) * 181
	)
}

function reverseShuffle(n) {return reverseShuffle2(reverseShuffle1(n))}
function forwardShuffle(n) {return forwardShuffle1(forwardShuffle2(n))}

function quantifyCodename(s) {
	let m = s.match(/[A-Z]/g)

	if (s.indexOf(' ') != -1)
		s = s.split(/\s/).join('')

	if (s.length <= 4) return parseInt(s, 16)
	else if (m == null? true: m.length < 3){
		let c1 = c2 = c3 = temp = ''
		let a = 0
		do {
			if (s.length == 0) return -1
			c3 = s.slice(-1) + c3
			s = s.slice(0, -1)
			temp = c3.charAt(0).toUpperCase() + (c3.length > 1? c3.slice(1): '')
		} while(!animals.includes(temp) || s.length == 0)
		c3 = temp
		do {
			if (s.length == 0) return -1
			c2 = s.slice (-1) + c2
			s = s.slice (0, -1)
			temp = c2.charAt(0).toUpperCase() + (c2.length > 1? c2.slice(1): '')
		} while(!colors.includes(temp) || s.length == 0)
		c2 = temp
		do {
			if (s.length == 0) return -1
			c1 = s.slice (-1) + c1
			s = s.slice (0, -1)
			temp = c1.charAt(0).toUpperCase() + (c1.length > 1? c1.slice(1): '')
		} while(!adjectives.includes(temp))
		c1 = temp
		return quantifyCodename(c1 + c2 + c3)
	} else {
		let secondCap = 4;
		while(s[secondCap++] >= 'a') ;
		let thirdCap = secondCap + 1
		while(s[thirdCap++] >= 'a') ;
		var 
			r1 = adjectives.indexOf(s.substring(0, secondCap -1)) * 512,
			r2 = colors.indexOf(s.substring(secondCap - 1, thirdCap -1)) * 64,
			r3 = animals.indexOf(s.slice(thirdCap-1))

		return (r1 < 0 || r2 < 0 || r3 < 0 || r1 + r2 + r3 > cap) ? - 1: (r1 + r2 + r3)
	}
}

module.exports.fromCodename = code => {
	let quantified = quantifyCodename(code)
	return quantified >= 0? reverseShuffle(quantified): quantified
}

module.exports.toHex = n =>
	forwardShuffle(n).toString(16)

module.exports.toCodename = n => {
	m = forwardShuffle(n)
	return adjectives[m >> 9] + colors[m >> 6 & 0b111] + animals [m & 0b111111]
}
