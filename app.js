
var db = [
    {
        img: "http://placeskull.com/250/250/f1c40f",
        name: "Henry Garmendia",
        email: "henry@gmail.com",
        age: 37,
        bio: "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla quis lorem."
    },
    {
        img: "http://placeskull.com/250/250/d35400",
        name: "Jeff Smith",
        email: "jeff@gmail.com",
        age: 17,
        bio: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a, convallis at tellus. Nulla quis lorem."
    },
    {
        img: "http://placeskull.com/250/250/8e44ad",
        name: "Anna Bananna",
        email: "anna@gmail.com",
        age: 27,
        bio: "Quisque velit nisi, pretium ut lacinia in, elementum id enim, convallis at tellus. Nulla quis lorem."
    }
];

// hex color random generator
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

(function Cards(db) {
    // run functions when page load
    this.init = function() {
        this.generate_card();
        this.user_data();
    };

    // dynamically generate user card
    this.generate_card = function() {
        
        var user_card = document.querySelector('#user_card');
        var output = '';

        for (var i = 0; i < db.length; i++) {
            output += '<div class="col-3">';
            output +=   '<div class="card" style="width: 17rem;">';
            output +=       '<img class="card-img-top user_img" src="'+ db[i].img +'" alt="Skull image card">';
            output +=       '<div class="card-body">';
            output +=           '<h4 class="card-title">'+ db[i].name +'</h4>';
            output +=           '<p class="card-text">'+ db[i].email + db[i].age +'</p>';
            output +=           '<p class="card-text">'+ db[i].bio +'</p>';
            output +=           '<a href="#" class="btn btn-danger pull-right" id="delete_card" data-button"'+ i +'">Delete Card</a>';
            output +=       '</div>';
            output +=   '</div>';
            output += '</div>';
        };
        
        user_card.innerHTML = '';
        /* insertAdjacentHTML() parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position. */
        user_card.insertAdjacentHTML('beforeend', output);
        // invoke the delete_card()
        delete_card();
    };

    this.user_data = function() {
        // select the form
        var user_form = document.querySelector('#user_form');
        
        function user_values() {
            // grab all the values from the form
            var user_name   = document.querySelector('#user_name').value,
                user_img    = document.querySelector('.user_img'),
                user_email  = document.querySelector('#user_email').value,
                user_age    = parseInt(document.querySelector('#user_age').value),
                user_bio    = document.querySelector('#user_bio').value;

            var all_inputs  = [user_name, user_email, user_age, user_bio];

            if (is_valid(all_inputs)) {
                // reset the form after submition
                user_form.reset();
                // push data to db array)
                db.push({img:"http://placeskull.com/250/250/"+ getRandomColor() +"", name:user_name, email:user_name, age:user_age, bio:user_bio});
                generate_card(db);
            } else {
                var error_msg = document.querySelector('#error');
                // error_msg = error_msg.textContent = 'error: Fields cannot be blank!';

                error_msg.style.display = 'block';
                setTimeout(() => {
                    error_msg.style.display = 'none';
                }, 2000);
            };
        };
        
        user_form.addEventListener('submit', function(e) {
            e.preventDefault();
            user_values();
        });
    };

    this.is_valid = function(user_input) {
        for (let i = 0; i < user_input.length; i++) {
            if (user_input[i] === '') {
                return false;
            }
        }
        return true;
    };

    this.delete_card = function() {
        var delete_button = Array.from(document.querySelectorAll('#delete_card'));

        function delete_element(element) {
            var el_card = element.getAttribute('data-card');

            /* The splice() method changes the contents of an array by removing existing elements and/or adding new elements. */
            db.splice(el_card, 1);
            generate_card();
        };

        for (let i = 0; i < delete_button.length; i++) {
            delete_button[i].addEventListener('click', function(e) {
                delete_element(this);
            });
        };
    };

    this.init();

})(db);