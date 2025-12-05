(function () {
    let wpm = 200;
    let typing_text = "";
    let word_list = [];
    const div_words = document.querySelector("div#words");
    if (div_words) {
        const observeCallback = () => {
            const word_elements = div_words.querySelectorAll("div.word");
            if (word_elements.length > 0) {
                observer.disconnect();
                for (const word_element of word_elements) {
                    const characters = word_element.querySelectorAll("letter");
                    let word = "";
                    for (const character of characters) {
                        word += character.textContent;
                    }
                    word_list.push(word);
                    typing_text += word;
                    typing_text += " ";
                }
                const delay = (typing_text.length-1)/(wpm*5)*60/(typing_text.length-2);
                async function sendData() {     
                    fetch("http://127.0.0.1:5000/get_data", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "text": typing_text.slice(0,typing_text.length-1),
                            "delay": delay
                        })
                    });
            }
            sendData();
        }
        

        }
        const observer = new MutationObserver(observeCallback);

        observer.observe(div_words, { childList: true, subtree: true });
    }


})();