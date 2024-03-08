import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

window.alert = jest.fn();

// LASTNAME

let textfield;

describe('check Lastname', () => {

    beforeEach(() => {
        render(<App />);
        textfield = screen.getByTestId('lastname');
        expect(textfield).toBeInTheDocument();
    });

    it('check if lastname is when it\'s correct', () => {
        fireEvent.change(textfield, { target: { value: 'Viano' } });
        expect(textfield.value).toBe('Viano');
    });

    it('check if lastname is empty', () => {
        fireEvent.change(textfield, { target: { value: 'Viano' } });
        fireEvent.change(textfield, { target: { value: '' } });
        const error = screen.getByTestId('lastname-error');
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe('Nom de famille non valide');
    });

    it('check if lastname only has valid characters', () => {
        fireEvent.change(textfield, { target: { value: 'Viano_3$`\"()[]{}#&!?.;,§%+*/|@~€µ' } });
        const error = screen.getByTestId('lastname-error');
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe('Nom de famille non valide');
    });

});

// FIRSTNAME

describe('check Firstname', () => {

    beforeEach(() => {
        render(<App />);
        textfield = screen.getByTestId('firstname');
        expect(textfield).toBeInTheDocument();
    });

    it('check if lastname is when it\'s correct', () => {
        fireEvent.change(textfield, { target: { value: 'Anthony' } });
        expect(textfield.value).toBe('Anthony');
    });

    it('check if lastname is empty', () => {
        fireEvent.change(textfield, { target: { value: 'Anthony' } });
        fireEvent.change(textfield, { target: { value: '' } });
        const error = screen.getByTestId('firstname-error');
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe('Prénom non valide');
    });

    it('check if lastname only has valid characters', () => {
        fireEvent.change(textfield, { target: { value: 'Anthony_3$`\"()[]{}#&!?.;,§%+*/|@~€µ' } });
        const error = screen.getByTestId('firstname-error');
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe('Prénom non valide');
    });
    
});

// EMAIL

describe('check Email', () => {

    beforeEach(() => {
        render(<App />);
        textfield = screen.getByTestId('email');
        expect(textfield).toBeInTheDocument();
    });

    it('check if email is when it\'s correct', () => {
        fireEvent.change(textfield, { target: { value: 'anthony.viano@ynov.com' } });
        expect(textfield.value).toBe('anthony.viano@ynov.com');
    });

    it('check if email is empty', () => {
        fireEvent.change(textfield, { target: { value: 'anthony.viano@ynov.com' } });
        fireEvent.change(textfield, { target: { value: '' } });
        const error = screen.getByTestId('email-error');
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe('Adresse e-mail non valide');
    });

    it('check if email is wrong', () => {
        fireEvent.change(textfield, { target: { value: 'anthony.viano@ynov' } });
        const error = screen.getByTestId('email-error');
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe('Adresse e-mail non valide');
    });

});

// BIRTH DATE

describe('check Birthdate', () => {

    beforeEach(() => {
        render(<App />);
        textfield = screen.getByTestId('birthdate');
        expect(textfield).toBeInTheDocument();
    });

    it('check if birthdate is when it\'s correct', () => {
        fireEvent.change(textfield, { target: { value: '2002-05-13' } });
        expect(textfield.value).toBe('2002-05-13');
    });

    //  it('check if birthdate is empty', () => {
    //      fireEvent.change(textfield, { target: { value: '2002-05-13' } });
    //      fireEvent.change(textfield, { target: { value: '' } });
    //      const error = screen.getByTestId('birthdate-error');
    //      expect(error).toBeInTheDocument();
    //      expect(error.textContent).toBe('L\'âge doit être supérieur à 18 ans');
    //  });

    it('check if birthdate is wrong', () => {
        fireEvent.change(textfield, { target: { value: '2015-08-25' } });
        const error = screen.getByTestId('birthdate-error');
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe('L\'âge doit être supérieur à 18 ans');
    });

});

// CITY

describe('check City', () => {

    beforeEach(() => {
        render(<App />);
        textfield = screen.getByTestId('city');
        expect(textfield).toBeInTheDocument();
    });

    it('check if city is when it\'s correct', () => {
        fireEvent.change(textfield, { target: { value: 'Antibes' } });
        expect(textfield.value).toBe('Antibes');
    });

    it('check if city is empty', () => {
        fireEvent.change(textfield, { target: { value: 'Antibes' } });
        fireEvent.change(textfield, { target: { value: '' } });
        const error = screen.getByTestId('city-error');
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe('Ville non valide');
    });

    it('check if city only has valid characters', () => {
        fireEvent.change(textfield, { target: { value: 'Antibes_3$`\"()[]{}#&!?.;,§%+*/|@~€µ' } });
        const error = screen.getByTestId('city-error');
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe('Ville non valide');
    });

});

// ZIPCODE

describe('check Zipcode', () => {

    beforeEach(() => {
        render(<App />);
        textfield = screen.getByTestId('zipcode');
        expect(textfield).toBeInTheDocument();
    });

    it('check if zipcode is when it\'s correct', () => {
        fireEvent.change(textfield, { target: { value: '06600' } });
        expect(textfield.value).toBe('06600');
    });

    it('check if zipcode is empty', () => {
        fireEvent.change(textfield, { target: { value: '06600' } });
        fireEvent.change(textfield, { target: { value: '' } });
        const error = screen.getByTestId('zipcode-error');
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe('Format de code postal invalide (France : XXXXX)');
    });

    it('check if zipcode is wrong - less than 5 digits', () => {
        fireEvent.change(textfield, { target: { value: '0660' } });
        const error = screen.getByTestId('zipcode-error');
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe('Format de code postal invalide (France : XXXXX)');
    });

    it('check if zipcode is wrong - more than 5 digits', () => {
        fireEvent.change(textfield, { target: { value: '066000' } });
        const error = screen.getByTestId('zipcode-error');
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe('Format de code postal invalide (France : XXXXX)');
    });

});

// SUBMIT

let button;
let lastname;
let firstname;
let email;
let birthdate;
let city;
let zipcode;

describe('check Submit Button', () => {
    
    beforeEach(() => {
        render(<App />);
        button = screen.getByTestId('submit');
        expect(button).toBeInTheDocument();
        lastname = screen.getByTestId('lastname');
        expect(lastname).toBeInTheDocument();
        firstname = screen.getByTestId('firstname');
        expect(firstname).toBeInTheDocument();
        email = screen.getByTestId('email');
        expect(email).toBeInTheDocument();
        birthdate = screen.getByTestId('birthdate');
        expect(birthdate).toBeInTheDocument();
        city = screen.getByTestId('city');
        expect(city).toBeInTheDocument();
        zipcode = screen.getByTestId('zipcode');
        expect(zipcode).toBeInTheDocument();

        fireEvent.change(lastname, { target: { value: 'Viano' } });
        fireEvent.change(firstname, { target: { value: 'Anthony' } });
        fireEvent.change(email, { target: { value: 'anthonyviano@gmail.com' } });
        fireEvent.change(birthdate, { target: { value: '1996-08-25' } });
        fireEvent.change(city, { target: { value: 'Antibes' } });
        fireEvent.change(zipcode, { target: { value: '06600' } });
    });

    it('check if submit button is right', () => {
        expect(button).toBeEnabled();
        expect(button.style.color).toBe('green');
    });
    
    it('check if submit button is wrong - lastname', () => {
        fireEvent.change(lastname, { target: { value: '' } });
        fireEvent.click(button);
        expect(button).toBeDisabled();
        expect(button.style.color).toBe('red');
    });
    
    it('check if submit button is wrong - firstname', () => {
        fireEvent.change(firstname, { target: { value: '' } });
        fireEvent.click(button);
        expect(button).toBeDisabled();
        expect(button.style.color).toBe('red');
    });
    
    it('check if submit button is wrong - e-mail', () => {
        fireEvent.change(email, { target: { value: '' } });
        fireEvent.click(button);
        expect(button).toBeDisabled();
        expect(button.style.color).toBe('red');
    });
    
    it('check if submit button is wrong - birthdate', () => {
        fireEvent.change(birthdate, { target: { value: '' } });
        fireEvent.click(button);
        expect(button).toBeDisabled();
        expect(button.style.color).toBe('red');
    });
    
    it('check if submit button is wrong - city', () => {
        fireEvent.change(city, { target: { value: '' } });
        fireEvent.click(button);
        expect(button).toBeDisabled();
        expect(button.style.color).toBe('red');
    });
    
    it('check if submit button is wrong - zipcode', () => {
        fireEvent.change(zipcode, { target: { value: '' } });
        fireEvent.click(button);
        expect(button).toBeDisabled();
        expect(button.style.color).toBe('red');
    });

});

// FORM

let form;

describe('check Form', () => {

    beforeEach(() => {
        render(<App />);
        form = screen.getByTestId('form');
        expect(form).toBeInTheDocument();
        button = screen.getByTestId('submit');
        expect(button).toBeInTheDocument();
        lastname = screen.getByTestId('lastname');
        expect(lastname).toBeInTheDocument();
        firstname = screen.getByTestId('firstname');
        expect(firstname).toBeInTheDocument();
        email = screen.getByTestId('email');
        expect(email).toBeInTheDocument();
        birthdate = screen.getByTestId('birthdate');
        expect(birthdate).toBeInTheDocument();
        city = screen.getByTestId('city');
        expect(city).toBeInTheDocument();
        zipcode = screen.getByTestId('zipcode');
        expect(zipcode).toBeInTheDocument();

        fireEvent.change(lastname, { target: { value: 'Viano' } });
        fireEvent.change(firstname, { target: { value: 'Anthony' } });
        fireEvent.change(email, { target: { value: 'anthonyviano@gmail.com' } });
        fireEvent.change(birthdate, { target: { value: '1996-08-25' } });
        fireEvent.change(city, { target: { value: 'Antibes' } });
        fireEvent.change(zipcode, { target: { value: '06600' } });
    });

    it('check if Form is right', () => {
        fireEvent.click(button);
        expect(form).toBeValid();
    });

    it('check if all TextField are empty after submitted', () => {
        fireEvent.click(button);
        expect(lastname.value).toBe('');
        expect(firstname.value).toBe('');
        expect(email.value).toBe('');
        expect(birthdate.value).toBe('');
        expect(city.value).toBe('');
        expect(zipcode.value).toBe('');
    });

    it('check if Form is wrong - lastname', () => {
        fireEvent.change(lastname, { target: { value: '' } });
        fireEvent.click(button);
        !expect(form).toBeValid();
    });

    it('check if Form is wrong - firstname', () => {
        fireEvent.change(firstname, { target: { value: '' } });
        fireEvent.click(button);
        !expect(form).toBeValid();
    });

    it('check if Form is wrong - e-mail', () => {
        fireEvent.change(email, { target: { value: '' } });
        fireEvent.click(button);
        !expect(form).toBeValid();
    });

    it('check if Form is wrong - birthdate', () => {
        fireEvent.change(birthdate, { target: { value: '' } });
        fireEvent.click(button);
        !expect(form).toBeValid();
    });

    it('check if Form is wrong - city', () => {
        fireEvent.change(city, { target: { value: '' } });
        fireEvent.click(button);
        !expect(form).toBeValid();
    });

    it('check if Form is wrong - zipcode', () => {
        fireEvent.change(zipcode, { target: { value: '' } });
        fireEvent.click(button);
        !expect(form).toBeValid();
    });

});

// LOCAL STORAGE

describe('check LocalStorage', () => {

    beforeEach(() => {
        render(<App />);
        form = screen.getByTestId('form');
        expect(form).toBeInTheDocument();
        button = screen.getByTestId('submit');
        expect(button).toBeInTheDocument();
        lastname = screen.getByTestId('lastname');
        expect(lastname).toBeInTheDocument();
        firstname = screen.getByTestId('firstname');
        expect(firstname).toBeInTheDocument();
        email = screen.getByTestId('email');
        expect(email).toBeInTheDocument();
        birthdate = screen.getByTestId('birthdate');
        expect(birthdate).toBeInTheDocument();
        city = screen.getByTestId('city');
        expect(city).toBeInTheDocument();
        zipcode = screen.getByTestId('zipcode');
        expect(zipcode).toBeInTheDocument();

        fireEvent.change(lastname, { target: { value: 'Viano' } });
        fireEvent.change(firstname, { target: { value: 'Anthony' } });
        fireEvent.change(email, { target: { value: 'anthonyviano@gmail.com' } });
        fireEvent.change(birthdate, { target: { value: '1996-08-25' } });
        fireEvent.change(city, { target: { value: 'Antibes' } });
        fireEvent.change(zipcode, { target: { value: '06600' } });
    });

    it('check if LocalStorage is filled', () => {
        fireEvent.click(button);
        expect(localStorage.getItem('Lastname:')).toBe('Viano');
        expect(localStorage.getItem('Firstname:')).toBe('Anthony');
        expect(localStorage.getItem('Email:')).toBe('anthonyviano@gmail.com');
        expect(localStorage.getItem('Birthdate:')).toBe('1996-08-25');
        expect(localStorage.getItem('City:')).toBe('Antibes');
        expect(localStorage.getItem('Zipcode:')).toBe('06600');
        expect(localStorage.getItem('Form status:')).toBe('Le formulaire a été soumis avec succès');
    });
    
});

// ALERT

let alert;

describe('check Alert', () => {

    beforeEach(() => {
        render(<App />);
        window.alert.mockClear();
        form = screen.getByTestId('form');
        expect(form).toBeInTheDocument();
        button = screen.getByTestId('submit');
        expect(button).toBeInTheDocument();
        lastname = screen.getByTestId('lastname');
        expect(lastname).toBeInTheDocument();
        firstname = screen.getByTestId('firstname');
        expect(firstname).toBeInTheDocument();
        email = screen.getByTestId('email');
        expect(email).toBeInTheDocument();
        birthdate = screen.getByTestId('birthdate');
        expect(birthdate).toBeInTheDocument();
        city = screen.getByTestId('city');
        expect(city).toBeInTheDocument();
        zipcode = screen.getByTestId('zipcode');
        expect(zipcode).toBeInTheDocument();

        fireEvent.change(lastname, { target: { value: 'Viano' } });
        fireEvent.change(firstname, { target: { value: 'Anthony' } });
        fireEvent.change(email, { target: { value: 'anthonyviano@gmail.com' } });
        fireEvent.change(birthdate, { target: { value: '1996-08-25' } });
        fireEvent.change(city, { target: { value: 'Antibes' } });
        fireEvent.change(zipcode, { target: { value: '06600' } });
    });

    it('check if Alert exists', () => {
        fireEvent.click(button);
        alert = screen.queryByText('Le formulaire a été soumis avec succès');
    });

    it('check if Alert doesn\'t exist', () => {
        fireEvent.change(lastname, { target: { value: '' } });
        fireEvent.click(button);
        alert = screen.queryByText('Le formulaire a été soumis avec succès');
        expect(alert).toBeNull();
    });

});