

const title = document.querySelector("#title"),
    image = document.querySelector("#image"),
    previewImage = document.querySelector("#previewImage"),
    content = document.querySelector("#content"),
    submitBtn = document.querySelector("#pass-btn");

image.addEventListener("change", uploadImage);

function uploadImage() {
    let selectImage =  image.files[0];
    const uploadImage = URL.createObjectURL(selectImage);
    previewImage.src = uploadImage;

    const data = new FormData()
    data.append("file", selectImage)
    return data;
}

const boldBtn = document.querySelector("#bold"),
    fontSizeUp = document.querySelector("#fontSizeUp"),
    fontSizeDown = document.querySelector("#fontSizeDown"),
    fontSizeScreen = document.querySelector(".newsAdd-content-toolbar-screen"),
    fontColor = document.querySelector("#fontColor"),
    alignLeft = document.querySelector("#align-left"),
    alignRight = document.querySelector("#align-right"),
    alignCenter = document.querySelector("#align-center"),
    alignJustify = document.querySelector("#align-justify"),
    addImage = document.querySelector("#addImage"),
    addLink = document.querySelector("#addLink");

var fontSize = 3;

fontSizeScreen.textContent = fontSize;

boldBtn.addEventListener('click', function () {
    setStyle('bold');
});
fontSizeUp.addEventListener('click', function () {
    if(fontSize >= 7) {
        fontSize = 7;
    } else {
        fontSize = fontSize + 1;
    }
    fontSizeScreen.textContent = fontSize;
    setStyleFont('fontSize',fontSize);
});
fontSizeDown.addEventListener('click', function () {
    if(fontSize <= 1) {
        fontSize = 1;
    } else {
        fontSize = fontSize - 1;
    }
    fontSizeScreen.textContent = fontSize;
    setStyleFont('fontSize',fontSize);
});
alignLeft.addEventListener('click', function () {
    setStyle('justifyLeft');
});
alignRight.addEventListener('click', function () {
    setStyle('justifyRight');
});
alignCenter.addEventListener('click', function () {
    setStyle('justifyCenter');
});
alignJustify.addEventListener('click', function () {
    setStyle('justifyFull');
});
addLink.addEventListener('click', function () {
    const link = prompt("링크를 입력해주세요");
    setStyleLink('createLink', link);
});

function focusEditor() {
    content.focus({preventScroll: true});
}

content.addEventListener('keydown', function () {
    checkStyle();
});
content.addEventListener('mousedown', function () {
    checkStyle();
});

function setStyle(style) {
    document.execCommand(style);
    focusEditor();
    checkStyle();
};
function setStyleFont(style, size) {
    document.execCommand(style, false, size);
    focusEditor();
    checkStyle();
}
function setStyleLink(style, URL) {
    document.execCommand(style, false, URL);
    focusEditor();
    checkStyle();
}

function checkStyle() {
    if (isStyle('bold')) {
        boldBtn.classList.add('active');
    } else {
        boldBtn.classList.remove('active');
    };
    if (isStyle('justifyLeft')) {
        alignLeft.classList.add('active');
    } else {
        alignLeft.classList.remove('active');
    };
    if (isStyle('justifyRight')) {
        alignRight.classList.add('active');
    } else {
        alignRight.classList.remove('active');
    };
    if (isStyle('justifyCenter')) {
        alignCenter.classList.add('active');
    } else {
        alignCenter.classList.remove('active');
    };
    if (isStyle('justifyFull')) {
        alignJustify.classList.add('active');
    } else {
        alignJustify.classList.remove('active');
    };
};

function isStyle(style) {
    return document.queryCommandState(style);
};



submitBtn.addEventListener("click", submit);

function submit() {
    const req = {
        title : title.value,
        image : uploadImage(),
        content : content.innerHTML,
    }

    console.log(req)

    fetch("/admin/newsAdd/submit", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(req),
    })
}


