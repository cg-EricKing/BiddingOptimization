// Bidding Optimization - DashHound Ready

// Select Current Account
// Select current running campaign
// Grab campaign metrics for conditionals
// Grab current bidding strategy
// Grab current budget
// Conditional checks to manage bidding optimization
    // Check cpc
    // Check average cpm
    // Check bidding strategy
    // Else don't change the bidding strategy

function main() {
    var currentAccount = AdWordsApp.currentAccount();
    var accountName = currentAccount.getName();

    // Init Variables
    var targetCpc = parseFloat(1);
    var maxCpm = parseFloat(1.25);

    var campaignSelector = AdWordsApp
        .campaigns()
        .withCondition("Status = ENABLED");
    
    var campaignIterator = campaignSelector.get();

    while(campaignIterator.hasNext()) {
        var campaign = campaignIterator.next();

        var biddingStrategy = campaign.getBiddingStrategyType();

        var currentBudget = campaign.getBudget();

        var stats = campaign.getStatsFor("LAST_7_DAYS");

        var cpc = stats.getCpc();
        var cpm = stats.getAverageCpm();
    }

    if(cpc < targetCpc) {
        Logger.log("Current Cost per Click is below Target of $1.00 - Setting bid strategy to Max Clicks");
        campaign.bidding().setStrategy("TARGET_SPEND");
      }
    else if(cpm > maxCpm) {
        Logger.log("Cpm is above $5 - setting bidding strategy to VCPM");
        campaign.bidding().setStrategy("MANUAL_CPM");
      }
    else {
        Logger.log("Campaign stats are holding, no adjustment necessary");
      }
}