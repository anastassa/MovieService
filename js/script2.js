class OfflineCatalog {
    getFilmList() {
        let filmListJson = localStorage.getItem("offlineFilmList");
        if (filmListJson !== null) {
            return JSON.parse(filmListJson);
        }
        return [];
    }

    deleteFromFilmList(id) {
        let filmList = this.getFilmList();
        const index = filmList.findIndex(n => n.id === id);
        filmList.splice(index, 1);
        localStorage.setItem('offlineFilmList', JSON.stringify(filmList));
        this.renderCatalogByFilter();
    }

    renderCatalogByFilter() {
        let filmList = this.getFilmList();
        let country = document.getElementById("country-filter").value;
        let genre = document.getElementById("genre-filter").value;
        let yearFrom = document.getElementById("yearFrom-filter").value;
        let yearTo = document.getElementById("yearTo-filter").value;

        if (country !== "0") {
            filmList = filmList.filter(n => n.country === country);
        }
        if (genre !== "0") {
            filmList = filmList.filter(n => n.genre === genre);
        }
        if (yearFrom !== "" || yearTo !== "") {
            filmList = filmList.filter(n => n.releaseDate <= yearTo && n.releaseDate >= yearFrom);
        }
        this.catalogRender(filmList);
    }

    catalogRender(filmList) {
        let htmlCatalog = '';
        if (filmList.length > 0) {
            filmList.forEach(({
                                  id,
                                  name,
                                  country,
                                  genre,
                                  screenwriter,
                                  producer,
                                  operator,
                                  composer,
                                  budget,
                                  worldFees,
                                  ageRate,
                                  filmLength,
                                  releaseDate,
                                  posterUrl,
                                  director
                              }) => {
                htmlCatalog += `
                <li class="catalog-element">
                    <span class="catalog-element__name">${name}</span>
                    <img class="catalog-element__img" src="${posterUrl}" />
                    <span class="catalog-element__description">????????????: ${countries.find(item => item.id == country).country}</span>
                    <span class="catalog-element__description">????????: ${genres.find(item => item.id == genre).genre}</span>
                    <span class="catalog-element__description">??????????????: ${director}</span>
                    <span class="catalog-element__description">??????????????????: ${screenwriter}</span>
                    <span class="catalog-element__description">????????????????: ${producer}</span>
                    <span class="catalog-element__description">????????????????: ${operator}</span>
                    <span class="catalog-element__description">????????????????????: ${composer}</span>
                    <span class="catalog-element__description">????????????: ${budget}</span>
                    <span class="catalog-element__description">?????????????? ??????????: ${worldFees}</span>
                    <span class="catalog-element__description">???????????????????? ??????????????: ${ageRate}</span>
                    <span class="catalog-element__description">????????????????????????: ${filmLength}</span>
                    <span class="catalog-element__description">???????? ????????????: ${releaseDate}</span>
                    <div id="buttons">
                        <button class="catalog-element__btn" onclick="commentMethods.renderCommentList('${id}','${name}')">???????????????? ????????????????</button>
                        <button class="catalog-element__btn" onclick="commentMethods.renderAddComment('${id}')">???????????????? ????????????????</button>
                        <button class="catalog-element__btn" onclick="offlineCatalog.deleteFromFilmList('${id}')">?????????????? ??????????</button>
                    </div>
                </li>
            `;
            });
            document.getElementById('catalog').innerHTML = `
            <ul class="catalog-container">
                ${htmlCatalog}
            </ul>
        `;
        } else {
            document.getElementById('catalog').innerHTML = `
            <ul class="catalog-container">
                <h1>???????????? ???? ??????????????</h1>
            </ul>
        `;
        }
    }
}

const offlineCatalog = new OfflineCatalog();
filter.filterRender();
offlineCatalog.renderCatalogByFilter();

/*????????????????*/

class Comment {
    constructor(filmId, name, job, text, grade) {
        this.id = Math.random().toString(16).slice(2);
        this.filmId = filmId;
        this.name = name;
        this.job = job;
        this.text = text;
        this.grade = grade;
    }
}

class CommentMethods {

    getCommentList() {
        let commentListJson = localStorage.getItem("commentList");
        if (commentListJson !== null) {
            return JSON.parse(commentListJson);
        }
        return [];
    }

    getCommentToFilmList(filmId) {
        let commentList = this.getCommentList();
        return commentList.filter(n => n.filmId === filmId);
    }

    addCommentToFilm(filmId) {
        let commentList = this.getCommentList();
        let form = document.forms.newcomment_form;
        let comment = new Comment(
            filmId,
            form.userName.value,
            form.userJob.value,
            form.userText.value,
            form.userGrade.value
        );
        if (comment.name !== '' && comment.job !== "" && comment.text !== "") {
            commentList.push(comment);
            localStorage.setItem("commentList", JSON.stringify(commentList));
        }
        document.getElementById('newcomment').innerHTML = ``;
    }

    closeCommentList() {
        document.getElementById('comment').innerHTML = ``;
    }

    renderCommentList(filmId, name) {
        let htmlComment = '';
        const commentList = this.getCommentToFilmList(filmId);
        if (commentList.length > 0) {
            commentList.forEach(({name, job, text, grade}) => {
                htmlComment += `
                <div class="comment-element">
                    <div class="comment__name">(${grade}) ${name}, ${job}</div>
                    <div class="comment__text">${text}</div>
                </div>
            `;
            });
            document.getElementById('comment').innerHTML = `
            <div id="comment_container" class="comment">
                <span class="comment__title">???????????????? ????????????????</span>
                <div>
                    ${htmlComment}
                </div>
                <button class="comment__btn" onclick="commentMethods.closeCommentList()">??????????????</button>
            </div>
        `;
        } else {
            document.getElementById('comment').innerHTML = `
            <div id="comment_container" class="comment">
                <span class="comment__title">???????????????? ????????????????</span>
                <div>
                    <div class="comment-element">
                        <div class="comment__name">???????????????? ??????????????????????</div>
                    </div>
                </div>
                <button class="comment__btn" onclick="commentMethods.closeCommentList()">??????????????</button>
            </div>
        `;
        }
    }

    renderAddComment(filmId) {
        document.getElementById('newcomment').innerHTML = `
            <div id="newcomment_container" class="comment">
                <span class="comment__title">???????????????? ????????????????</span>
                <form id="newcomment_form">
                    <input type="text" id="userName" placeholder="??????" required>
                    <div class="split"></div>
                    <input type="text" id="userJob" placeholder="?????? ????????????????????????" required>
                    <div class="split"></div>
                    <input type="text" id="userText" placeholder="??????????" required>
                    <div class="split"></div>
                    <select id="userGrade">
                        <option value="????????????????????????">????????????????????</option>
                        <option value="????????????????????">?????????????????????? ??????????????????</option>
                        <option value="????????????????????????">???? ????????????????????</option>
                    </select>
                </form>
                <button class="comment__btn" onclick="commentMethods.addCommentToFilm('${filmId}')">??????????????????</button>
            </div>
            `;
    }


    deleteFromCommentList(id) {
        let commentList = this.getcommentList();
        const index = commentList.findIndex(n => n.id === id);
        commentList.splice(index, 1);
        localStorage.setItem('offlinecommentList', JSON.stringify(commentList));
    }

}

const commentMethods = new CommentMethods();