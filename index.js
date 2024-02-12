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
    if (card > 10) {
        return 10
    } else if (card === 1) {
        return 11
    } else {
        return card
    }
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

function update_display() {
    string_your_cards = ""
    your_sum = 0
    
    for (let i = 0; i < your_cards.length; i++) {
        string_your_cards += your_cards[i] + " "
        your_sum += your_cards[i]
    }


    if (check_clicked === false) {
        document.getElementById('Dealer_Cards').textContent = "Dealer Cards: " + dealer_cards[0] + " Hidden";
        document.getElementById('Dealer_Sum').textContent = "Dealer Sum: " + dealer_cards[0];
    } else {
        string_dealer_cards = ""
        dealer_sum = 0
        for (let i = 0; i < dealer_cards.length; i++) {
            string_dealer_cards += dealer_cards[i] + " "
            dealer_sum += dealer_cards[i]
        }
        while (dealer_sum < 17 && your_sum <= 21) {
            new_card = get_random_card()
            string_dealer_cards += new_card + " "
            dealer_sum += new_card
        }
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

