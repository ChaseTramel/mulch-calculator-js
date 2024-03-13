document.addEventListener("DOMContentLoaded", function() {
    // Set the default values of the editForm inputs
    document.getElementById("editBagSizeCbYd").value = bagSizeCbYd;
    document.getElementById("editBagPriceUSD").value = bagPriceUSD;
    document.getElementById("calculate").addEventListener("click", function() {
        var lengthFt = document.getElementById("length").value;
        var widthFt = document.getElementById("width").value;
        var depthIn = document.getElementById("depth").value;        
        calculator(lengthFt, widthFt, depthIn, bagSizeCbYd, bagPriceUSD);
    });
    document.getElementById("editForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from being submitted normally
        bagSizeCbYd = document.getElementById("editBagSizeCbYd").value;
        bagPriceUSD = document.getElementById("editBagPriceUSD").value;
        document.getElementById("results").hidden = true; // hide the results
        document.getElementById("calculate").value = "Calculate With New Info!";
        document.getElementById("editForm").hidden = true; // hide the form
    });
    document.getElementById("editLink").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the link from navigating to a new page
        var editForm = document.getElementById("editForm");
        // If the form is hidden, show it; if it's visible, hide it
        if (editForm.hidden) {
            editForm.hidden = false;
        } else {
            editForm.hidden = true;
        }
    });
});

var bagSizeCbYd = 0.5;
var bagPriceUSD = 10.99

function roundNumber(number) {
    return Math.round(number * 100) / 100;
}

function validateInput (lengthFt, widthFt, depthIn) {
    if (lengthFt > 0 && widthFt > 0 && depthIn > 0) {
        console.log("Valid data." + lengthFt + widthFt + depthIn);
        return true;
    } else {
        console.log("Invalid data" + lengthFt + widthFt + depthIn);
        return false;
    }
}

function findVolumeSqYd(lengthFt, widthFt, depthIn) {
    var volumeCuFt = lengthFt * widthFt * (depthIn / 12);
    var volumeCuYd = volumeCuFt / 27;
    return volumeCuYd;
}

function findBags(volumeCuYd) {
    var numberBags = Math.ceil(volumeCuYd / bagSizeCbYd);
    return numberBags;
}

function findPrice(numberBags) {
    var totalPrice = numberBags * bagPriceUSD;
    return roundNumber(totalPrice);
}   

function updateUI(isValid, lengthFt, widthFt, depthIn, volumeCbYd, numberBags, totalPrice, bagSizeCbYd) {
    if (isValid) {
        document.getElementById("outputOne").innerHTML = "Thank you for using our calculator. ";
        document.getElementById("outputTwo").innerHTML = "You said your space is " + lengthFt + " feet long, " + widthFt + " feet wide, and " + depthIn + " inches deep. ";
        document.getElementById("outputThree").innerHTML = "The volume of that space is " + roundNumber(volumeCbYd) + " cubic yards. ";
        document.getElementById("outputFour").innerHTML = "You need to buy " + roundNumber(numberBags) + " bags, as they cover " + bagSizeCbYd + " cubic yards each. ";
        document.getElementById("outputFive").innerHTML = "At $" + bagPriceUSD + " a bag, this will cost $" + roundNumber(totalPrice) + ". ";
        document.getElementById("results").hidden = false;
        document.getElementById("bookmarkPrompt").hidden = false
    } else {
        // handle invalid input
    }
}



function calculator(lengthFt, widthFt, depthIn, bagSizeCbYd, bagPriceUSD) {
    if (validateInput(lengthFt, widthFt, depthIn)) {
        volumeCbYd = findVolumeSqYd(lengthFt, widthFt, depthIn);
        numberBags = findBags(volumeCbYd, bagSizeCbYd);
        totalPrice = findPrice(numberBags)
        updateUI(true, lengthFt, widthFt, depthIn, volumeCbYd, numberBags, totalPrice, bagSizeCbYd);
    } else {
        console.log("Invalid data.");
        updateUI(false);
    }
}