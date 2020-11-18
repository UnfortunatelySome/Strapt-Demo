if(document.getElementById('submit-btn')) {
    console.log('here');
    document.getElementById('submit-btn').addEventListener("click", writeReview);

}

let storage = window.localStorage;

var customerReviews = [
    {
        "rating" : 5,
        "review" : "This dispenser was a life saver!"
    }, 
    {
        "rating" : 4,
        "review" : "This dispenser was very intuitive to use!"
    }
]
const ratingsDiv = document.getElementById('ratings');

//storage.clear();
if(!storage.getItem('reviews')) {
    storage.setItem('reviews', JSON.stringify(customerReviews));
} else {
    customerReviews = JSON.parse(storage.getItem('reviews'));
}



function loadPage() {
    let mainDiv = document.createElement('div');

   let arr = JSON.parse(storage.getItem('reviews'));
    arr.forEach(review => {
        let rateCardDiv = document.createElement('div');
        rateCardDiv.className = 'rate-card';

        let cardTextDiv = document.createElement('div');
        cardTextDiv.className = 'card__text';

        let ratingTitleDiv = document.createElement('div');
        ratingTitleDiv.className = 'rating-title line';

        let starImage = document.createElement('img');
        starImage.className = 'five-star-image padding-top';

        let ratingTitle = document.createElement('h4');
        ratingTitle.className = 'padding-top';

        let ratingText = document.createElement('p');
        ratingText.className ='padding-top padding-bottom';

        if(review.rating === 5) {
            starImage.src = './resources/five-star.png';
        } else if(review.rating === 4) {
            starImage.src = './resources/four-star.png';
        } else if(review.rating === 3) {
            starImage.src = './resources/three-star.png';
        } else if(review.rating === 2) {
            starImage.src = './resources/two-star.png';
        } else if(review.rating === 1) {
            starImage.src = './resources/one-star.png';
        } else {
            starImage.src = './resources/zero-star.png';
        }

        ratingTitle.innerHTML = "Anonymous";
        ratingText.innerHTML = review.review;

        ratingTitleDiv.append(starImage);
        ratingTitleDiv.append(ratingTitle);

        cardTextDiv.append(ratingTitleDiv);
        cardTextDiv.append(ratingText);

        rateCardDiv.append(cardTextDiv);
        
        mainDiv.append(rateCardDiv);

    });
    ratingsDiv.removeChild(ratingsDiv.firstChild);
    ratingsDiv.append(mainDiv);
}

function writeReview() {
    if(document.getElementById('customer-review').value.length === 0 ) {
        alert("Please enter a review.");
        return;
    }
    let stars = 0;
    let review = '';
    if(document.getElementById('star5').checked === true) {
        stars = 5;
    } else if(document.getElementById('star4').checked === true) {
        stars = 4;
    } else if(document.getElementById('star3').checked === true) {
        starts = 3;
    } else if(document.getElementById('star2').checked === true) {
        stars = 2;
    } else if(document.getElementById('star1').checked === true) {
        stars = 1;
    }
    review = document.getElementById('customer-review').value;
    customerReviews.push(
        {
            "rating" : stars,
            "review" : review
        }
    );
    storage.setItem('reviews', JSON.stringify(customerReviews)); 
    window.location.href="ratings-submitted.html";

}