"use strict";

let number = 0;
let favorites = []; // お気に入りの投稿を格納する配列
const bbs = document.querySelector('#bbs');
const favoritesArea = document.querySelector('#favorites');

document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {
        method: "POST",
        body:  'name=' + name + '&message=' + message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/post";
    fetch(url, params)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then(response => {
        document.querySelector('#message').value = "";
        document.querySelector('#check').click();
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/check";
    fetch(url, params)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then(response => {
        let value = response.number;

        if (number !== value) {
            const params = {
                method: "POST",
                body: 'start=' + number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            const url = "/read";
            fetch(url, params)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then(response => {
                number += response.messages.length;
                for (let mes of response.messages) {
                    let cover = document.createElement('div');
                    cover.className = 'cover';

                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;

                    let date_area = document.createElement('span');
                    date_area.className = 'date';
                    date_area.innerText = new Date().toLocaleString();

                    let space1 = document.createTextNode('　');
                    let space2 = document.createTextNode('　');
                    

                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;

                    // 絵文字リアクションの追加
                    let reactionsArea = document.createElement('div');
                    reactionsArea.className = 'reactions';
                    let emoji1 = document.createElement('span');
                    emoji1.className = 'reaction';
                    emoji1.innerText = '👍';
                    let emoji1Count = document.createElement('span');
                    emoji1Count.className = 'reaction-count';
                    emoji1Count.innerText = '0';
                    let emoji1Clicks = 0;
                    emoji1.addEventListener('click', () => {
                        emoji1Clicks++;
                        emoji1Count.innerText = emoji1Clicks;
                    });

                    let emoji2 = document.createElement('span');
                    emoji2.className = 'reaction';
                    emoji2.innerText = '❤️';
                    let emoji2Count = document.createElement('span');
                    emoji2Count.className = 'reaction-count';
                    emoji2Count.innerText = '0';
                    let emoji2Clicks = 0;
                    emoji2.addEventListener('click', () => {
                        emoji2Clicks++;
                        emoji2Count.innerText = emoji2Clicks;
                    });

                    let emoji3 = document.createElement('span');
                    emoji3.className = 'reaction';
                    emoji3.innerText = '🙅';
                    let emoji3Count = document.createElement('span');
                    emoji3Count.className = 'reaction-count';
                    emoji3Count.innerText = '0';
                    let emoji3Clicks = 0;
                    emoji3.addEventListener('click', () => {
                        emoji3Clicks++;
                        emoji3Count.innerText = emoji3Clicks;
                    });

                    // メッセージ削除ボタンの追加
                    let deleteButton = document.createElement('button');
                    deleteButton.className = 'delete';
                    deleteButton.innerText = '削除';
                    deleteButton.addEventListener('click', () => {
                        cover.remove();
                    });

                    // 「お気に入り」ボタンの追加
                    let favoriteButton = document.createElement('button');
                    favoriteButton.className = 'favorite';
                    favoriteButton.innerText = 'お気に入り';
                    favoriteButton.addEventListener('click', () => {
                        favoriteButton.innerText = 'お気に入り済み';
                        favoriteButton.disabled = true;

                        // お気に入りリストに追加
                        favorites.push(mes);
                        updateFavorites();
                    });

                    reactionsArea.appendChild(emoji1);
                    reactionsArea.appendChild(emoji1Count);
                    reactionsArea.appendChild(emoji2);
                    reactionsArea.appendChild(emoji2Count);
                    reactionsArea.appendChild(emoji3);
                    reactionsArea.appendChild(emoji3Count);

                    cover.appendChild(favoriteButton);
                    cover.appendChild(space1);
                    cover.appendChild(date_area);
                    cover.appendChild(space2);
                    cover.appendChild(name_area);
                    cover.appendChild(mes_area);
                    cover.appendChild(deleteButton);
                    cover.appendChild(reactionsArea);

                    bbs.appendChild(cover);
                }
            });
        }
    });
});

function updateFavorites() {
    // お気に入り一覧を更新
    favoritesArea.innerHTML = ''; // 既存の一覧をクリア
    for (let favorite of favorites) {
        let favoriteDiv = document.createElement('div');
        favoriteDiv.className = 'favorite-post';
        favoriteDiv.innerText = `${favorite.name} : ${favorite.message}`;
        favoritesArea.appendChild(favoriteDiv);
    }
}
