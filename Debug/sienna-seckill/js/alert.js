/**
 * Created by Spencer-JD on 15/9/2.
 */
function showAlert(alert, tittle, content) {
    $("#" + alert).show();

    if (tittle != null) {
        $("#" + alert + "-tittle").html(tittle);
    }
    if (content != null) {
        $("#" + alert + "-message").html(content);
    }

    $("#" + alert + "-bg").click(function () {
        console.log("#" + alert + "-bg");
        closeAlert(alert);
    });
    console.log("show finish" + "#" + alert + "-bg");
}

function closeAlert(alert) {
    $("#" + alert).hide();
}

