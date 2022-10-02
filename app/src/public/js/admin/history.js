$(document).ready(function () {
    const addBtn = document.querySelector("#submit-btn"),
        content = document.querySelector("#input-content"),
        url = document.querySelector("#input-link"),
        date = document.querySelector("#input-date");

    getHistory()
    addBtn.addEventListener("click", addHistory);

    $("#add-history-box-btn").click(function () {
        if($(this).hasClass("on")) {
            closeAdd();
        } else if($(this).hasClass("off")) {
            openAdd();
        }

    });
    $(".on").click(closeAdd());

    function openAdd() {
        $("#add-history-box-btn > i").css("transform","rotateZ(135deg)");
        $(".close").attr("class","open");
        $(".off").attr("class","on");
    };
    function closeAdd() {
        $(".open").attr("class","close");
        $("#add-history-box-btn > i").css("transform","rotateZ(0)");
        $(".on").attr("class","off");
    };
    
    function getHistory() {
        const option = document.querySelector(".selected").id.toString();

        const req = {
            order : option,
        };

        fetch("history/gethistory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((data) => {
            for(const i of data) {
                const card = `
                <div class="history-card" id="${i.historyId}">
                    <div class="history-card-content">
                        <div class="history-icon"><i class="fa-solid fa-shoe-prints"></i></div>
                        <div class="history-content">
                            <div class="history-date">${i.historyDate.slice(5,7) + "월" + " " + i.historyDate.slice(8,10) + "일"}</div>
                            <a href="${i.historyURL}" class="history-title">${i.historyContent}<span class="title-line"></span></a>
                        </div>
                    </div>
                    <div class="history-card-setting">
                        <div class="history-card-setting-right">
                            <div class="history-card-edit edit-btn"><i class="fa-solid fa-pen-to-square"></i></div>
                            <div class="history-card-delete delete-btn"><i class="fa-solid fa-trash-can"></i></div>
                        </div>
                    </div>
                </div>
                `;

                if(i.historyDate.slice(0,4) === "2022") {
                    $("#2022year").append(card);
                } else if(i.historyDate.slice(0,4) === "2021") {
                    $("#2021year").append(card);
                }
            }
            $(".delete-btn").click(function () {
                const info = {
                    id : $(this).parent().parent().parent().attr('id'),
                    type : "delete",
                }
                popup(info);
            });
        })

    };

    function addHistory() {
        const req = {
            content : content.value,
            date : date.value,
            url :  url.value,
        };

        console.log(req);

        fetch("history/addhistory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.success = true) {
                alert("스토리가 포스트되었습니다.");
                location.href=location.href;
            } else {
                alert("다시 시도해주세요.");
                location.href=location.href;
            }
        })
    };

    const popupQuitBtn = document.querySelector("#quit"),
        popupQuitWrapper = document.querySelector("#popup-background"),
        secureId = document.querySelector("#popupId"),
        securePsword = document.querySelector("#popupPsword"),
        secureBtn = document.querySelector("#userCheck-btn");

    popupQuitBtn.addEventListener("click", popdown);
    popupQuitWrapper.addEventListener("click", popdown);

    secureBtn.addEventListener("click", async function() {
        const id = $(".popup").attr('data-id');
        const type = $(".popup").attr('data-type');
        const response = await check();
        if(response.success) {
            if(type === "delete") {
                deleteHistory(id);
            } else if(type === "edit") {
                editHistory(id);
            };
        } else if(!response.success) {
            popdown()
            popup()
        }
    })
    

    function popup(info) {
        $("#popup-background").fadeIn("fast");
        $(".popup").fadeIn("fast");
        $(".popup").attr("data-id" , info.id );
        $(".popup").attr('data-type', info.type);
    };

    function popdown() {
        secureId.value = '';
        securePsword.value = '';
        $("#popup-background").fadeOut("fast");
        $(".popup").fadeOut("fast");
    };


    async function check() {
        const req = {
            id : secureId.value,
            psword : securePsword.value,
        };

        const response = await fetch("user/secure", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) => {
            return res;
        })
        return response;
    }

    async function deleteHistory(id) {
        $(".popup").attr('data-id','');
        popdown()

        const response = confirm("스토리를 삭제하시겠습니까?");
        if(response) {
            const req = {
                id: id,
            };

            fetch("history/deletehistory",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req),
            })
            .then((res) => res.json())
            .then((res) => {
                if(res.success = true) {
                    alert("스토리가 삭제되었습니다.");
                    location.href=location.href;
                } else {
                    alert("다시 시도해주세요.");
                    location.href=location.href;
                }
            })
        } else {
            return false;
        }

    };

    function editHistory(id) {
        console.log("편집하시겠습니까?")
    }
})