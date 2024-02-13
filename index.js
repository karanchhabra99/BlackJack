let Username = "";
let money = 100

dealer_cards = []
your_cards = []

check_clicked = false

const pokerTable = document.getElementById('poker_table')
const actionButtons = document.getElementById('action_buttons');
const NewGameButtons = document.getElementById('New_game_button');
pokerTable.style.display = 'none';
NewGameButtons.style.display = 'none';

function StartGame() {
    Username = document.getElementById("Username").value;

    const divStartGame = document.getElementById('div_start_game');
    if (divStartGame) {
        divStartGame.parentNode.removeChild(divStartGame)
    };


    document.getElementById('Greeting').textContent = "Welcome " + Username + "!";
    pokerTable.style.display = 'block';
    new_round()
}

function get_random_card() {
    card = Math.floor(Math.random() * 13) + 1
    return card
}

function draw_card() {
    if (your_sum < 21 && check_clicked === false) {
        new_card = get_random_card()
        your_cards.push(new_card)
        update_display()
    }

}

function check() {
    if (check_clicked === false) {
    check_clicked = true
    actionButtons.style.display = 'none';
    NewGameButtons.style.display = 'block';
    update_display()
    }
}



// function check() {
//     check = true
//     console.log(check)
//     update_display()
// }

function new_round() {
    actionButtons.style.display = 'block';
    NewGameButtons.style.display = 'none';
    check_clicked = false
    if  (money>10) {
    pot = document.getElementById('Pot')
    pot.textContent = 'Pot: $20'
    money -= 10
    dealer_cards = [get_random_card(), get_random_card()]
    your_cards = [get_random_card(), get_random_card()]
    update_display()
    } else {
        pot = document.getElementById('Pot')
        pot.textContent = 'No Funds'
    }
}

function display_cards(cards_in_hand) {
    string_cards =""
    for (let i = 0; i < cards_in_hand.length; i++) {
        if (cards_in_hand[i] === 1) {
            string_cards +=  "A "
        } else if (cards_in_hand[i] === 11) {
            string_cards +=  "J "
        } else if (cards_in_hand[i] === 12) {
            string_cards +=  "Q "
        } else if (cards_in_hand[i] === 13) {
            string_cards +=  "K "
        } else {
            string_cards += cards_in_hand[i] + " "
        }
        
    }
    return string_cards

}

function card_sum(cards_in_hand) {
    sum =0
    count_of_a =0

    for (let i = 0; i < cards_in_hand.length; i++) {
        if (cards_in_hand[i] ===1) {
            count_of_a +=  1
            sum +=1
        } else if (cards_in_hand[i] >= 10) {
            sum +=  10
        } else {
            sum += cards_in_hand[i] 
        }

    }
    for (let j =0; j < count_of_a; j++){
        if (sum+10 <= 21 ) {
            sum += 10
        }
    }    
        

    return sum

}


function update_display() {
    string_your_cards = display_cards(your_cards)
    your_sum = card_sum(your_cards) 

    if (check_clicked === false) {
        document.getElementById('Dealer_Cards').textContent = "Dealer Cards: " +display_cards([dealer_cards[0]])  + " Hidden";
        document.getElementById('Dealer_Sum').textContent = "Dealer Sum: " + card_sum([dealer_cards[0]]);
    } else {
        dealer_sum = card_sum(dealer_cards) 
        string_dealer_cards = display_cards(dealer_cards) 
        
        while (dealer_sum < 17 && your_sum <= 21) {
            dealer_cards.push(get_random_card()) 
            dealer_sum = card_sum(dealer_cards)     
        }
        string_dealer_cards = display_cards(dealer_cards) 

        document.getElementById('Dealer_Cards').textContent = "Dealer Cards: " + string_dealer_cards;
        document.getElementById('Dealer_Sum').textContent = "Dealer Sum: " + dealer_sum;
        
        pot = document.getElementById('Pot')
        if (your_sum<=21 && dealer_sum<= 21 && dealer_sum> your_sum) {
            pot.textContent = "You Lose"
        } else if (your_sum<=21 && dealer_sum<= 21 && dealer_sum === your_sum) {
            pot.textContent = "Draw"
            money+=10
        } else if (your_sum<=21 && dealer_sum<= 21 && dealer_sum < your_sum) {
            pot.textContent ="You Won"
            money+=20
        } else if (your_sum >21 ) {
            pot.textContent ="You are bursted"
        } else if (dealer_sum >21 ) {
            pot.textContent ="Dealer are bursted"
            money +=20
        }

    }


    document.getElementById('Your_Cards').textContent = "Your Cards: " + string_your_cards;
    document.getElementById('Your_Sum').textContent = "Your Sum: " + your_sum;
    document.getElementById('Your_Money').textContent = "Money: $" + money;
}

