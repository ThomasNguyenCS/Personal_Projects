(function (ns) {
    //"use strict";
    ns.Util = (ns.Util || {});

    ns.Util.jsonData;
    ns.Util.page = 0;
    ns.Util.pages = 0;
    ns.Util.match = [];

    ns.Util.setkey = function() {
        var str = document.getElementById("input").value;
        sessionStorage.setItem('key', str);
    };

    ns.Util.getkey = function()  {
        let data = sessionStorage.getItem('key');
        document.getElementById("input").value = data;    
    };

    ns.Util.result = function() {  
        var strInput = document.getElementById("input").value;
        
        var resultBlock = "";
        ns.Util.match = [];        
        //filter through the data and put the relevant ones into an array called match
        ns.Util.match = ns.Util.VoViData.filter(function (e) {return e.SearchKeyWord.toLocaleLowerCase().indexOf(strInput.toLocaleLowerCase()) !== -1;});

        ns.Util.pages = Math.floor(ns.Util.match.length / 10 + 1); //variable containing number of pages for pagination

        if(ns.Util.page < (Math.floor(ns.Util.match.length / 10))) //for every page except the last
            for(let m = ns.Util.page*10; m < (ns.Util.page*10+9); m++) {
                ns.Util.PageResult(ns.Util.match[m], m)
            } 
        else{ //last page
            for(let m = ns.Util.match.length - ns.Util.match.length % 10; m < ns.Util.match.length; m++) {
                ns.Util.PageResult(ns.Util.match[m], m)
            }
            for(let n = ns.Util.match.length % 10; n < 9; n++) { //the items on the last page that don't have content. i.e. number of items is not a multiple of 10
                document.getElementById(n).innerHTML = "";
            }   
        } 
        document.getElementById("elements").innerHTML = ns.Util.match.length + " Results";
        ns.Util.pagination(ns.Util.pages);
        return false;
    };

    ns.Util.PageResult = function(m, indexM) {
        var resultBlock = "";
        resultBlock += '<h1><a href="' + m.ItemURL + '" target="_blank">' + m.Title + '</a></h1>\n';
        resultBlock += "<h2>" + m.ItemURL + "</h2>\n";
        resultBlock += "<h4>" + m.Category + "</h4>\n";
        resultBlock += "<h3>" + m.DocDescription + "</h3>";       
        document.getElementById(indexM%10).innerHTML = resultBlock;
        resultBlock = "";
    };

    ns.Util.pagination = function(pages) {
        var nums = "";
        for(let p = 0; p < ns.Util.pages; p++) {
            nums += '<a href="#" onclick="javascript:window.ThuVienVoVi.Util.pageReturn(' + (p) + ')">' + (p+1) + '</a>  ';
        }
        document.getElementById("nums").innerHTML = nums;
    };

    ns.Util.pageReturn = function(n){
        console.log("page clicked: " + n); 
        console.log("global variable page: " + ns.Util.page);  
        
        if(ns.Util.page < n) {
            var diff = n - ns.Util.page;
            console.log("diff: " + diff);
            for(let i = 0; i < diff; i++) {
                ns.Util.next();
            }
        }
        else if(ns.Util.page > n) {
            var diff = ns.Util.page - n;
            console.log("diff: " + diff);
            for(let i = 0; i < diff; i++) {
                ns.Util.prev();
            }
        }
        else if(ns.Util.page == n) {
            console.log("same page!!");
        }
        console.log("global variable page: " + ns.Util.page);
        return false;
    };

    ns.Util.next = function() {
        if(ns.Util.page === (Math.floor(ns.Util.match.length / 10)))  {
            console.log("hullo");
            return false;
        }
        else{
            ns.Util.page++;
            console.log("page#: " + ns.Util.page);
            ns.Util.result();
        }
    };

    ns.Util.prev = function() {
        if(ns.Util.page === 0) {
            console.log("page#: " + ns.Util.page);
            return false;
        }
        else{
            ns.Util.page--;
            console.log("page#: " + ns.Util.page);
            ns.Util.result();
        }
    };

    window.onload = function() {
        ns.Util.getkey();
        ns.Util.result();
    };
})(window.ThuVienVoVi || (window.ThuVienVoVi = {}));
        