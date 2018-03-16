const assert = require('assert'),
basePage = require('../pageobject/baseFunctions'),
elements = require('../pageobject/baseElements'),
staticData = require('../pageobject/staticData'),
config = require('../pageobject/config');
let page;

describe('Tests of searching for accommodations', function(){

  beforeEach(function(){
    page = basePage();
  });

  afterEach(function(){
    page.quit();
  });

  it('An error message should be displayed when the user click on search without typing anything', async function () {
      page.visit(config.homeUrl);
      const searchButton = await page.find(elements.homePageSearchBtn);
      searchButton.click();

      const messageBanner = await page.find(elements.homePageErrorBanner);
      const txt = await messageBanner.getText();
      assert.notEqual(txt, null);
  });

  it('user should be able to search for airports taxis on selecting a pick-up location ,a drop-off location, a date and a time.', async function(){
      page.visit(config.ridewaysUrl);

      // find and click on the date input
      const dateInput = await page.find(elements.dateId);
      const oldDate = await dateInput.getText();
      dateInput.click();

      // find and click on the next month button
      const nextMonth = await page.find(elements.nextMonthBtn);
      nextMonth.click();

      // find and click on a date
      const selectedDate = await page.find(elements.selectedDate);
      selectedDate.click();

      page.driver.wait(async function() {
        const newDate = await selectedDate.getText()
        assert.notEqual(newDate, oldDate);
      }, 200);

      //select the Dropp-off location input and enter a text
      await page.writeById(elements.dropoffLocationId, staticData.dropoffLocation);
      const dropoffLocationElement = await page.find(elements.dropoffLocationLi);
      dropoffLocationElement.click();
      const dropoffInput = await page.findById(elements.dropoffLocationId);
      const textDropoff = await dropoffInput.getAttribute('value');
      assert.notEqual(textDropoff,null);

      //select the Pick-up location input and enter a text
      await page.writeById(elements.pickupLocationId, staticData.pickupLocation);
      const PickupLocationElement = await page.find(elements.pickupLocationLi);
      PickupLocationElement.click();
      const pickupLocationInput = await page.findById(elements.pickupLocationId);

      const textPickup = await pickupLocationInput.getAttribute('value');
      assert.notEqual(textPickup,null);


      const cookieBtn = await page.findById(elements.cookiesBtnId);
      cookieBtn.click();
      const searchBtn = await page.find(elements.searchBtn);
      searchBtn.click();

      page.driver.wait(async function() {
        const selectCarBtn = await page.find(elements.selectCarBtn);
        const textBtn = await selectCarBtn.getText()
        assert.equal(textBtn, ...selectText);

        const pickupLocationInput2 = await page.findById(elements.pickupLocationId);
        const textPickup2 = await pickupLocationInput2.getAttribute('value');
        assert.equal(textPickup2, textPickup);

        const dropoffInput2 = await page.findById(elements.dropoffLocationId);
        const textDropoff2 = await dropoffInput2.getAttribute('value');
        assert.equal(textDropoff2, textDropoff);
      }, 1000);
  });

});
