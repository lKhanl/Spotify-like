var div = document.getElementById("con");
var xmlHttp = new XMLHttpRequest();
var myArrGlobal;

function showPlaylists(event) {

    if (event.textContent == "sample1") {
        xmlHttp.open('GET', "samples/" + "sample1" + ".json", true)
        xmlHttp.send()
    } else if (event.textContent == "sample2") {
        xmlHttp.open('GET', "samples/" + "sample2" + ".json", true)
        xmlHttp.send()
    } else {
        xmlHttp.open('GET', "samples/" + "sample3" + ".json", true)
        xmlHttp.send()
    }
    div.textContent = ""

    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myArrGlobal = myArr
            show(myArr);
        }
    };
}

// function getNames(txt) {
//     var arr = new Array()
//     var temp = JSON.parse(txt).playlists
//     for (i = 0; i < temp.length; i++) {
//         arr.push(temp[i].name)
//     }
//     return arr;
// }

function show(myArr) {

    div.classList.remove("d-flex")
    for (i = 0; i < myArr.playlists.length; i++) {
        var containerDIV = document.createElement("div")
        containerDIV.className = "row mb-5"
        containerDIV.classList.add(myArr.playlists[i].pid)

        var btn = document.createElement("div")
        btn.className = "btn text-white playlistRow rightBorder"
        btn.classList.add(myArr.playlists[i].pid)
        btn.textContent = ">"
        btn.setAttribute("onclick", "showDetails(this)")

        var label = document.createElement("div")
        label.className = "playlistRow col-3 text-center leftBorder"
        var labelText = document.createTextNode(myArr.playlists[i].name)
        label.appendChild(labelText)
        label.setAttribute("onclick", "getList(this)")

        containerDIV.appendChild(label)
        containerDIV.appendChild(btn)

        div.appendChild(containerDIV)
    }

}
function getList(event) {
    div.textContent = ""
    for (const item of myArrGlobal.playlists) {
        if (item.name == event.textContent) {
            var table = document.createElement("table")
            table.className = "table"
            item.tracks.forEach(element => {
                table.appendChild(getRow(element))
            });
            div.appendChild(table)
        }
    }

}

function getRow(params) {
    var row = document.createElement("tr")

    var index = document.createElement("th")
    var name = document.createElement("th")
    var album = document.createElement("th")

    var index_txt = document.createTextNode(params.pos + 1)
    var name_txt = document.createTextNode(params.artist_name)
    var album_txt = document.createTextNode(params.track_name)

    index.appendChild(index_txt)
    name.appendChild(name_txt)
    album.appendChild(album_txt)

    row.appendChild(index)
    row.appendChild(name)
    row.appendChild(album)

    return row
}

function showDetails(event) {
    var last = event.classList.length - 1
    // var parent = document.
    for (i = 0; i < myArrGlobal.playlists.length; i++) {
        if (myArrGlobal.playlists[i].pid == event.classList[last]) {
            console.log("sadasdasdasd")
        }
    }



}