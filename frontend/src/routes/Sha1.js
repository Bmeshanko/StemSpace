
 class Sha1 {

    static hash(msg, options) {
        const defaults = { msgFormat: 'string', outFormat: 'hex' };
        const opt = Object.assign(defaults, options);

        switch (opt.msgFormat) {
            default: 
            case 'string':   msg = utf8Encode(msg);       break;
            case 'hex-bytes':msg = hexBytesToString(msg); break; // mostly for running tests
        }

        // constants
        const K = [ 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6 ];

        // initial hash value 
        const H = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];

        msg += String.fromCharCode(0x80);  // add trailing '1' bit (+ 0's padding) to string 

        // convert string msg into 512-bit/16-integer blocks arrays of ints
        const l = msg.length/4 + 2; // length (in 32-bit integers) of msg + ‘1’ + appended length
        const N = Math.ceil(l/16);  // number of 16-integer-blocks required to hold 'l' ints
        const M = new Array(N);

        for (let i=0; i<N; i++) {
            M[i] = new Array(16);
            for (let j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
                M[i][j] = (msg.charCodeAt(i*64+j*4+0)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16)
                        | (msg.charCodeAt(i*64+j*4+2)<< 8) | (msg.charCodeAt(i*64+j*4+3)<< 0);
            }
        }
        // add length (in bits) into final pair of 32-bit integers (big-endian) 
        M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14]);
        M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;

        for (let i=0; i<N; i++) {
            const W = new Array(80);

            // 1 - prepare message schedule 'W'
            for (let t=0;  t<16; t++) W[t] = M[i][t];
            for (let t=16; t<80; t++) W[t] = Sha1.ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);

            // 2 - initialise five working variables a, b, c, d, e with previous hash value
            let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4];

            // 3 - main loop (use JavaScript '>>> 0' to emulate UInt32 variables)
            for (let t=0; t<80; t++) {
                const s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
                const T = (Sha1.ROTL(a, 5) + Sha1.f(s, b, c, d) + e + K[s] + W[t]) >>> 0;
                e = d;
                d = c;
                c = Sha1.ROTL(b, 30) >>> 0;
                b = a;
                a = T;
            }

            // 4 - compute the new intermediate hash value
            H[0] = (H[0]+a) >>> 0;
            H[1] = (H[1]+b) >>> 0;
            H[2] = (H[2]+c) >>> 0;
            H[3] = (H[3]+d) >>> 0;
            H[4] = (H[4]+e) >>> 0;
        }

        // convert H0..H4 to hex strings (with leading zeros)
        for (let h=0; h<H.length; h++) H[h] = ('00000000'+H[h].toString(16)).slice(-8);

        // concatenate H0..H4, with separator if required
        const separator = opt.outFormat=='hex-w' ? ' ' : '';

        return H.join(separator);

        function utf8Encode(str) {
            try {
                return new TextEncoder().encode(str, 'utf-8').reduce((prev, curr) => prev + String.fromCharCode(curr), '');
            } catch (e) { // no TextEncoder available?
                return unescape(encodeURIComponent(str)); // monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
            }
        }

        function hexBytesToString(hexStr) { // convert string of hex numbers to a string of chars (eg '616263' -> 'abc').
            const str = hexStr.replace(' ', ''); // allow space-separated groups
            return str=='' ? '' : str.match(/.{2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
        }
    }


    /**
     * Function 'f'
     */
    static f(s, x, y, z)  {
        switch (s) {
            case 0: return (x & y) ^ (~x & z);          // Ch()
            case 1: return  x ^ y  ^  z;                // Parity()
            case 2: return (x & y) ^ (x & z) ^ (y & z); // Maj()
            case 3: return  x ^ y  ^  z;                // Parity()
        }
    }


    /**
     * Rotates left (circular left shift) value x by n positions 
     */
    static ROTL(x, n) {
        return (x<<n) | (x>>>(32-n));
    }

}

export default Sha1;