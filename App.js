var div = document.getElementById("con");
var xmlHttp = new XMLHttpRequest();
var myArrGlobal;
var lastDetailed = 0;
var colors = ["table-success", "table-danger", "table-warning", "table-info", "table-primary"]

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

    div.classList.remove("row")
    div.classList.add("d-flex")
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
            table.className = "table table-bordered noselect table-hover"

            var row = document.createElement("tr")
            row.className = "thead-dark"

            var th1 = document.createElement("th")
            th1.className = "text-center"
            var th2 = document.createElement("th")
            var th3 = document.createElement("th")

            var txtth1 = document.createTextNode("#")
            var txtth2 = document.createTextNode("Artist Name")
            var txtth3 = document.createTextNode("Track Name")

            th1.appendChild(txtth1)
            th2.appendChild(txtth2)
            th3.appendChild(txtth3)

            row.appendChild(th1)
            row.appendChild(th2)
            row.appendChild(th3)

            table.appendChild(row)
            item.tracks.forEach(element => {
                table.appendChild(getRow(element))
            });
            div.appendChild(table)
        }
    }

}

function getRow(params) {
    var row = document.createElement("tr")
    var rnd = Math.floor(Math.random() * colors.length)
    row.classList.add(colors[rnd])

    var index = document.createElement("th")
    index.className = "text-center"
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
    var parent = document.getElementsByClassName(event.classList[last])[0]
    parent.classList.remove("mb-5")
    for (i = 0; i < myArrGlobal.playlists.length; i++) {
        if (myArrGlobal.playlists[i].pid == event.classList[last]) {

            if (lastDetailed != 0) {
                var removedList = document.getElementsByClassName("list")[0]
                if (!removedList.parentNode.classList.contains("mb-5")) {
                    removedList.parentNode.classList.add("mb-5")
                }
                removedList.remove()
            }
            if (lastDetailed == myArrGlobal.playlists[i].pid) {
                lastDetailed = 0
                break
            }

            var detailContainer = document.createElement("div")
            detailContainer.className = "mt-3 list "
            var table = document.createElement("table")

            var rnd = Math.floor(Math.random() * colors.length)
            table.className = "table table-round noselect text-center"
            table.classList.add(colors[rnd])

            var tr = document.createElement("tr")
            tr.className = "thead-dark"

            var th1 = document.createElement("th")
            var th2 = document.createElement("th")
            var th3 = document.createElement("th")
            var th4 = document.createElement("th")
            var th5 = document.createElement("th")
            var th6 = document.createElement("th")

            var txtTH1 = document.createTextNode("Playlist ID")
            var txtTH2 = document.createTextNode("Number of Tracks")
            var txtTH3 = document.createTextNode("Number of Albums")
            var txtTH4 = document.createTextNode("Number of Followers")
            var txtTH5 = document.createTextNode("Number of Artists")
            var txtTH6 = document.createTextNode("Duration")

            th1.appendChild(txtTH1)
            th2.appendChild(txtTH2)
            th3.appendChild(txtTH3)
            th4.appendChild(txtTH4)
            th5.appendChild(txtTH5)
            th6.appendChild(txtTH6)

            tr.appendChild(th1)
            tr.appendChild(th2)
            tr.appendChild(th3)
            tr.appendChild(th4)
            tr.appendChild(th5)
            tr.appendChild(th6)

            table.appendChild(tr)

            var tr2 = document.createElement("tr")

            var th_1 = document.createElement("th")
            var th_2 = document.createElement("th")
            var th_3 = document.createElement("th")
            var th_4 = document.createElement("th")
            var th_5 = document.createElement("th")
            var th_6 = document.createElement("th")

            var txtTH_1 = document.createTextNode(myArrGlobal.playlists[i].pid)
            var txtTH_2 = document.createTextNode(myArrGlobal.playlists[i].num_tracks)
            var txtTH_3 = document.createTextNode(myArrGlobal.playlists[i].num_albums)
            var txtTH_4 = document.createTextNode(myArrGlobal.playlists[i].num_followers)
            var txtTH_5 = document.createTextNode(myArrGlobal.playlists[i].num_artists)
            var result = Math.floor(myArrGlobal.playlists[i].duration_ms / (1000 * 60 * 60)) + ":" + Math.floor(myArrGlobal.playlists[i].duration_ms / (1000 * 60)) % 60 + ":" + Math.floor(myArrGlobal.playlists[i].duration_ms / 1000) % 60;
            var txtTH_6 = document.createTextNode(result)

            th_1.appendChild(txtTH_1)
            th_2.appendChild(txtTH_2)
            th_3.appendChild(txtTH_3)
            th_4.appendChild(txtTH_4)
            th_5.appendChild(txtTH_5)
            th_6.appendChild(txtTH_6)

            tr2.appendChild(th_1)
            tr2.appendChild(th_2)
            tr2.appendChild(th_3)
            tr2.appendChild(th_4)
            tr2.appendChild(th_5)
            tr2.appendChild(th_6)

            table.appendChild(tr2)

            detailContainer.appendChild(table)
            parent.appendChild(detailContainer)

            lastDetailed = myArrGlobal.playlists[i].pid

        }
    }



}