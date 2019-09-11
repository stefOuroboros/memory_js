const listImages = [
    "front1.svg",
    "front2.svg",
    "front3.svg",
    "front4.svg",
    "front5.svg",
    "front6.svg",
    "front7.svg",
    "front8.svg",
    "front9.svg",
    "front10.svg"
]

export function getRandomListImages(numberImages) {
    let randomList = [];

    if (numberImages < 2 || numberImages > listImages.length) {
        console.error("Parameter 'numberImages on getRandomList is too lower or ")
    }
    while (randomList.length < numberImages) {
        let chooseImage = listImages[Math.floor(Math.random()*listImages.length)];
        if (randomList.indexOf(chooseImage) === -1) {
            randomList.push(chooseImage);
        }
    }
    return randomList;
}