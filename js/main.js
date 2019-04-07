$('#subButton').on('click', function (e) {
    // gather all checked radio-button values
    var choices = $("input[type='radio']:checked").map(function (i, radio) {
        return $(radio).val();
    }).toArray();
    // now you have an array of choices = ["valueofradiobox1", "valueofradiobox2", "valueofradiobox2"]
    // you'll need to do some calculations with this
    // a naive approach would be to just choose the most common option - seems reasonable
});