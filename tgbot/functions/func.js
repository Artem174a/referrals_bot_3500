let success = 0,
    error = 0;
const pageid = window.pageid,
    httpBuildQuery = (object) => {
        const params = new URLSearchParams(),
            paramsGenerator = (parent_key, iterate_object) => {
                for (let current_key in iterate_object) {
                    let property_path;
                    if (typeof iterate_object[current_key] == "string" || typeof iterate_object[current_key] == "number") {
                        if (parent_key.length > 0) property_path = parent_key + "[" + current_key + "]";
                        else property_path = current_key;
                        params.append(property_path, iterate_object[current_key])
                    } else if (typeof iterate_object[current_key] == "object") {
                        if (parent_key.length > 0) property_path = parent_key + "[" + current_key + "]";
                        else property_path = current_key;
                        paramsGenerator(property_path, iterate_object[current_key])
                    }
                }
            };
        paramsGenerator("", object);
        return params.toString()
    },
    log = (message = "") => {
        console.clear();
        console.log("%c" + message, "color:#fff;background-color:#fa8669;font-size:large;")
    },
    statistics = (count) => {
        console.clear();
        console.log("%cСоздано: " + success + " из " + count + "; Ошибок: " + error, "color:#fff;background-color:#fa8669;font-size:large;")
    };
$.ajax({
    url: "/page/submit/",
    type: "POST",
    data: {
        comm: "addnewrecord",
        pageid,
        afterid: "",
        tplid: 396
    },
    dataType: "text",
    success: (t) => {
        const recordid = $(t).attr("recordid");
        $.ajax({
            type: "POST",
            url: "/zero/submit/",
            data: httpBuildQuery({
                comm: "savezerocode",
                pageid,
                recordid,
                onlythisfield: "code",
                fromzero: "yes",
            test}),
            dataType: "text",
            success: () => location.reload(),
            error: () => log("Ошибка выполнения запроса на сервере Tilda")
        })
    },
    error: () => log("Ошибка выполнения запроса на сервере Tilda")
});