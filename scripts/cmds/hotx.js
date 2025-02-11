module.exports = {
	config: {
		name: "hotx",
		aliases: ["hotx"],
		version: "1.0",
		author: "mahi",
		countDown: 5,
		role: 0,
		shortDescription: "send you video hot",
		longDescription: "",
		category: "18+",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [ "https://i.imgur.com/BNtb0sz.mp4",

"https://i.imgur.com/rE7mte5.mp4",

"https://i.imgur.com/UgRS6Ro.mp4",

"https://i.imgur.com/g16JqfD.mp4",

"https://i.imgur.com/jcyDNSo.mp4",

"https://i.imgur.com/GPUM5cv.mp4",

"https://i.imgur.com/g16JqfD.mp4",

"https://i.imgur.com/1wvgM7W.mp4",

"https://i.imgur.com/lDDBFYH.mp4",

"https://i.imgur.com/hwFV9Sq.jpeg",

 "https://i.imgur.com/1wvgM7W.mp4",

"https://i.imgur.com/Ari9P1P.mp4",

"https://i.imgur.com/hIi8LIu.mp4",

"https://i.imgur.com/KfmfA9h.mp4",

"https://i.imgur.com/ehPLuzE.mp4",

"https://i.imgur.com/YDcBZm0.mp4",

"https://i.imgur.com/E0fe2LJ.mp4",


"https://i.imgur.com/2RDEUIR.jpeg",

"https://i.imgur.com/0zyrN4E.mp4",
 
"https://i.imgur.com/56ivnYS.mp4",

"https://i.imgur.com/z0r3Qwq.mp4",

"https://i.imgur.com/FbR9jig.mp4",

"https://i.imgur.com/uPpOLMc.mp4",

"https://i.imgur.com/ETmR1GS.mp4",

"https://i.imgur.com/dLLftVg.mp4"
]

let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: '「 uff baby🥵 」',attachment: await global.utils.getStreamFromURL(img)
})
}
             }