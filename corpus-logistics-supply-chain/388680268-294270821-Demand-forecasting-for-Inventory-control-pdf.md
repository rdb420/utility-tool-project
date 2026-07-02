# Demand Forecasting for Inventory Control

Demand Forecasting for Inventory Control

Nick T. Thomopoulos

# Demand Forecasting for Inventory Control

Nick T. Thomopoulos

Stuart School of Business

Illinois Institute of Technology

Burr Ridge

Illinois

USA

ISBN 978-3-319-11975-5

DOI 10.1007/978-3-319-11976-2

ISBN 978-3-319-11976-2 (eBook)

Library of Congress Control Number: 2014954807

Springer Cham Heidelberg New York Dordrecht London

$\odot$ Springer International Publishing Switzerland 2015

This work is subject to copyright. All rights are reserved by the Publisher, whether the whole or part of the material is concerned, specifically the rights of translation, reprinting, reuse of illustrations, recitation, broadcasting, reproduction on microfilms or in any other physical way, and transmission or information storage and retrieval, electronic adaptation, computer software, or by similar or dissimilar methodology now known or hereafter developed.

The use of general descriptive names, registered names, trademarks, service marks, etc. in this publication does not imply, even in the absence of a specific statement, that such names are exempt from the relevant protective laws and regulations and therefore free for general use.

The publisher, the authors and the editors are safe to assume that the advice and information in this book are believed to be true and accurate at the date of publication. Neither the publisher nor the authors or the editors give a warranty, express or implied, with respect to the material contained herein or for any errors or omissions that may have been made.

Printed on acid-free paper

Springer is part of Springer Science+Business Media (www.springer.com)

For my wife, my children, and my grandchildren

# Preface

Looking back over my working years, I was most fortunate with the background gained as it happened to unfold from year-to-year in both industry and in academia. This included working in industry at International Harvester as supervisor of operations research in the corporate headquarters; at IIT Research Institute (IITRI) as a senior scientist serving as a consultant to international industry and government; as a professor in the Industrial Engineering Department at the Illinois Institute of Technology (IIT) and also in the Stuart School of Business at IIT My experience with FIC Inc., a software company, is where I gained knowledge on the software tools needed in industry, as well as the customers' call for user friendly tools. For many of the years, I was privileged to serve as consultant to a wide variety of industries in the United States, Europe and Asia. At IIT, I was fortunate to be assigned an array of courses, gaining a wide breadth with the variety of topics, and with the added knowledge I gained from the students and with every repeat of the course. I also was fortunate to serve as the advisor to 36 bright Ph.D. students as they carried on their dissertation research. Bits of knowledge from the various courses and research helped me in the classroom, in research, and also in my consulting assignments. When I could, I used my industry knowledge in classroom lectures so the students could see how some of the textbook methodologies actually are applied in industry. At the same time, the knowledge I gained from the classroom helped me to formulate and develop solutions to industry applications as they unfolded. The wide variety of experience allowed me to paint a picture on which quantitative tools really are useful in industry. This book is based on this total experience and also includes the demand forecasting methods that I found doable and helpful to industry.

Thanks foremost to my wife, Elaine Thomopoulos, who has encouraged me to write this volume. She inspired and gave consultation very often as the need called. Thanks also to the many people who have helped and inspired me along the way. I can name only a few here. Raida Abuizam (Purdue University—Calumet), Brian Ahearn (Komatsu Dresser), Wayne Bancroft (Walgreens), Owen Baxter (Wolverine World Wide), Fred Bock (IIT Research Institute), Harry Bock (Florsheim Shoe Company), Randy Braun (Komatsu Dresser), Toemchai Bunnag (PTT Public), John Cada (Florsheim Shoe Company), Dan Cahill (International Truck and Engine), Debbie Cernauskas (Benedictine University), Edine Dahel (Monterey Institute),

John DeMotts (International Harvester), Frank Donahue (Navistar), Nick Faklis (Patterson Office Supplies), Jim Gleason (International Harvester), Mark Graham (International Truck and Engine), Scott Halligas (Florsheim Shoe Compnay), Jim Harrington (International Harvester), Willard Huson (Navistar), Dick Ilseman (International Truck and Engine), Marsha Jance (Indiana University—Richmond), Tom Lewis (International Harvester), Carol Lindee (Panduit), Keith Mahal (Navistar), Nick Malham (FIC Inc.), Craig Marasek (Komatsu Dresser), Pricha Pantumsinchai (M-Focus), Ted Prenting (Marist College), Athapol Ruangkanjanases (Chulalongkorn Univeristy), Doloris Santucci (Navistar), Mark Spieglan (FIC Inc.), and Toli Xanthopoulos, (Mercer Investment Consulting).

# Contents

# 1 Demand Forecasting for Inventory Control 1

1.1 Introduction 1

1.1.1 Demand Forecasting 1   
1.1.2 At the Beginning 2   
1.1.3 Calculators 2   
1.1.4 Data Processing 3   
1.1.5 Forecasting Pioneers 3   
1.1.6 Computer Era 4   
1.1.7 Qualification 4

1.2 Chapter Summaries 5

# 2 Demand History 11

2.1 Introduction 11   
2.2 Customer Demand History for a Part 12   
2.3 Demand-to-Date 12   
2.4 Service Part Regular and Emergency Demands 13   
2.5 New and Replenish Stock Demands for Retail Items at DC 13   
2.6 Weekly Demands 14   
2.7 445 Fiscal Months at Plants 14   
2.8 Regular Demands and Other Requirements at DCs 15   
2.9 Regular and Promotion Demands at DCs and Stores 16   
2.10 Advance Demands 16   
2.11 Demand Patterns 16   
2.12 Return Demands 17   
2.13 Outlier Demands 18   
2.14 Coefficient of Variation 18   
2.15 Demand Distribution 18   
2.16 Cumulative Round Algorithm 19   
2.17 Cumulative Forecasts 19   
2.18 Inventory Profile 19

Summary 21

# 3 Horizontal Forecasts 23

3.1 Introduction 23   
3.2 Horizontal Forecasts 23   
3.3 Raw Forecasts 24   
3.4 Cumulative Rounding Algorithm 24   
3.5 Estimate the Level 25   
3.6 Raw Forecasts 25   
3.7 Integer Forecasts 25   
3.8 Standard Deviation and Cov 26   
3.9 Horizontal Moving Average Forecasts 27   
3.10 Standard Deviation and Cov 27   
3.11 Horizontal Discount Forecasts 29   
3.12 Standard Deviation and Cov 30   
3.13 Horizontal Smoothing Forecasts 32   
3.14 Standard Deviation 33   
3.15 2-Stage Forecasts 34   
3.16 Raw Lines to Integer Forecasts 35   
3.17 Integer Lines to Integer Forecasts 38   
Summary 39

# 4 Trend Forecasts 41

4.1 Introduction 41   
4.2 Trend Regression Forecast 41   
4.3 Trend Discount Forecasts 45   
4.4 Trend Smoothing Forecasts 49   
4.5Dampening 53   
4.6 Linear Trend Forecast Model 53   
4.7 Geometric Forecast Model 54   
4.8 Maximum Forecast Model 55   
4.9 OtherDampeningApplications 57

Summary 57

# 5 Seasonal Forecasts 59

5.1 Introduction 59   
5.2 Seasonal Multiplicative Model 59   
5.3 Revised Forecasts 65   
5.4 Initialize with 12-Months of Demand History 66   
5.5 Seasonal Additive Model 67   
5.6 Initialize With 12-Months of Demand History 68   
5.7 Revision Forecasts 68

Summary 69

# 6 Promotion Forecasts 71

6.1 Introduction 71   
6.2 Promotion Horizontal Model 71   
6.3 Initialize Stage 72

6.4 Standard Deviation and Cov 75   
6.5 Forecasts. 75   
6.6 Revision Stage 76   
6.7 Unbiased Estimates 76   
6.8 Promotion Trend Model 78   
6.9 Initialize Stage 79   
6.10 Standard Deviation and Cov 81   
6.11 Revision Stage 84   
6.12 Unbiased Estimates 84

Summary 87

# 7 Multi-SKU Forecasts 89

7.1 Introduction 89   
7.2 SKU Mean and Standard Deviation 90   
7.3 Derivation of Binomial When n is a Random Variable 91   
7.4 Top-Down Forecasting Method 92   
7.5 Total Demand Forecasts 92   
7.6 Location Portion of Demand 93   
7.7 The Level by Location and Total 94   
7.8 Standard Deviation by Location and Total 95   
7.9 Cov by Location and Total 97   
7.10 Bottom-Up Forecasting Method 97   
7.11 Location j Forecasts 98   
7.12 Bottom-Up Total Forecast 99   
7.13 Total Forecast at Month 1. 101   
7.14 Horizontal SKU Forecasts 102   
7.15 SKU Forecasts at the Distribution Center 103   
7.16 SKU Forecasts at the Stores 105

Summary 106

# 8 Forecast Sensitivity 107

8.1 Introduction 107   
8.2 Cov by NMH when Horizontal Demands and Forecasts 107   
8.3 Cov by NMH when Trend Demands and Forecasts 108   
8.4 Cov by Parameter and Forecast Model when Horizontal Demands 110   
8.5 Cov by Parameter and Forecast Model when Trend Demands 111   
8.6 Cov by Parameter and Forecast Model when Seasonal Demands.... 112   
8.7 Cov when Horizontal Demands with an Outlier 113   
8.8 Cov when Trend Demands with an Outlier 115

Summary 117

# 9 Filtering Outliers 119

9.1 Introduction 119   
9.2 Horizontal Filtering 119

9.2.1 Horizontal Filtering Algorithm (HFA) 120

9.3 Trend Filtering 125   
9.3.1 Trend Filtering Algorithm (TFA) 125   
9.4 Seasonal Filtering 129   
9.4.1 Seasonal Filtering Algorithm (SFA) 129   
9.5 Filtering Line Demands in Order Entry 132   
9.6 Derivation of Mean and Standard Deviation of Line Demands 134   
Summary 136

# 10 Standard Normal and Truncated Normal Distributions 137

10.1 Introduction 137   
10.2 Normal Distribution 137   
10.3 Standard Normal Distribution 138

10.3.1 Probability Density 138   
10.3.2 Cumulative Distribution Function 138

10.4 Partial Measures 139

10.4.1 Partial Expectation 139   
10.4.2 Partial Standard Deviation 139   
10.4.3 Partial When $(\mathbf{x} > \mathbf{x}_0)$ 140   
10.4.4 Table Measures 140

10.5 Truncated Normal Distribution 140

10.5.1 Truncated Mean and Variance 142   
10.5.2 Some Useful Identities 142   
10.5.3 Truncated Cov 143   
10.5.4 Three Related Variables: z, t and w 145   
10.5.5 Limits on w 146   
10.5.6 Hastings Approximations 146   
10.5.7 Approximation of $\mathrm{F(z)}$ from z 147   
10.5.8 Approximation of $z$ from $\mathrm{F(z)}$ 147

Summary 148

# 11 Safety Stock 149

11.1 Introduction 149   
11.2 Control of the Inventory 149   
11.3 Safety Stock when Normal Distribution 150   
11.4 Service Level Method 151   
11.5 Percent Fill Method 152   
11.6 Sensitivity of Safety Stock with Cov 154   
11.7 Service Level Safety Stock and Cov. 154   
11.8 Percent Fill Safety Stock and Cov. 154   
11.9 Safety Stock when Truncated Normal Distribution 156   
11.10 Lead Time Demand 157   
11.11 Service Level Methods and Truncated Normal 158   
11.12 Percent Fill Method and Truncated Normal 160

Summary 163

# Contents

xiii

# 12 Auxiliary Forecasts 165

12.1 Introduction 165   
12.2 Month-1 Forecasts and Demand-to-Date 165   
12.3 Advance Demand 167   
12.4 Initial Forecasts 169   
12.5 All Time Forecasts. 173   
Summary 178

# Bibliography 179

# Index 181

# Chapter 1 Demand Forecasting for Inventory Control

# 1.1 Introduction

# 1.1.1 Demand Forecasting

Management is continually faced with a fast-paced flow of business planning and decision-making situations. A forecast of some type is used as a basis to meet many of these needs, whereby, the more reliable the forecasts, the better the outcome for the planning and decisions. Forecasting has plagued management for centuries, but now, with the advancement in computers, forecasting methods that previously were impossible to explore are currently achievable.

A sound forecasting system is a necessity in the expanding supply change management world, allowing firms to cope with the ever-changing shifts in demands for their products and resources. The common goal is to have the least amount of inventory to satisfy the customers' demands for its products, and at the same time minimize the cost of buying and holding the inventory. A company with an oversupply in inventory incurs undue costs caused by excess storage, stock deterioration and obsolescence of the items. With an undersupply, expediting, bad will and lost sales results. Reliable forecasts are essential for a company to survive and grow.

In manufacturing, management must forecast the future demands for its products to provide for the materials, labor, and capacity to fulfill these needs. These resources are planned and scheduled well before the demands for the products are placed on the firm.

In inventory holding locations, (distribution centers, stores, dealers), forecasts are essential to the inventory control system. Locations hold thousands of items in stock and must anticipate in advance the demands that will occur against each of these items. This is needed to have the proper inventory available to fill the customers' demands as they come in. In distribution centers, the lead-time is typically two or more months and in stores and dealers it is two or more days. Management must plan in advance for how much inventory to have available. With each item in the inventory, forecasts are needed for the months over the planning horizon. The forecast

is the catalyst that determines when to buy and how much. In a typical inventory system, the forecasts are revised once a month for each item in every location, and decisions on when and how much to buy is run daily.

Demand forecasting is a term more recently coined to define the forecast of demands for items in stock. The demands are from customers who want to purchase the item for immediate use. A part number, style number, product number, and so forth identifies each item; and the demand is for the item at a particular stocking location. The term stock-keeping-unit (sku) represents an item at a particular location.

# 1.1.2 At the Beginning

Eli Whitney in 1797 used assembly lines to mass-produce muskets for the US government. All the parts of the musket were produced with the same engineering tolerances so that each could be inserted into any musket. In this way, the parts and components were standard. From that era on, as soon as mass production of items became a reality, and the items were offered for sale to the public, forecasts on the number of future sales of the items was needed to determine how many items to produce over the near planning horizon.

Standard parts were also used in the design of the finished good items. Over time, with customer use, some of the parts wore-out or were damaged in use, and the customers could purchase a replacement part to reinsert in the finished good item. Thereby forecasts were also needed on each replacement part. An extra supply of inventory was needed to provide for the projected replacement needs. The replacement parts are now called service parts.

The forecasting methods of products and replacement parts were limited since data collection and large computations were inaccessible, slow and difficult. It was not common to save the quantity of sales by item over the prior time periods, and computation mechanisms were not available to help in the mathematical manipulations.

# 1.1.3 Calculators

In the 1800s, a few mechanical calculators that could add and subtract were produced. The face of the machines included rows and columns of buttons to press to insert the numbers. These machines were slightly helpful to the person responsible to forecast future demands of each item. Mechanical calculators became more common in the early 1900s, and by the 1950s they were able to add, subtract, multiple and divide numbers. However, the machines were noisy and wearing on the user.

In the 1960s, battery and electronic handheld calculators became available and some had printing capability. As the prices of these newer calculators became cheaper and their use more popular, the need for mechanical calculators diminished and soon the mechanical units fell out of use in the workplace. Still, those persons responsible to project (forecast) the sales of items were limited to the mathematical functions available (add, subtract, multiply, divide, square root) in the newer electronic calculators.

# 1.1.4 Data Processing

In the meantime, automatic data processing was starting with the introduction of the punched card system in the late 1880s by Herman Hollerith. The first successful application of this system occurred during the 1890 US Census. Subsequently, the system was oriented for commercial use, and slowly the punched card system improved. By 1928, the card had capacity of 80 columns and 12 rows. A host of machines (card punchers, collators, sorters, interpreters, so on) became available to process the cards for a variety of functions. The punched card allowed the storage of numbers so that the machines could be used to process the numbers in a variety of ways. This capability allowed the forecaster more flexibility in the collection and computations needed to forecast future demands on each item.

Electronic processing grew in the 1950s when magnetic tapes were introduced to store the numbers. The tapes and the cards were used together to process the numbers for all types of commercial companies. The use was for payroll, invoicing, inventory, account receivable and so forth. But as before, the primary mathematical functions of the systems were adding, subtracting, multiplying, and dividing. The people responsible for developing forecasting methods were limited to the capabilities of the machines available to them in that era.

# 1.1.5 Forecasting Pioneers

Looking back, three individuals (Brown, Holt, Winters) were the pioneers in demand forecasting. They developed forecast models that are still in common use today. All three used a method called exponential smoothing that requires only the demand from the most current time period. In the 1950s, it was not common to store and save multiple time periods of demand.

In 1956, Robert G. Brown was the first to apply the forecasting method called exponential smoothing. The method required the demand from the most recent time period (month, week) and a coefficient from the prior time period. The method is called single exponential smoothing and requires one coefficient (called the level) from the prior time period. The single exponential smoothing method generated forecasts for horizontal demand patterns. The method combines the current demand entry with the past coefficient and is an easy mathematical step to apply, either by data processing or by a hand-held calculator. Brown also introduced a double exponential smoothing model to forecast trend demand patterns, and a triple exponential smoothing model to forecast quadratic demand patterns. The single exponential smoothing model is still in high use today and is described fully in Chap. 3. The trend and quadratic models are not in common use anymore. In the 1970s, the author was privileged to work along with Robert G. Brown on an inventory consulting assignment at a large automotive corporation.

In 1957, Charles C. Holt added a trend component to the exponential smoothing method and this allowed forecasts that included trends up or down. The model

requires two coefficients (level and slope). To apply the method, the demand from the most current time period is needed, along with two coefficients from the forecast model. As before, the current demand is smoothed with the prior forecast coefficients. Holt's trend method is still high use today and is described in Chap. 4.

In 1960, Peter Winters, along with Holt, added seasonal components to the exponential smoothing forecasts. The forecast model requires three coefficients, (level, slope, and seasonal). Two models were introduced, the multiplicative model and the additive model. As in the prior exponential smoothing models, only the demand from the most current time period and three coefficients from the prior time period are needed to generate the forecast. This model is described in Chap. 5.

# 1.1.6 Computer Era

In the 1940s, computers with many thousands of vacuum tubes were developed, like the ENIAC for government research use. Moving on to the 1950s, computers with transistors became available for use in research facilities.

The author took a graduate course using the then state-of-art ILLIAC computer at the University of Illinois in 1957. The input and output mode to the computer was by way of a five-hole capacity (half-inch wide) paper tape. The programming code was crude and limited in capability. The code was punched onto the paper tape from a separate machine and when completed, the paper tape was inserted in the computer for processing. If the code was without any faults, a paper tape was punched as the output. The output tape was inserted into another machine that printed the output results. The author remembers many agonizing late nights at the computer lab until the homework assignment was successful.

In the 1960s, more commercial friendly computers became available, the IBM 650, IBM 700 series, and later the IBM 1401. Other computer manufacturers included Burroughs, Control Data, Honeywell, Sperry-Rand, so forth. Two basic programming languages became available for use, COBOL (common business oriented language) for commercial use, and FORTRAN (formula translator) for scientific use. From that point on, computer programmers were handed powerful tools that could apply to all sorts of developments in research and industry. Inventory control was now becoming more accessible to companies since demands from the past time periods could readily be stored and used in developing more powerful demand forecasting methods.

# 1.1.7 Qualification

Demand forecasting can be done using different time periods, e.g., days, weeks, months or quarters. Once the time period is chosen, the demand history for these periods of time in the past are used to project the demands for equal length time periods in the future. The concepts presented in this book can be used for any type

of time period. However, to avoid confusion and complexity, the author has chose to write this book using only monthly time periods. Conversion to other time periods is left up to the reader.

# 1.2 Chapter Summaries

The following is a list of the remaining chapters and a quick summary on the content of each.

Chapter 2. Demand History Forecasts are necessary for each part in every stock- ing location as they are used in the stocking decisions on when to replenish the stock and how much. The forecasts are typically revised each month as the new monthly demand entry becomes available. The forecasts are based on the history flow of the demands over the past months. The more accurate the demand history, the better the forecasts. The typical inventory system saves anywhere from 12-36 months of demand history.

The data to save is the monthly demand history, denoted as, $\mathrm{x}(1), \dots, \mathrm{x}(\mathrm{N})$ , where $\mathrm{x(t)}$ is the demand in month $t$ , $t = 1$ , the oldest month in the history, and $t = \mathrm{N}$ , the most current month. The demand history to save varies depending on the stock keeping facility. Often, the database history includes the monthly demands and monthly lines, where each customer order represents a line and the quantity on the order is the demand. At the end of each month, the total demands and lines are tallied for the month. The database may also include the demand-to-date for the current month as it is progressing. In service parts distribution centers, the demands from dealers are often classified as either regular or emergency. For distribution centers that supply retail stores, the demands may be labeled as new stock and replenish stock. New stock includes the initial delivery to the stores. Some stocking facilities save their demands on a weekly basis rather than monthly.

Plants often operate with fiscal (rather than calendar) months that are denoted as 445 or 454 or 544. Some distribution centers have demands that are classified as either regular demands and as other requirements. Other requirements are from out-of-the-ordinary customers. In some distribution centers and stores, the demands may be partitioned as regular demands and as promotion demands. Another type of demand is called advance demand and this occurs when a distribution center receives a customer order that is not to be shipped until some future date. When demands are shipped incorrectly, the customer returns the stock to the stocking location and these are labeled as return demands. Sometimes unusual events occur that cause a spike in the demand, or an error happens in order entry where the quantity or part number enters incorrectly, causing the entry on the database to be significantly different from the normal flow and is called an outlier demand. This type of demand is damaging to the forecasts and needs to be found and adjusted accordingly, prior to the forecasts. The flow of the demands, called the demand pattern, is mostly of the horizontal, trend or seasonal type. The chapter describes a way to convert fractional

forecasts to integer forecast; and how to compute cumulative forecasts for the future months. Some statistics from an actual inventory system is presented.

Chapter 3. Horizontal Forecasts Perhaps the most typical demand pattern is the horizontal where the month-to-month demands fluctuate above and below a path (called the level) without any trend or seasonal influence. This chapter describes five horizontal forecasting models. These forecast models are here called the following: horizontal forecast, horizontal moving average forecast, horizontal discount forecast, horizontal smoothing forecast, and forecasts using 2 stages. In all situations, the concept of raw and integer forecasts is shown. For each of the models, monthly raw forecasts are generated in fractional form. A corresponding set of forecasts is called integer forecasts and these are converted from the raw forecasts by way of the rounding algorithm. A key measure of the forecasts is the standard deviation of the one-month forecast errors. This measure is needed subsequently when inventory decision are computed. Another useful measure, the coefficient-of-variation, is a relative way to measure the forecast error.

Chapter 4. Trend Forecasts Some of the items stocked in the inventory have demand patterns where the month-to-month level is gradually increasing (or decreasing) in a steady way, and thereby, a trend forecast model is called. The model has two coefficients, a and b, where a is the intercept and b is the slope. Three such models are described here: trend regression forecasts, trend discount forecasts and trend smoothing forecasts. The trend regression forecast model generates a straight line fit through the most recent N history demands giving equal weight to each history demand. The trend discount forecast model also uses the N most recent history demands, but gives relatively less weight to each older demand. This model is based on a discount parameter, $\beta$ , that specifies how to apportion the weight to each older demand entry. The trend smoothing forecast model revises the forecast coefficients as each new demand entry becomes available. The model has two parameters, $\alpha$ and $\beta$ , that are used to revise the trend coefficients, (a, b), at each month. All three of the forecast models generate forecasts that are in fractional numbers and are here called raw forecasts. The forecasts are converted to integers using the cumulative rounding algorithm described in Chap. 2. For latter use, in inventory control, the standard deviation of each of the forecast models is also generated each month. For comparative sake, the coefficient of variation, cov, is also generated each month. Three forecast models are described for dampening the fast declining forecasts.

Chapter 5. Seasonal Forecasts Seasonal forecasts are needed when the demands over a year have a cyclical flow such as the rise for light clothing during the summers; heavy clothing during the winters; school supplies in late summers; antifreeze during the winters; golf balls in the summers; cold tablets in the winters; and sunglasses in the summers. Two forecast models are described: the seasonal smoothing multiplicative forecast model, and the seasonal smoothing additive forecast model. Perhaps the most common application of the model is when the demands are monthly covering 12 months in a year. The seasonal multiplicative model is described fully with example data. The model has two stages: first is to initialize

the forecasts using the most current N history demands, and second is to revise the forecasts as each new monthly demand becomes available. The model includes a trend component and twelve seasonal ratios for each month of the year. The trend component could be flat, rising or falling, and the seasonal ratios could vary for each month of the year indicating an increase or decrease in the demands for the month relative to the trend. The model requires three smoothing parameters that assign higher weights to the more recent demands in the history. This way, the forecasts can readily react to any changes in the demand flow of the items in forecast. For brevity, an abridged discussion of the seasonal additive model is presented.

Chapter 6. Promotion Forecasts Promotions come in various ways: price reduction, buy one get one free, zero interest, no money down, and so on. They often occur when a supplier or a stock location offers a price incentive of some sort to the customers to buy now with enticements for purchases in larger quantities. The promotion typically has a start-date and end-date, and the demand during these days is relatively higher than the normal non-promo days. This situation causes wild fluctuations in the demand history and upsets the forecasting model in use. The standard deviation increases and the forecast coefficients swing out of normal control. Special adjustments are needed in the forecast models to overcome the fluctuations. Two forecast models are described here to accommodate the promotion activity: the promotion horizontal model and the promotion trend model. Both of the models involve two stages: the initial stage and the revision stage. The initial stage is the first estimates of the coefficients of the model. This stage requires N history months of demands and promotion measures. The coefficients of the model are estimated using regression methods where equal weight is given to each of the history months. The revision stage is used for the months after the initial stage where the coefficients are revised every month with each current month's data using the smoothing method. The standard deviation and the coefficient of variation are computed for each of the two stages.

Chapter 7. Multi SKU Forecasts An sku is an abbreviation for the term stock-keeping-unit that identifies an item being in the inventory at a stocking location. Could be a part number, a product number, a style number, so forth. Should a model of a certain tool be in stock at a dealer, it is an sku at that dealer. If the same model is in stock in 1000 dealers, it is an sku in each of the 1000 dealers. It is also an sku at each distribution center that stocks the model. A truck parts dealer typically has 15,000 skus and a truck distribution center may have 100,000 skus. A shoe store in the mall may have 2000 skus in shoes alone, since each style by size and width is a separate sku. Forecasts are needed for each sku (usually monthly) to use in the inventory stocking computations.

When a part is stocked as a service part in an inventory system with five distribution centers (DC), the part is an sku in each of the DC's. Forecasts are needed for each part by location to arrange for the proper stock at each location. A forecast is also needed for the aggregate demands of the part in all locations so economic replenishments of the part from the supplier can be determined.

Consider a style shoe with 36 size and width combinations. Each size and width for the style shoe is an sku. Forecasts are needed for each size and width to be used in the inventory decisions at the distribution centers and at each store. The forecast is typically generated for the style itself, and this forecast is apportioned down to each of the size and width combinations. The same scenario also occurs in clothing, like men's shirts, with different sizes, and so forth.

This chapter describes two common ways to forecast when multiple skus are of concern in an inventory system, the top-down method and the bottom-up method. Top-down is when the aggregate demand history is used to forecast the demands over the future months. The aggregate forecast is then allocated down to each sku using an sku percent representing its portion of the total demand. This way, the forecasts for the total and for each sku are generated in a systematic manner. The bottom-up method is in use when a forecast is generated for each sku and the sum of the sku forecasts are used to determine the forecast for the total.

In both methods, the standard deviation of each forecast is of need for subsequent use in inventory decisions. Methods are shown on how to compute the standard deviations for each sku and for the total when the top-down and bottom-up methods are in use.

Chapter 8. Forecast Sensitivity Along the supply chain, in distribution centers, stores, dealers, so forth, forecasts are in continual need for inventory decisions to project the flow of demands over the future months for each item stocked. The more accurate the forecasts, the better the inventory decisions and the more profitable the entity. A $10\%$ decrease in the measure of the forecast error will result in approximately a $10+$ percent decrease in the amount of safety stock needed. This reduced stock is very helpful to the profit margin on the inventory system.

In this chapter, a series of simulation runs are developed to appraise the forecaster on how some elements in forecasting affect the accuracy of the forecasts. For this purpose, the forecast accuracy is measured by the coefficient of variation, cov, of the one-month ahead forecast error. A first series of tests concern the number of months of demand history to use in developing the forecasts. The cov is measured as the history of demands range from 6 to 48 months and the forecasts are for the horizontal and trend demand patterns. A second series of tests are aimed at measuring how forecast accuracy depends on the choice of parameters and forecast model selected. Three separate simulations are run; one for the horizontal demand pattern, another for the trend demand pattern, and yet another for the seasonal demand pattern. A third series of tests demonstrate how damaging outlier demands are to the forecasts and the forecast accuracy. Two examples are given, one for a horizontal demand pattern and another for a trend demand pattern.

Chapter 9. Filtering Outliers A primary goal of forecasting is to measure the flow of demands from the history months and project to the future months with a minimum forecast error. A way to enhance this goal is by filtering the history demands to seek out any outlier demands and adjust accordingly. As demonstrated in the prior chapter, outlier demands cause much damage to the forecasts and increase the forecast error. Filtering of the demand history is not an easy process, but is

important to yield forecasts with minimal forecast error. Reducing the forecast error will reduce the amount of safety stock needed to run the inventory operation. This chapter shows a way to seek out and adjust any outlier demands from the history months when the demand patterns are of the horizontal, trend or seasonal type. The filtering process takes place just prior to generating the forecasts.

Another way to minimize outlier demands is by filtering the line demands that occur in the order entry phase of the inventory stocking location. This is when the customers send in the purchase orders and list on each line of the order, a part number and a quantity. This part number request is a line demand and can be filtered to seek if it is an outlier. If an outlier is detected here, the line demand is sent back to the customer seeking verification on the quantity.

Chapter 10. Standard Normal and Truncated Normal Distributions The normal distribution is perhaps the most commonly used probability distribution in materials management as well as in many other scientific developments. This chapter shows how the variable $x$ , from the normal, is related to the standard normal distribution with variable $z$ . A portion of the standard normal contains all values of $(z > k)$ where $k$ is a specific value of $z$ . Of particular interest in subsequent use is the partial mean and partial standard deviation of the measure $(z - k)$ from this portion of the standard normal. Another useful distribution is the truncated normal that also is defined with a parameter $k$ . This distribution has many shapes and a measure of interest is the coefficient of variation, cov, that helps to identify the shape of the distribution. The two distributions, standard normal and truncated normal, have applications in inventory control and examples on how they are used appears in Chaps. 11 and 12.

Chapter 11. Safety Stock Safety stock is the extra inventory to hold for an item for protection against demands exceeding the forecast. This type of stock concerns entities where the demands of the future are not known until they happen, like in distribution centers, stores and dealers. In plants, where the production schedules are set in advance, safety stock is usually not needed. The typical way to measure the variability in the forecasts is by the one month ahead forecast error. A relative measure is the coefficient of variation. Two common methods of generating the safety stock are: the service level (probability not out of stock), and the percent fill (ratio of demand filled over total demand) methods. Both methods are also sometimes referred as the service level method. The normal distribution is used primarily to generate how much safety stock to have available. This chapter shows how the truncated normal distribution can also serve this function. The truncated normal has many shapes and includes only portions of the right-hand-side of the standard normal.

Chapter 12. Auxiliary Forecasts Management often needs forecasts that are not like the models described in the earlier chapters that are generated using the flow of demands from the history months. This chapter describes some of the more commonly needed forecasts of this type. A first concerns the forecasts for the first future month and the demand-to-date as the month is progressing. For the first month, a

forecast has already been generated, and as the month progresses, the demand-to-date demand is evolving. The forecast for the remaining portion of the month is generated along with the associated standard deviation. Another scenario occurs for parts when some demands are ordered for future deliveries, called advance demands. A forecast for the future month has already been generated in the usual way from the flow of history demands. An adjustment to the future month's forecast is developed based on the advance demand information. Another situation that often occurs in service parts inventory is when a forecast is needed on a part even when no history demands are available. This happens when a new part is included on the bill-of-material of a finished good item due to an engineering change or a redesign, and the part is to be immediately held in inventory at the service part location. This situation is called the initial buy quantity. Another condition that takes place often in service parts locations is when the supplier will stop supplying the part, even when the service part location is obliged to carry the part for future possible needs from its customers. This is called the all-time-buy.

# Chapter 2 Demand History

# 2.1 Introduction

Forecasts are necessary for each part in every stocking location as they are used in the stocking decisions on when to replenish the stock and how much. The forecasts are typically revised each month as the new monthly demand entry becomes available. The forecasts are based on the history flow of the demands over the past months. The more accurate the demand history, the better the forecasts. The typical inventory system saves anywhere from 12 to 36 months of demand history.

The data to save is the monthly demand history, denoted as, $\mathrm{x}(1),\dots,\mathrm{x}(\mathrm{N})$ , where $\mathrm{x(t)}$ is the demand in month $\mathrm{t}$ , $\mathrm{t} = 1$ , the oldest month in the history, and $\mathrm{t} = N$ , the most current month. The demand history to save varies depending on the stock keeping facility. Often, the database history includes the monthly demands and monthly lines, where each customer order represents a line and the quantity on the order is the demand. At the end of each month, the total demands and lines are tallied for the month. The database may also include the demand-to-date for the current month as it is progressing. In service parts distribution centers, the demands from dealers are often classified as either regular or emergency. For distribution centers that supply retail stores, the demands may be labeled as new stock and replenish stock. New stock includes the initial delivery to the stores. Some stocking facilities save their demands on a weekly basis rather than monthly. Plants often operate with fiscal (rather than calendar) months that are denoted as 445 or 454 or 544.

Some distribution centers have demands that are classified as either regular demands and as other requirements. Other requirements are from out-of-the-ordinary customers. In some distribution centers and stores, the demands may be partitioned as regular demands and as promotion demands. Another type of demand is called advance demand and this occurs when a distribution center receives a customer order that is not to be shipped until some future date. When demands are shipped incorrectly, the customer returns the stock to the stocking location and these are labeled as return demands. Sometimes unusual events occur that cause a spike in the demand, or an error happens in order entry where the quantity or part number enters incorrectly, causing the entry on the database to be significantly different from the normal flow

and is called an outlier demand. This type of demand is damaging to the forecasts and needs to be found and adjusted accordingly, prior to the forecasts. The flow of the demands, called the demand pattern, is mostly of the horizontal, trend or seasonal type. The chapter describes a way to convert fractional forecasts to integer forecasts; and how to compute cumulative forecasts for the future months. An inventory profile section is given that summarizes some revealing statistics on the demand history and forecast results that are taken from an actual large inventory holding system.

# 2.2 Customer Demand History for a Part

The demand history (for a part) is the main data used to generate a forecast for the future months. The history of customer demands is usually denoted as: $\mathrm{x}(1),\dots,\mathrm{x}(\mathrm{N})$ where $\mathrm{x(t)}$ is the demand in month $\mathrm{t}$ . For newer parts, $N$ is also the number of months of history since the part was introduced. For long time parts, $N$ may be cut off to 12, or 24 or 36 months depending on the discretion of the management. The number of lines for month $\mathrm{t}$ , $\mathrm{n(t)}$ , is also useful information and the history is here denoted as: $\mathrm{n}(1),\dots,\mathrm{n}(\mathrm{N})$ . Using the history of the demands and of the lines, it is possible to compute the history of pieces-per-line and this is denoted as: $\mathrm{d}'(1),\dots,d'(N)$ where $\mathrm{d}'(t) = 0$ if $\mathrm{n(t)} = 0$ , otherwise, $\mathrm{d}'(t) = \mathrm{x(t) / n(t)}$ . Note also, the number of pieces for line $i$ in month $\mathrm{t}$ is here denoted as: $\mathrm{d}_{(\mathrm{i},\mathrm{t})}\mathrm{i} = 1,\dots,\mathrm{n(t)}$ . The corresponding demands for month $\mathrm{t}$ is tallied from: $\mathrm{x(t)} = \mathrm{d}_{(\mathrm{l},\mathrm{t})} + \dots +\mathrm{d}_{(\mathrm{n(t),t})}$ .

In summary, the notation on the demand history of a part is denoted as follows:

$\mathrm{N} =$ number of months history saved

$t = 1,\dots ,N =$ demand history months

$\mathrm{x(t) =}$ demands in month t

$\mathrm{n(t) =}$ number of lines in month t

$\mathrm{d}'(\mathrm{t}) = \mathrm{x}(\mathrm{t}) / \mathrm{n}(\mathrm{t}) =$ pieces-per-line in month t

# 2.3 Demand-to-Date

Another piece of demand data that may become useful occurs in the first future month of forecasts as time rolls on. This is the month immediately after month $t = N$ that has been previously labeled as the last month of the history months. In month $N + 1$ , the first subsequent month after $t = N$ , the demands to date for a part, are here labeled as $x_w$ , and the corresponding portion of time of this month, is labeled as $w$ . This data is dynamic. The entry $x_w$ will change with each new demand in the month, and $w$ will change with each day of the month. This data is useful to determine the integrity of the month-1 forecast, as the month progresses.

A summary of the data for the current month to date is below:

$\mathrm{x_w} =$ demand for current-month-to-date

$w =$ portion of current month-to-date $(0\leq \mathrm{w}\leq 1)$

# 2.4 Service Part Regular and Emergency Demands

In a service parts distribution center, DC, of finished goods items (autos, trucks, farm equipment, construction equipment) the DC carries service parts to fill the demands that come from its dealers. The demands are of two type, regular and emergency. When a customer orders with a regular line, this is generally to provide stock needed for a subsequent need as it may occur at the dealership, whereas, the quantity on an emergency line is needed to immediately maintain or repair a finished-good-item that is in the dealership in a down status. Typically, the average number of pieces per line for a regular line is larger than for an emergency line.

Some of the data that is useful in this situation is listed below:

$\mathrm{x(t) =}$ monthly service part demands from customers $\mathrm{xr(t) =}$ regular service part demands from customers $\mathrm{xe(t) =}$ emergency service part demands from customers

$$
\mathrm {x} (t) = \mathrm {x r} (t) + \mathrm {x e} (t)
$$

$\mathrm{p(r) =}$ probability a line is regular demand $\mathrm{p(e) =}$ probability a line is an emergency demand

$$
p (r) + p (e) = 1
$$

$\mathrm{nr(t)} =$ number of regular lines in month t $\mathrm{ne(t)} =$ number of emergency lines in month t $\mathrm{n(t) = nr(t) + ne(t) =}$ number of lines in month t $\mathrm{dr}_{(i,t)} =$ number of pieces for i-th regular demand in month t $\mathrm{de}_{(i,t)} =$ number of pieces for i-th emergency demand in month t $\mathrm{dr}^{\prime} =$ average of regular pieces per line $\mathrm{de}^{\prime} =$ average of emergency pieces per line $\mathrm{x(t) = [dr_{(l,t)} + \ldots + dr_{(nr(t),t)}] + [de_{(l,t)} + \ldots + de_{(ne(t),t)}] =}$ demands for month t

# 2.5 New and Replenish Stock Demands for Retail Items at DC

Consider a distribution center, DC, for finished-good-items that supplies the stock to retail stores. This could be for shoes, sweaters, furniture, and so on. The salesperson for the DC may visit the stores in his/her territory and arrange to provide a quantity of stock to be stocked for sale for the store customers to view and purchase. This stock is not a true demand at this point, but is here called a new stock demand. Subsequently, should sufficient sales of the item be sold to the store customers, the store may reorder more stock from the DC. This new line of demands is here called

replenish stock demands. The initial new stock demand is not really a demand until the customer sends in an order to the DC for replenish stock on the item. In the event the store cannot sell the new stock, the store might return part or all of the new stock that it was initially provided by the DC.

Below is a summary of the data for the supplier of this scenario:

$\mathrm{xn(t)} =$ new stock demand at month t

$\mathrm{xr(t)} =$ replenish stock demand at month t

$\mathrm{x(t) = xn(t) + xr(t) =}$ total demand at month t

# 2.6 Weekly Demands

Most plants and many retailers operate on a weekly basis and thereby cumulate their requirements and demands weekly. The plants typically schedule their production activities weekly and thereby plan accordingly. Many retail stores also schedule their replenish and promotion plans on a weekly basis. Weekly demands tend to fluctuate more than the counterpart monthly demands, and thereby subsequent weekly forecasts are less accurate than monthly forecasts. Weekly demands also are more compatible to horizontal and trend forecast models, whereas, monthly demands are compatible to horizontal, trend and seasonal forecast models.

Some of the data notation for weekly demands is listed below:

$\mathrm{w(t) =}$ demand at week t

$\mathrm{Nm} = 12 =$ number months in a year

$\mathrm{Nw} = 52 =$ number weeks in a year

$\mathrm{Nw / Nm = 4.33 =}$ average weeks in a month

$\mathrm{w}^{\prime} =$ forecast for an average week's demand

if $w$ is the forecast:

$\mathrm{x}^{\prime} = 4.33\mathrm{w}^{\prime} =$ forecast for an average month

$\sigma_{\mathrm{w}}^{2} =$ variance of weekly demands

$\sigma_{\mathrm{x}}^{2} = 4.33\sigma_{\mathrm{w}}^{2} =$ relation between variance for monthly and weekly demands

$\sigma_{\mathrm{x}} = \sqrt{4.33}\sigma_{\mathrm{w}} = 2.08\sigma_{\mathrm{w}} =$ standard deviation for monthly demands

$\sigma_{\mathrm{w}} = 1 / 2.08\sigma_{\mathrm{x}} = 0.481\sigma_{\mathrm{x}} =$ standard deviation for weekly demands

If $x^*$ is the monthly forecast:

$\mathrm{w}^{\prime} = (1 / 4.33)\mathrm{x}^{\prime} =$ forecast for an average week

# 2.7 445 Fiscal Months at Plants

Many plants operate on a fiscal monthly basis of the 445 type. This is when the first three fiscal months of the year are defined as follows: the first four weeks of the year represent fiscal January, the next four weeks are fiscal February, and

the next five weeks are fiscal March. The pattern repeats for the remaining nine fiscal months of the year. The fiscal months may also be defined as 454 instead of 445, or by 544 instead of 445. In either case of 454 or 544, the fiscal months are defined by the stated number of weeks in the month. This way of defining the fiscal months ensures that there are twelve fiscal months in a year, and also satisfies the plant's desire to end each fiscal month on the same day of the week, e.g. Saturday.

In summary, the months of the year can be of the calendar type or of the fiscal type as described above. The three options for fiscal months are defined as below.

445 is for fiscal January, February and March.

454 is for fiscal January, February and March.

544 is for fiscal January, February and March.

The pattern is repeated for the remaining 9 months of the year

# 2.8 Regular Demands and Other Requirements at DCs

A distribution center of service parts is structured to house inventory for its regular customers (dealers) so that the stock is available when the customers send in their orders. The demand history is the data that is used to generate the DC forecasts covering the future months of demands. The forecasts are the tools that allow the DC to properly provide stock for the customers accordingly. On some occasions, usually infrequently, an order will come in from a non-regular customer for one or for a variety of parts. This non-regular customer could be from an overseas location, or a government facility or the military. In any event, the demand is not from the regular set of customers that the forecast covers. It also is often a demand for a future time period, perhaps to be delivered in a future month from the date of the order. This demand is here called an: other requirement. The demand is not included in the history of demands that are used to forecast the demands of the regular type demands. The demand is added to the forecasts for the future months and becomes part of the total requirements for the part. The inventory replenishment side of the computations needs to provide stock to cover the forecast of regular demands and also for the other requirements.

Below is a summary of the data described for this scenario.

$\mathrm{x(t)} =$ regular demands at t

$\mathrm{xo(t)} =$ other requirements at t

$\mathrm{r(t) = x(t) + xo(t) =}$ total requirements at t

$\mathrm{x(t)}\mathrm{t} = 1$ to $N$ is used to forecast the demands from the regular customers for the future months

$\mathrm{xo}(\tau) =$ other requirement for future month $\tau$ and is any demand from a non-regular customer base (overseas customer, military order, etc.)

# 2.9 Regular and Promotion Demands at DCs and Stores

Promotions of various type occur from time to time at the DC or at the dealers. A common promotion is when the supplier offers a discount on the price for all units sold from day d1 to day d2. This could be for one item or for a line of items. The units sold during the promotion period are recorded and identified as promotion demands. The portion of the months that are included in the promotion period could also be recorded. This data is useful in generating forecasts for the future months, when there is no promotion and when there is a promotion.

One way to capture the demands associated with a promotion is as follows. Let $\mathrm{p(t)} =$ portion of month t where a promotion is active. If the promotion runs from $\mathrm{d1} =$ June 14 to $\mathrm{d2} =$ July 14, and June is month t=6, $\mathrm{p(6)} = (30 - 13) / 30 = 0.57$ ; and $\mathrm{p(7)} = 14 / 31 = 0.45$ . In any month t with no promotion, $\mathrm{p(t)} = 0$ . Further, the demands during the promotion period are saved as $\mathrm{xp(6)}$ for June, and $\mathrm{xp(7)}$ for July. Subsequent computations allow the forecaster to use this data in generating the forecasts.

A review of the data when promotions are involved is listed below:

$\mathrm{p(t)} =$ portion of month t when a promotion is live $\mathrm{xr(t)} =$ regular demands at t $\mathrm{xp(t)} =$ promotion demands at t $\mathbf{x}(\mathfrak{t}) = \mathbf{x}\mathbf{r}(\mathfrak{t}) + \mathbf{x}\mathbf{p}(\mathfrak{t}) =$ total demands at t

# 2.10 Advance Demands

On some occasions, a customer places an order for stock to be delivered in a future date, usually a month or two in the future. This demand is not for the current month and thereby is not recorded as a demand in the current month. Instead, the demand is labeled as advance demand, for the future month as the order calls. This advance demand is important information and could be used to adjust the forecast for the named future month.

The data (quantity and month) recorded for this demand is the following: $\mathrm{xa}(\tau) =$ advance demand for $\tau$ -th future month

# 2.11 Demand Patterns

There are three basic demand patterns: horizontal, trend and seasonal. Horizontal occurs when the demands are neither rising of falling over time whereby the average is relatively steady. Trend is when the demands are gradually increasing or are decreasing over time. Seasonal is when the demands vary by the months of the year, and the pattern repeats every year. Two versions of the seasonal pattern occur: seasonal multiplicative and seasonal additive. Often, low volume parts are of the horizontal type. Mid to high volume parts could follow any of the three demand patterns.

# 2.12 Return Demands

Letting $\mu(t)$ represent the average demand at month $t$ , the demand patterns could be defined as follows:

Horizontal

$$
\mu (t) = a \quad a = \text {l e v e l}
$$

Trend

$$
\mu (t) = a + b t \quad b = s l o p e
$$

Seasonal multiplicative:

$$
\mu (t) = (a + b t) r (t)
$$

$\mathrm{r(t)} =$ seasonal ratio at month t

$\mathrm{r(t)} = 1$ when month $t$ demand is same as the trend $(a + bt)$

$\mathrm{r(t) > 1}$ when month t demand is higher than the trend

$\mathrm{r(t)} < 1 =$ when month t demand is lower than the trend

Seasonal additive:

$$
\mu (t) = (a + b t) + d (t)
$$

$\mathrm{d}(t) =$ seasonal increment at month t

$\mathrm{d}(t) = 0$ when month t demand is same as the trend

$\mathrm{d}(t) > 0$ when month t demand is higher than the trend

$\mathrm{d}(t) < 0$ when month $t$ demand is lower than the trend

# 2.12 Return Demands

As an order comes in to a stocking facility with a line of items, each line lists the part and the quantity to ship to the customer. Should an error occur by incorrectly picking the part, in typing the part number or the quantity, the part and quantity are nevertheless shipped to the customer. When the customer discovers the fault, the pieces are returned to the supplier and are here called returned demands. The demand history is in error for the part when this event occurs, and a correction to the demand history should be made accordingly.

Suppose the data associated with a returned demand is the following: $\mathrm{xr}(t_0) = \mathrm{stock}$ returned at month $t_0$ . With this data in hand, a routine is needed to estimate where this demand came from. One possibility is to scan the demand history of the part, $\mathrm{x}(1),\dots,\mathrm{x}(\mathrm{N})$ and find the most recent month, $t_1$ , where $\mathrm{x}(t_1)\geq \mathrm{xr}(t_0)$ and where $t_1\leq t_0$ , and then adjust the demand entry at $t_1$ as: $\mathrm{x(t_1) = x(t_1) - xr(t_0)}$ .

# 2.13 Outlier Demands

On occasion, the demand history may include a demand entry that is significantly beyond the flow of the normal demands in the history. This demand is here called and outlier demand. Outlier demands are mostly above the normal flow of demands. An outlier demand could occur in several ways, one is when the demand is ordered for a wrong part, or the quantity ordered is mistyped. This could also occur due to unusual weather conditions, e.g., windshield wiper demands when an unusual ice storm occurs. Outlier demands are very damaging to the accuracy of the forecasts and as much as possible, prior to generating the forecasts, they should be detected and adjusted accordingly.

A routine is needed to seek if any demand entry, say $\mathrm{x(t_o)}$ , in the history of demands, $\mathrm{x}(1),\dots,\mathrm{x}(\mathrm{N})$ , is significantly outside the flow of its neighbor demands. Should a demand entry be found, the entry is adjusted accordingly, ideally to fall in line with the flow of all the demand entries.

# 2.14 Coefficient of Variation

The coefficient of variation, cov, is a relative way to measure the forecast error associated with a part. This is computed by $\mathrm{cov} = (\sigma / \mathrm{a})$ , where $\mathrm{a}$ is the level, and $\sigma$ is the standard deviation of the one period ahead forecast error. The level, $\mathrm{a}$ , is a measure used in forecasting to represent the average flow of demands in the most current month. When a seasonal demand pattern is in effect, the level represents a measure of the seasonally adjusted demand for the current month. The cov is always positive, and the closer to zero, the more accurate the forecasts.

# 2.15 Demand Distribution

It is possible to estimate the probability distribution of the forecast errors associated with each part. The one month ahead forecast error for month $t$ would be: $e = (x^{\prime} - x)$ where $x^{\prime}$ is the forecast of the month's demand and $x$ is the actual demand. The shape of the probability distribution is important in the subsequent computations where the inventory control on the part takes place, when determining the safety stock that complies with the desired service level specified by the management.

Recall, the level, a, represents the average flow of demands at the current time, and $\sigma$ is the standard deviation of the one month forecast error. Further, $\mathrm{cov} = \sigma / \mathrm{a}$ is a relative measure of the forecast error on the part. In the event the forecast errors are shaped like a normal distribution, cov is near or less than 0.33. In the event cov is close to 1.00 or above, the distribution is called lumpy and is more like an exponential distribution, which is far different than a normal distribution.

Very often in forecasting, the cov on a part is not in the neighborhood of 0.33, but is much higher. This is especially true on parts where the demands are of the

# 2.18 Inventory Profile

low volume type. The inventory management is here cautioned not to always assume the normal distribution in the inventory analysis for the parts where the cov is relatively high.

# 2.16 Cumulative Round Algorithm

The demand forecasting models of this book will generate forecasts that are in fractional form, and are here called raw forecasts. The typical inventory system will convert these fractional forecast to integers. A way to do this is introduced below in pseudo code and is called the cumulative round algorithm (CRA). The notation uses $\mathrm{f}(\tau)$ as the raw forecast for future month $\tau$ ( $\tau = 1$ to $\mathrm{N}^{\prime}$ ) where $\mathrm{N}^{\prime}$ is the number of future months, and $\mathrm{x}^{\prime}(\tau)$ is the associated integer forecast.

$$
\begin{array}{l} \text {S t a r t} \\ \text {d = 0} \\ \text {f o r \tau = 1 t o N} \\ \text {x ^ {\prime} (\tau) = i n t e g e r [ f (t) + d + 0 . 5 ]} \\ \text {d = d + [ f (\tau) - x ^ {\prime} (\tau) ]} \\ \text {n e x t \tau} \\ \text {E n d} \end{array}
$$

# 2.17 Cumulative Forecasts

Often, forecasts are needed for an accumulation of future months. If the monthly forecast is denoted as $\mathbf{x}^{\prime}(\tau)$ for future month $\tau$ , and the cumulative forecast for T future months is $\mathrm{X}^{\prime}(\mathrm{T})$ , the computations are as below.

$$
\text {I f} \quad T = 3, \quad X ^ {\prime} (3) = x ^ {\prime} (1) + x ^ {\prime} (2) + x ^ {\prime} (3)
$$

$$
\text {I f} \quad T = 1. 7, \quad X ^ {\prime} (1. 7) = x ^ {\prime} (1) + 0. 7 x ^ {\prime} (2)
$$

$$
\text {I f} \quad T = 0. 6, \quad X ^ {\prime} (0. 6) = 0. 6 x ^ {\prime} (1)
$$

and so forth.

# 2.18 Inventory Profile

In this section are some statistics from the service parts division of a large automotive corporation with over 100,000 part numbers and annual demand over $1 billion. The service part division includes multiple locations in North America.

Table 2.1 lists the percent of part numbers $(\% N)$ , by number-months-of-demand-history (NMH). Note, $7.0\%$ of the part numbers have 1-12 months of demand

Table 2.1 Percent of part numbers $(\% N)$ , by numbermonths-of-demand-history (NMH)   

<table><tr><td>NMH</td><td>%N</td></tr><tr><td>1–12</td><td>7.0</td></tr><tr><td>13–24</td><td>6.7</td></tr><tr><td>35–36</td><td>8.5</td></tr><tr><td>37+</td><td>77.8</td></tr><tr><td>Sum</td><td>100</td></tr></table>

Table 2.2 Percent of part numbers $(\% N)$ by outlier type (none, low, high)   

<table><tr><td>Outlier Type</td><td>%N</td></tr><tr><td>none</td><td>74.7</td></tr><tr><td>low</td><td>0.1</td></tr><tr><td>high</td><td>25.2</td></tr><tr><td>Sum</td><td>100</td></tr></table>

Table 2.3 Percent of part numbers \((\% N)\) and percent of annual demand dollars \((\% \\) ),\) by forecast type (horizontal, trend, seasonal)   

<table><tr><td>Forecast Type</td><td>%N</td><td>%$</td></tr><tr><td>horizontal</td><td>52</td><td>4</td></tr><tr><td>trend</td><td>44</td><td>69</td></tr><tr><td>seasonal</td><td>4</td><td>27</td></tr><tr><td>Sum</td><td>100</td><td>100</td></tr></table>

history, while $77.8\%$ have over 36 months of demand history. Note, the system generates roughly $7\%$ of new parts each year; and assuming equilibrium, about $7\%$ of the parts are discarded each year as well. The database holds the most current 36 months of demand history on each part number.

Table 2.2 gives the results of the outlier filtering algorithm, where $74.7\%$ of the part numbers $(\% N)$ had no outlier detected, $0.1\%$ had a low outlier detected, and $25.2\%$ had a high outlier detected. The filtering process checks all 36 months of demand history in each of the distribution centers. Each of the 36 demands are checked in every distribution center and should any be significantly out-of-the-ordinary, the part is labeled as an outlier.

Table 2.3 lists the type of forecast model by percent of part numbers (\%N), and percent of annual demand in dollars (\%S). The table shows where $52\%$ of the part numbers had a horizontal forecast model and this amounted to $4\%$ of the annual demands in dollars. Note also where $4\%$ of part numbers have a seasonal forecast model and they amount to $27\%$ of the annual demands in dollars.

Table 2.4 gives the monthly growth rate, $\mathrm{g}$ , of the part numbers, by percent of part numbers, (%N), and percent of annual demand in dollars, (%$). The monthly growth rate was computed by: $\mathrm{g} = (a + b) / a$ where $a$ is the level and $b$ is the slope. Note, 74% of the part numbers had a monthly growth rate of (0.995-1.005) and these parts amounted to 36% of the annual demands in dollars.

Table 2.5 gives the monthly coefficient of variation, cov, by percent of part numbers (%N), and percent of annual demand dollars (%$). The table shows where 26%

Table 2.4 Percent of part numbers $(\% N)$ , and percent of annual demand dollars $(\% \$)$ , by monthly growth rate (g)   

<table><tr><td>Growth Rate</td><td>%N</td><td>%$</td></tr><tr><td>1.030–</td><td>1</td><td>3</td></tr><tr><td>1.005–1.030</td><td>14</td><td>29</td></tr><tr><td>0.995–1.005</td><td>74</td><td>36</td></tr><tr><td>0.970–0.995</td><td>10</td><td>30</td></tr><tr><td>-0.970</td><td>1</td><td>2</td></tr><tr><td>Sum</td><td>100</td><td>100</td></tr></table>

Table 2.5 Percent of part numbers $(\% N)$ , and percent of annual demand dollars $(\% \mathbb{S})$ , by 1-month coefficient of variation (COV)   

<table><tr><td>COV</td><td>%N</td><td>%$</td></tr><tr><td>0.0–0.3</td><td>26</td><td>68</td></tr><tr><td>0.3–0.5</td><td>12</td><td>16</td></tr><tr><td>0.5–0.8</td><td>12</td><td>7</td></tr><tr><td>0.8–1.0</td><td>10</td><td>4</td></tr><tr><td>1.0–</td><td>40</td><td>5</td></tr><tr><td>Sum</td><td>100</td><td>100</td></tr></table>

of the part numbers had a cov of (0.0–0.3) and these amounted to $68\%$ of the annual demand in dollars. Note, $50\%$ of the parts have irregular (lumpy) demands since the cov is 0.80 or larger. But these parts are a combination of low volume and low value since they amount to only $9\%$ of the annual dollar demand. $84\%$ of the annual dollar demands are from parts with a cov of 0.5 or less.

# Summary

The more precise and detailed the demand history on each part in the stocking location, the more flexibility and accurate the forecasts become. In the typical stocking location, the demand history is saved in calendar monthly or weekly buckets. Plants often save their demands in fiscal 445 type monthly buckets. One or more years of demand history is needed to generate the forecasts. Various type of demands are saved, depending on the operation of the stocking location. The various type of demand include the following: regular, emergency, advance stock, regular stock, promotion, other-requirements, new stock, advance demands and return demands. In some stocking locations, the history of the number of customer lines is saved and becomes useful in generating the forecasts. Sometimes outlier demands creep into the demand history and it is important to seek out and adjust the outliers accordingly. The more accurate demands, the better the forecasts. Care in the forecasts is essential, since good forecasts will minimize the events of lost sales, backorders and surplus. The coefficient of variation, cov, is a useful relative measure on the forecast accuracy of a part. Also described is the cumulative round algorithm that converts fractional forecasts into integer forecasts. Also of occasional need are cumulative forecasts for various durations of the future months.

# Chapter 3 Horizontal Forecasts

# 3.1 Introduction

Perhaps the most typical demand pattern is the horizontal where the month-to-month demands fluctuate above and below a path (called the level) without any trend or seasonal influence. This chapter describes five horizontal forecasting models. These forecast models are here called the following: horizontal forecast, horizontal moving average forecast, horizontal discount forecast, horizontal smoothing forecast, and forecasts using 2 stages. In all situations, the concept of raw and integer forecasts is shown. For each of the models, monthly raw forecasts are generated in fractional form. A corresponding set of forecasts is called integer forecasts and these are converted from the raw forecasts by way of the rounding algorithm. A key measure of the forecasts is the standard deviation of the 1-month forecast errors. This measure is needed subsequently when inventory decision are computed. Another useful measure, the coefficient-of-variation, is a relative way to measure the forecast error.

# 3.2 Horizontal Forecasts

When the least square method is used to generate a horizontal forecast model, a parameter $N$ specifies the number of history demands to use in the forecast. The most recent $N$ demands are denoted as $x(1), \ldots, x(N)$ where $x(t)$ is the demand in month $t$ , $t = 1$ is the oldest month, and $t = N$ is the most recent month. The forecast for the $\tau$ -th future month is

$$
\mathrm {f} (\tau) = \mathrm {a} \quad \tau = 1, 2,...
$$

where $a$ is called the level representing the average demand per month.

The estimate of the level is obtained by formulating the expression on the sum of squares, $\mathrm{S}(\mathrm{e})$ , as below,

$$
\mathrm {S} (\mathrm {e}) = \sum_ {t = 1} ^ {N} [ x (t) - a ] ^ {2}
$$

where $\mathrm{e}(t) = [\mathrm{x}(t) - \mathrm{a}]$ is the residual error at history month $t$ . The value of the level, a, that yields the minimum of S(e) is called the least squares estimate, and in this situation, the level becomes,

$$
\mathrm {a} = \Sigma_ {t = 1} ^ {N} x (t) / \mathrm {N}
$$

# 3.3 Raw Forecasts

The forecasts for the $\tau$ -th future month is thereby,

$$
f (\tau) = a ^ {\prime} \quad \tau = 1, 2, \dots
$$

This forecast is here called a raw forecast since the forecast values are most likely fractions, same as the value of a'.

# 3.4 Cumulative Rounding Algorithm

In most systems, the raw forecasts, $\mathrm{f}(\tau)$ , are converted to integer forecasts, denoted as $\mathbf{x}^{\prime}(\tau)$ . Various ways to do this are in use. A cumulative-rounding algorithm (CRA) to accomplish is described below in a pseudo code manner. The method assumes $\mathbf{N}^{\prime}$ future forecasts are needed.

Start $\mathrm{d} = 0$ For $\tau = 1$ to N' $\mathrm{x}'(\tau) = \mathrm{integer}[f(\tau) + d + 0.5]$ $\mathrm{d} = \mathrm{d} + [f(\tau) - x'(\tau)]$ next $\tau$ End

The algorithm applies for any of the forecast models presented subsequently in this book for the purpose of converting the raw forecasts, $f(\tau)$ , to integer forecasts, $x^{\prime}(\tau)$ .

Example 3.1 Suppose a part is to be forecast with the horizontal forecast model and the forecast parameter is $N = 12$ . Assume the most recent 12 demands are the following: 10, 12, 6, 9, 4, 10, 6, 7, 9, 8, 13, 11. Below shows how to find the estimate

# 3.7 Integer Forecasts

of the level, and generate the raw and integer forecasts for the future months. The example further describes how to estimate the standard deviation of the forecast error and compute the associated coefficient of variation.

# 3.5 Estimate the Level

Using the least squares method, the estimate of the level is obtained by seeking the minimum sum of square of errors as shown below:

The residual error for month $t$ , here denoted as $e(t)$ , is obtained from, $e(t) = (x(t) - a^{\prime})$ . The associated sum of square of residual errors, referred as $S(e)$ , is the following:

$$
\mathrm {S} (\mathrm {e}) = \sum_ {t = 1} ^ {N} (e (t)) ^ {2}
$$

Using calculus, the value of the level that minimizes S(e) is obtained, thus yielding the least sum of square errors. The optimal value of the level becomes

$$
\mathrm {a} = \sum_ {t = 1} ^ {N} x (t) / \mathrm {N}
$$

Since, $\Sigma_{t = 1}^{N}x(t) = 105$ and $N = 12$ , the estimated of the level is:

$$
a ^ {\prime} = 1 0 5 / 1 2 = 8. 7 5
$$

# 3.6 Raw Forecasts

The raw forecast for the $\tau$ -th future month is simply,

$$
f (\tau) = a ^ {\prime} = 8. 7 5 \quad \tau = 1, 2, \dots \dots
$$

# 3.7 Integer Forecasts

To convert the raw forecasts to integer forecasts, the algorithm listed earlier is now demonstrated where the associated integer forecasts are denoted as $\mathrm{x}^{\prime}(\tau)$ for $\tau = 1$ , 2, ... Table 3.1 is a worksheet that shows how to convert the raw forecasts, $\mathrm{f}(\tau)$ , to integer forecasts, $\mathrm{x}^{\prime}(\tau)$ for each of the future months, $\tau = 1$ to 12. To begin, d is set to zero. At each $\tau$ , the raw forecast becomes the integer of $[\mathrm{f}(\tau) + \mathrm{d} + 0.5]$ . The entry, d is then revised by $\mathrm{d} = \mathrm{d} + [\mathrm{f}(\tau) - \mathrm{x}^{\prime}(\tau)]$ .

Figure 3.1 is a plot of the 12 history demands, followed by the 12 future integer forecasts.

Table 3.1 Worksheet to convert raw forecasts, $\mathrm{f}\left( \tau \right)$ ,to integer forecasts ${\mathrm{x}}^{\prime }\left( \tau \right)$ for Example 3.1   

<table><tr><td>τ</td><td>f(τ)</td><td>d</td><td>[f(τ)+d+0.5]</td><td>x&#x27;(τ)</td><td>d+[f(τ)-x&#x27;(τ)]</td></tr><tr><td>1</td><td>8.75</td><td>0.00</td><td>9.25</td><td>9</td><td>-0.25</td></tr><tr><td>2</td><td>8.75</td><td>-0.25</td><td>9.00</td><td>9</td><td>-0.50</td></tr><tr><td>3</td><td>8.75</td><td>-0.50</td><td>8.75</td><td>8</td><td>0.25</td></tr><tr><td>4</td><td>8.75</td><td>0.25</td><td>9.50</td><td>9</td><td>0.00</td></tr><tr><td>5</td><td>8.75</td><td>0.00</td><td>9.25</td><td>9</td><td>-0.25</td></tr><tr><td>6</td><td>8.75</td><td>-0.25</td><td>9.00</td><td>9</td><td>-0.50</td></tr><tr><td>7</td><td>8.75</td><td>-0.50</td><td>8.75</td><td>8</td><td>0.25</td></tr><tr><td>8</td><td>8.75</td><td>0.25</td><td>9.50</td><td>9</td><td>0.00</td></tr><tr><td>9</td><td>8.75</td><td>0.00</td><td>9.25</td><td>9</td><td>-0.25</td></tr><tr><td>10</td><td>8.75</td><td>-0.25</td><td>9.00</td><td>9</td><td>-0.50</td></tr><tr><td>11</td><td>8.75</td><td>-0.50</td><td>8.75</td><td>8</td><td>0.25</td></tr><tr><td>12</td><td>8.75</td><td>0.25</td><td>9.50</td><td>9</td><td>0.00</td></tr></table>

![](images/958c68a27e011f30413299244d38817087065267e5a2defc37e70ca4573f78cd.jpg)  
Fig. 3.1 Plot of the history demands and the forecasts for Example 3.1

# 3.8 Standard Deviation and Cov

The computations to find the estimate of the standard deviation of the forecast errors, and also the corresponding coefficient of variation are now described. The estimate of the standard deviation, denoted here as $s$ , is obtained from the sum of square of errors, $S(e)$ , as follows:

$$
\begin{array}{l} s = \sqrt {S (e) / (N - 1)} \\ = \sqrt {7 8 . 4 1 9 / (1 2 - 1)} \\ = \sqrt {7 . 1 2 9} \\ = 2. 6 7 \\ \end{array}
$$

Finally, the coefficient of variation is obtained as below:

$$
\operatorname {c o v} = \mathrm {s} / \mathrm {a} ^ {\prime} = 2. 6 7 / 8. 7 5 = 0. 3 0 5
$$

# 3.9 Horizontal Moving Average Forecasts

The horizontal moving average forecast model is associated with a parameter, $\mathrm{N}$ , that specifies the number of months history to use in calculating the average. The average is from the most recent $\mathrm{N}$ demand entries, $\mathrm{x}(1), \dots, \mathrm{X}(\mathrm{N})$ , where $\mathrm{N}$ is the most recent demand. In forecasting, the average is called the level and is labeled as a. For this forecast model, the estimate of the level becomes,

$$
\mathrm {a} ^ {\prime} = [ \mathrm {x} (1) + \dots + \mathrm {x} (\mathrm {N}) ] / \mathrm {N}
$$

A difficulty occurs for new parts where the number of months of history (nmh) is smaller than the parameter, N. This is overcome by using the following temporary parameter, N' as below:

$$
N ^ {\prime} = \operatorname {M i n} (N, \mathrm {n m h})
$$

Example 3.2 Suppose a forecaster wants to use the horizontal moving average model with parameter $N = 10$ . To begin, the only history demand is at $\mathrm{nmh} = 1$ , where $\mathrm{x}(1) = 10$ . Applying the rule given above, the temporary parameter becomes, $\mathrm{N}^{\prime} = 1$ , and thereby the estimate of the level is $\mathrm{a}^{\prime} = \mathrm{x}(1) = 10.00$ . Suppose at $\mathrm{nmh} = 2$ , $\mathrm{x}(2) = 12$ , thereby $\mathrm{N}^{\prime} = 2$ , and $\mathrm{a}^{\prime} = [10 + 12] / 2 = 11.00$ . Also assume at $\mathrm{nmh} = 3$ , $\mathrm{x}(3) = 6$ , yielding $\mathrm{N}^{\prime} = 3$ , and $\mathrm{a}^{\prime} = [10 + 12 + 6] = 9.33$ . Table 3.2, lists the demands, $\mathrm{x(t)}$ , for the first 12 months of history for the part, along with the parameter to use, $\mathrm{N}^{\prime}$ , and the estimate of the level, $\mathrm{a}^{\prime}$ , that results. Figure 3.2 depicts the estimated values of the level for the first 12 months of history.

Table 3.3 is a snapshot of the raw and integer forecasts over the next 12 months for the part when the number of months of history is $\mathrm{nmh} = 12$ . Note from Table 3.2, the 10 month moving average of the demands is $a^{\prime} = 8.30$ . So, the raw forecasts for each of the future months is $f(\tau) = 8.30$ . The corresponding integer forecasts, $x^{\prime}(\tau)$ , are listed in the table.

# 3.10 Standard Deviation and Cov

The standard deviation of the forecast errors is estimated in the same way as the earlier horizontal (least squares) forecast. In this situation, the most recent $\mathrm{N}^{\prime}$ demand entries are computed. When $(\mathrm{nmh} < \mathrm{N})$ , all the past history months are used, but when $(\mathrm{nmh} \geq \mathrm{N})$ , only the most recent $\mathrm{N}$ entries of demand history is used.

Table 3.2 First 12 months of moving average with parameter $N = 10$   

<table><tr><td>t</td><td>x(t)</td><td>N&#x27;</td><td>a&#x27;</td></tr><tr><td>11</td><td>10</td><td>1</td><td>10.00</td></tr><tr><td>2</td><td>12</td><td>2</td><td>11.00</td></tr><tr><td>3</td><td>6</td><td>3</td><td>9.33</td></tr><tr><td>4</td><td>9</td><td>4</td><td>9.25</td></tr><tr><td>5</td><td>4</td><td>5</td><td>8.20</td></tr><tr><td>6</td><td>10</td><td>6</td><td>8.50</td></tr><tr><td>7</td><td>6</td><td>7</td><td>8.14</td></tr><tr><td>8</td><td>7</td><td>8</td><td>8.00</td></tr><tr><td>9</td><td>9</td><td>9</td><td>8.11</td></tr><tr><td>10</td><td>8</td><td>10</td><td>8.10</td></tr><tr><td>11</td><td>13</td><td>10</td><td>8.40</td></tr><tr><td>12</td><td>11</td><td>10</td><td>8.30</td></tr></table>

![](images/2366c99ff01c42fe1c6c475b5746fccfa868f2f180228337153d49f8ce121197.jpg)  
Fig. 3.2 Twelve months of the moving average for Example 3.2 with parameter $N = 10$

The method is described using Example 3.2 at the point when $\mathrm{nmh} = 12$ and $N = 10$ . The most recent 10 demand entries are: $\mathbf{x}(3), \ldots, \mathbf{x}(12)$ , and the estimate of the level at that point is $\mathbf{a}^{\prime} = 8.3$ . The residual errors for the $N = 10$ demands are computed by $\mathbf{e}(t) = [\mathbf{x}(t) - \mathbf{a}^{\prime}]$ for $t = 3$ to 12. The sum of square of residual errors is denoted as $\mathrm{S(e)}$ and the estimate of the standard deviation, s, is obtained as follows:

$$
\mathrm {s} = \sqrt {S (e) / (N - 1)}
$$

In the example, $\mathrm{S(e) = 64.160b}$ , $N = 10$ and

$$
\begin{array}{l} s = \sqrt {6 4 . 1 6 0 / (1 0 - 1)} \\ = \sqrt {7 . 1 1 8} \\ = 2. 6 7 \\ \end{array}
$$

Table 3.3 Twelve months of raw and integer forecasts for Example 3.2 when $\mathrm{nmh} = 12$ and $N = 10$   

<table><tr><td>τ</td><td>f(τ)</td><td>x&#x27; (τ)</td></tr><tr><td>1</td><td>8.3</td><td>8</td></tr><tr><td>2</td><td>8.3</td><td>9</td></tr><tr><td>3</td><td>8.3</td><td>8</td></tr><tr><td>4</td><td>8.3</td><td>8</td></tr><tr><td>5</td><td>8.3</td><td>9</td></tr><tr><td>6</td><td>8.3</td><td>8</td></tr><tr><td>7</td><td>8.3</td><td>8</td></tr><tr><td>8</td><td>8.3</td><td>8</td></tr><tr><td>9</td><td>8.3</td><td>9</td></tr><tr><td>10</td><td>8.3</td><td>8</td></tr><tr><td>11</td><td>8.3</td><td>8</td></tr><tr><td>12</td><td>8.3</td><td>9</td></tr></table>

The coefficient of variation becomes,

$$
\operatorname {c o v} = \mathrm {s} / \mathrm {a} = 2. 6 7 / 8. 3 0 = 0. 3 2 2
$$

# 3.11 Horizontal Discount Forecasts

Discounting is used in forecasting when the forecaster wants to use a specified number of months history to generate the forecasts and also desires to apply higher weights to each more recent demand history in a relative manner. Two parameters are needed here: $\mathrm{N} =$ the number of months of history to use, and $\beta (0 < \beta < 1) =$ the discount weight. The demand history is, $\mathrm{x}(1),\dots,\mathrm{x}(\mathrm{N})$ . The discount parameter, $\beta$ , assigns the weight $\mathrm{w(t)} = \beta^{(\mathrm{N - t})}$ to each demand history month $\mathrm{t}$ . The estimate of the level, $\mathbf{a}$ , is computed as shown below:

$$
\mathsf {a} ^ {\prime} = \Sigma_ {t = 1} ^ {N} x (t) w (t) / \Sigma_ {t = 1} ^ {N} w (t)
$$

In this way, the estimate of the level is a discount weighted average with relatively more weight assigned to each more recent month by a factor of $\beta = 0.9$ .

Example 3.3 Suppose the forecaster wants to use the horizontal discount forecast model with $N = 12$ months of demand history and $\beta = 0.9$ as the discount parameter. Assume also the demand history is the same as listed in Example 3.1. Table 3.4 is a worksheet that lists the history months, $t$ , the demand history, $x(t)$ , the discount weights by month, $w(t)$ , and the product, $x(t)w(t)$ , for $t = 1$ to 12. At the bottom of the table are the sums,

$$
\sum_ {t = 1} ^ {1 2} w (t) = 7. 1 7 6
$$

$$
\Sigma_ {t = 1} ^ {1 2} x (t) w (t) = 6 4. 6 2 5
$$

Table 3.4 Worksheet for Example 3.3 with history months, t, history demands, x(t), discount weights, w(t), and product, x(t)w(t)   

<table><tr><td>t</td><td>x(t)</td><td>w(t)</td><td>x(t)w(t)</td></tr><tr><td>1</td><td>10</td><td>0.314</td><td>3.138</td></tr><tr><td>2</td><td>12</td><td>0.349</td><td>4.184</td></tr><tr><td>3</td><td>6</td><td>0.387</td><td>2.325</td></tr><tr><td>4</td><td>9</td><td>0.430</td><td>3.874</td></tr><tr><td>5</td><td>4</td><td>0.478</td><td>1.913</td></tr><tr><td>6</td><td>10</td><td>0.531</td><td>5.314</td></tr><tr><td>7</td><td>6</td><td>0.590</td><td>3.543</td></tr><tr><td>8</td><td>7</td><td>0.656</td><td>4.593</td></tr><tr><td>9</td><td>9</td><td>0.729</td><td>6.561</td></tr><tr><td>10</td><td>8</td><td>0.810</td><td>6.480</td></tr><tr><td>11</td><td>13</td><td>0.900</td><td>11.700</td></tr><tr><td>12</td><td>11</td><td>1.000</td><td>11.000</td></tr><tr><td>Sum</td><td></td><td>7.176</td><td>64.625</td></tr></table>

Using the above sums, the estimate of the level is obtained as follows:

$$
\begin{array}{l} a = \sum_ {t = 1} ^ {1 2} x (t) w (t) / \sum_ {t = 1} ^ {1 2} w (t) \\ = 6 4. 6 2 5 / 7. 1 7 6 \\ = 9. 0 0 6 \\ \end{array}
$$

and thereby, the raw forecast for the 12 future months becomes,

$$
f (\tau) = 9. 0 0 6 \quad \tau = 1 \text {t o} 1 2
$$

Figure 3.3 depicts the 12 months of demand history and the corresponding 12 months of forecasts. Note the forecasts are the raw forecasts. In this example, the integer forecasts are set to $\mathrm{x}^{\prime}(\tau) = 9$ for each of the future 12 months

# 3.12 Standard Deviation and Cov

The standard deviation of the forecast errors is estimated by using the weighted average of the residual errors from the past demand history. The method is described using the data of Example 3.3. The 12 demand entries are: $\mathrm{x}(1), \dots, \mathrm{x}(12)$ , and the estimate of the level is $\mathrm{a}^{\prime} = 9.006\mathrm{b}$ . The residual errors for the $N = 12$ demands are

![](images/eaafd3f022df78d0feb64ebf6423d5f7c516f08c71a8b30173e18773303dc2ab.jpg)  
Fig. 3.3 Twelve months of demand history and 12 months of forecasts for Example 3.3 using the horizontal discount forecast model

computed by $\mathrm{e(t) = [x(t) - a^{\prime}]}$ for $t = 1$ to 12. The discounted sum of square of residual errors is denoted as S(e) and is obtained as follows:

$$
\mathrm {S} (\mathrm {e}) = \sum_ {t = 1} ^ {1 2} \left[ w (t) e (t) ^ {2} \right]
$$

So now, the estimate of the standard deviation of the forecast errors is computed as below:

$$
s = \sqrt {S (e) / \Sigma_ {t = 1} ^ {1 2} w (t)}
$$

Table 3.5 is a worksheet to compute the discount estimate of the standard deviation of the forecast error. The table lists the following: history months, t, demand history, x(t), forecast a', residual error, e(t), the square of the residual error, the monthly discount weights, w(t), and the product, w(t)e(t) $^2$ . At the bottom of the table are the sums:

$$
\sum_ {t = 1} ^ {1 2} w (t) = 7. 1 7 6
$$

$$
\sum_ {t = 1} ^ {1 2} \left[ w (t) e (t) ^ {2} \right] = 4 6. 5 7 6
$$

Applying the discounted sums, the estimate of the standard deviation becomes,

$$
\begin{array}{l} s = \sqrt {4 6 . 5 7 6 / 7 . 1 7 6} \\ = \sqrt {6 . 4 9 1} \\ = 2. 5 5 \\ \end{array}
$$

Finally, the cov is,

$$
\operatorname {c o v} = \mathrm {s} / \mathrm {a} ^ {\prime} = 2. 5 5 / 9. 0 0 6 = 0. 2 8 3
$$

Table 3.5 Worksheet to compute the discount standard deviation of the forecast error, using history months, t, history demands, x(t), residual error, e(t), $\mathrm{e}{\left( \mathrm{t}\right) }^{2}$ ,the monthly discount weights, w(t), and product, w(t)e(t) ${}^{2}$   

<table><tr><td>t</td><td>x(t)</td><td>a^</td><td>e(t)</td><td>e(t)^2</td><td>w(t)</td><td>w(t)e(t)^2</td></tr><tr><td>1</td><td>10</td><td>9.006</td><td>0.993</td><td>0.988</td><td>0.314</td><td>0.310</td></tr><tr><td>2</td><td>12</td><td>9.006</td><td>2.993</td><td>8.963</td><td>0.349</td><td>3.125</td></tr><tr><td>3</td><td>6</td><td>9.006</td><td>-3.006</td><td>9.037</td><td>0.387</td><td>3.501</td></tr><tr><td>4</td><td>9</td><td>9.006</td><td>-0.006</td><td>0.000</td><td>0.430</td><td>0.000</td></tr><tr><td>5</td><td>4</td><td>9.006</td><td>-5.006</td><td>25.061</td><td>0.478</td><td>11.987</td></tr><tr><td>6</td><td>10</td><td>9.006</td><td>0.993</td><td>0.988</td><td>0.531</td><td>0.525</td></tr><tr><td>7</td><td>6</td><td>9.006</td><td>-3.006</td><td>9.037</td><td>0.590</td><td>5.336</td></tr><tr><td>8</td><td>7</td><td>9.006</td><td>-2.006</td><td>4.024</td><td>0.656</td><td>2.640</td></tr><tr><td>9</td><td>9</td><td>9.006</td><td>-0.006</td><td>0.000</td><td>0.729</td><td>0.000</td></tr><tr><td>10</td><td>8</td><td>9.006</td><td>-1.006</td><td>1.012</td><td>0.810</td><td>0.820</td></tr><tr><td>11</td><td>13</td><td>9.006</td><td>3.993</td><td>15.951</td><td>0.900</td><td>14.356</td></tr><tr><td>12</td><td>11</td><td>9.006</td><td>1.993</td><td>3.976</td><td>1.000</td><td>3.976</td></tr><tr><td>Sum</td><td></td><td></td><td></td><td></td><td>7.176</td><td>46.576</td></tr></table>

# 3.13 Horizontal Smoothing Forecasts

The horizontal (exponentially) smoothing forecast model is used when the forecaster wants to revise the forecast each month with the most current demand entry, and also chooses to give higher weights to each more recent demand history in a relative manner. This method is often referred as exponential smoothing. One parameters is needed here, denoted as $\alpha$ ( $0 < \alpha < 1$ ) where typically, $\alpha = 0.10$ .

To apply the model for a part at the current time, $t$ , the data file houses the prior estimate of the level, $a^{\prime}(t - 1)$ , and retains the smooth parameter, $\alpha$ . Also, this is when the new demand entry becomes available, $x(t)$ . The two values, $a^{\prime}(t - 1)$ and $x(t)$ are now smoothed in the following way:

$$
\mathrm {a} ^ {\prime} (\mathrm {t}) = \alpha \mathrm {x} (\mathrm {t}) + (1 - \alpha) \mathrm {a} ^ {\prime} (\mathrm {t} - 1)
$$

The level becomes the estimate of the average value as of the most current month, $t$ , and thereby the forecast for future month, $\tau$ , becomes,

$$
f (\tau) = a ^ {\prime} (t) \quad \tau = 1, 2, \dots ..
$$

A difficulty occurs at the outset when no history demands are available to use in smoothing. Further, in the early months, the forecaster may also wish to give higher weights to the demands. A way to overcome is the following. The forecaster specifies a parameter value to use, $\alpha$ , and for the early history months, the parameter is set as:

$$
\alpha (t) = \max (\alpha , 1 / t)
$$

# 3.14 Standard Deviation

So now, the smoothed estimate of the level at month $t$ is as follows:

$$
\mathrm {a} ^ {\prime} (t) = \alpha (t) x (t) + [ 1 - \alpha (t) ] a ^ {\prime} (t - 1)
$$

# 3.14 Standard Deviation

The estimate of the standard deviation of the forecast error is also revised each month in the following way:

Let $\mathrm{v(t)}$ represent the estimate of the variance of the forecast error at time $t$ . The data file on the part will save, a'(t-1), the estimate of the level, and $\mathrm{v(t - 1)}$ , the variance from the prior month (t-1). The forecast error at month $t$ is now measured by

$$
e (t) = x (t) - a ^ {\prime} (t - 1)
$$

whereby, the revised variance becomes,

$$
\mathrm {v} (t) = \alpha (t) \mathrm {e} (t) ^ {2} + [ 1 - \alpha (t) ] \mathrm {v} (t - 1)
$$

So now, the estimate of the standard deviation of the forecast error at month $t$ is:

$$
s (t) = \sqrt {v (t)}
$$

Finally, the associated cov becomes,

$$
\operatorname {c o v} (t) = s (t) / a ^ {\prime} (t)
$$

Example 3.4 Consider an inventory system where the forecasts are generated using the horizontal smoothing model with the smoothing parameter set at $\alpha = 0.10$ . Assume at the first month of history, $t = 1$ , the demand entry is $x(1) = 22$ . Suppose also the forecaster uses the method described above to determine the smooth parameter for the early months. Hence,

$$
\alpha (t) = \max  (0. 1 0, 1 / t) \quad t = 1, 2, \dots
$$

In the example, $\alpha(1) = 1.00$ , and the estimate of the level is

$$
\mathrm {a} ^ {\prime} (1) = 1. 0 0 \times 2 2 + (1 - 1) \times 0 = 2 2
$$

Continuing at $t = 1$ , the forecasts for future month $\tau$ are,

$$
f (\tau) = 2 2 \quad \tau = 1, 2, \dots
$$

Note the prior estimate of the level is $a^{\prime}(0) = 0$ . Continuing are the computations (at $t = 1$ ) for the forecast error, variance, standard deviation and the coefficient of variation.

$$
\mathrm {e} (1) = [ 2 2 - 0 ] = 2 2
$$

$$
\mathrm {v} (1) = 1. 0 0 \times 2 2 ^ {2} + (1 - 1) \times 0 = 4 8 4
$$

$$
\mathrm {s} (1) = \sqrt {4 8 2} = 2 2
$$

and $\operatorname{cov}(1) = 22 / 22 = 1.00$ .

At $t = 2$ , assume the demand is $x(2) = 43$ . The corresponding computations are:

$$
\alpha (2) = 1 / 2 = 0. 5 0
$$

$$
\mathrm {a} ^ {\prime} (2) = 0. 5 0 \times 4 3 + (1 - 0. 5) \times 2 2 = 3 2. 5
$$

$$
\mathrm {e} (2) = 4 3 - 2 2 = 2 1
$$

$$
\mathrm {v} (2) = 0. 5 0 \times 2 1 ^ {2} + (1 - 0. 5 0) \times 4 8 4 = 4 6 2. 5
$$

$$
\mathrm {s} (2) = \sqrt {4 6 2 . 5} = 2 1. 5
$$

and $\operatorname{cov}(2) = 21.5 / 32.5 = 0.662$

Table 3.6 shows how the calculations would take place for the first 24 months of demands. The table lists the month, smooth parameter, demand, level, variance, standard deviation and the coefficient of variation for each month t. Since the specified smooth parameter is $\alpha = 0.10$ , the smooth parameters are higher than 0.10 for the first 9 months. Thereafter, the desired smooth parameter (0.10) is used.

Note how the cov starts out as $\operatorname{cov}(1) = 1.00$ , and gradually decreases as the number of months of history increases. Near month $t = 22$ , the cov settles in at about 0.30.

# 3.15 2-Stage Forecasts

In many inventory systems, the data saved for each part is the number of lines, $n(t)$ , and the demands, $x(t)$ , for each history month $t$ . When each customer order comes into the order entry system, the order contains a finite number of lines, where each line is for an individual part. The line further states how many pieces, $d$ , is needed for the part. So when a month has $n(t)$ lines on a part, and the demand is $x(t)$ for

Table 3.6 Horizontal smoothing forecasts for history months $t = 1$ to 24, with smooth parameter, $\alpha \left( \mathrm{t}\right)$ ,demand,x(t),level,a'(t),variance of forecast error,v(t),standard deviation of forecast error, s(t), and coefficient of variation, cov(t)   

<table><tr><td>t</td><td>α(t)</td><td>x(t)</td><td>a&#x27;(t)</td><td>v(t)</td><td>s(t)</td><td>cov(t)</td></tr><tr><td>1</td><td>1.000</td><td>22</td><td>22.00</td><td>484.0</td><td>22.0</td><td>1.000</td></tr><tr><td>2</td><td>0.500</td><td>43</td><td>32.50</td><td>462.5</td><td>21.5</td><td>0.662</td></tr><tr><td>3</td><td>0.333</td><td>42</td><td>35.67</td><td>338.4</td><td>18.4</td><td>0.516</td></tr><tr><td>4</td><td>0.250</td><td>14</td><td>30.25</td><td>371.2</td><td>19.3</td><td>0.637</td></tr><tr><td>5</td><td>0.200</td><td>56</td><td>35.40</td><td>429.6</td><td>20.7</td><td>0.585</td></tr><tr><td>6</td><td>0.167</td><td>46</td><td>37.17</td><td>376.7</td><td>19.4</td><td>0.522</td></tr><tr><td>7</td><td>0.143</td><td>67</td><td>41.43</td><td>450.0</td><td>21.2</td><td>0.512</td></tr><tr><td>8</td><td>0.125</td><td>58</td><td>43.50</td><td>428.1</td><td>20.7</td><td>0.476</td></tr><tr><td>9</td><td>0.111</td><td>41</td><td>43.22</td><td>381.2</td><td>19.5</td><td>0.452</td></tr><tr><td>10</td><td>0.100</td><td>41</td><td>43.00</td><td>343.6</td><td>18.5</td><td>0.431</td></tr><tr><td>11</td><td>0.100</td><td>44</td><td>43.10</td><td>309.3</td><td>17.6</td><td>0.408</td></tr><tr><td>12</td><td>0.100</td><td>53</td><td>44.09</td><td>288.2</td><td>17.0</td><td>0.385</td></tr><tr><td>13</td><td>0.100</td><td>30</td><td>42.68</td><td>279.2</td><td>16.7</td><td>0.392</td></tr><tr><td>14</td><td>0.100</td><td>56</td><td>44.01</td><td>269.1</td><td>16.4</td><td>0.373</td></tr><tr><td>15</td><td>0.100</td><td>50</td><td>44.61</td><td>245.7</td><td>15.7</td><td>0.351</td></tr><tr><td>16</td><td>0.100</td><td>78</td><td>47.95</td><td>332.6</td><td>18.2</td><td>0.380</td></tr><tr><td>17</td><td>0.100</td><td>29</td><td>46.06</td><td>335.3</td><td>18.3</td><td>0.398</td></tr><tr><td>18</td><td>0.100</td><td>55</td><td>46.95</td><td>309.8</td><td>17.6</td><td>0.375</td></tr><tr><td>19</td><td>0.100</td><td>52</td><td>47.45</td><td>281.3</td><td>16.8</td><td>0.353</td></tr><tr><td>20</td><td>0.100</td><td>47</td><td>47.41</td><td>253.2</td><td>15.9</td><td>0.336</td></tr><tr><td>21</td><td>0.100</td><td>62</td><td>48.87</td><td>249.2</td><td>15.8</td><td>0.323</td></tr><tr><td>22</td><td>0.100</td><td>50</td><td>48.98</td><td>224.4</td><td>15.0</td><td>0.306</td></tr><tr><td>23</td><td>0.100</td><td>53</td><td>49.38</td><td>203.6</td><td>14.3</td><td>0.289</td></tr><tr><td>24</td><td>0.100</td><td>38</td><td>48.25</td><td>196.2</td><td>14.0</td><td>0.290</td></tr></table>

the month, $\mathrm{x(t) = d_{(1,t)} + \ldots + d_{(n(t),t)}}$ , where $\mathrm{d}_{(\mathrm{i},\mathrm{t})}$ is the number of pieces for line i of month t. In most systems, the database will save the entries, $\mathrm{n(t)}$ and $\mathrm{x(t)}$ , but not the individual line quantities, $\mathrm{d}_{(\mathrm{i},\mathrm{t})}$ .

# 3.16 Raw Lines to Integer Forecasts

When N months of data are saved, the following computations are as below:

$$
\bar {n} = \sum_ {t = 1} ^ {N} n (t) / N = \text {a v e r a g e l i n e s p e r m o n t h}
$$

$$
\mathrm {x} (t) = \sum_ {i = 1} ^ {n (t)} d _ {(i, t)} = \text {d e m a n d s i n m o n t h}
$$

Table 3.7 Example 3.5 data of lines per month, n(t), and demands per month, x(t)   

<table><tr><td>t</td><td>n(t)</td><td>x(t)</td></tr><tr><td>1</td><td>1</td><td>3</td></tr><tr><td>2</td><td>0</td><td>0</td></tr><tr><td>3</td><td>2</td><td>5</td></tr><tr><td>4</td><td>1</td><td>2</td></tr><tr><td>5</td><td>0</td><td>0</td></tr><tr><td>6</td><td>3</td><td>4</td></tr><tr><td>7</td><td>2</td><td>3</td></tr><tr><td>8</td><td>1</td><td>4</td></tr><tr><td>9</td><td>0</td><td>0</td></tr><tr><td>10</td><td>0</td><td>0</td></tr><tr><td>11</td><td>1</td><td>3</td></tr><tr><td>12</td><td>2</td><td>4</td></tr><tr><td>Sum</td><td>13</td><td>28</td></tr></table>

$$
\bar {d} = \sum_ {t = 1} ^ {N} x (t) / \sum_ {t = 1} ^ {N} n (t) = \text {a v e r a g e p i c e s} \bar {\mathrm {p}} \text {e r l i n e}
$$

$$
\begin{array}{l} \overline {{x}} = \overline {{n}} \overline {{d}} \\ = \sum_ {t = 1} ^ {N} x (t) / N \\ = \text {a v e r a g e} \\ \end{array}
$$

The estimate of the level per month is:

$$
\mathrm {a} ^ {\prime} = \bar {x}
$$

and thereby, the raw forecast on the demand per month becomes:

$$
f (t) = a ^ {\prime} \quad t = 1, 2, \ldots
$$

Note, the forecasts are based on raw forecast of the lines per month and also on the average pieces per line.

Example 3.5 Suppose a part where the demand history is as listed in Table 3.7. For each of the 12 months of history, the lines, $n(t)$ , and the demands, $x(t)$ , are saved. The sums for the two variables are at the bottom of the table where $\sum n(t) = 13$ and $Sx(t) = 28$ . Hence, the average lines per month becomes,

$$
\bar {n} = 1 3 / 1 2 = 1. 0 8 3
$$

Table 3.8 Raw, $\mathrm{f}\left( \tau \right)$ ,and integer, ${\mathrm{x}}^{\prime }\left( \tau \right)$ ,forecasts for 6 future months, $\tau$ ,in Example 3.5   

<table><tr><td>τ</td><td>f(τ)</td><td>x&#x27;(τ)</td></tr><tr><td>1</td><td>2.33</td><td>2</td></tr><tr><td>2</td><td>2.33</td><td>3</td></tr><tr><td>3</td><td>2.33</td><td>2</td></tr><tr><td>4</td><td>2.33</td><td>2</td></tr><tr><td>5</td><td>2.33</td><td>3</td></tr><tr><td>6</td><td>2.33</td><td>2</td></tr></table>

Table 3.9 Lines, n(t), and demands, x(t), per month for the part in Example 3.6   

<table><tr><td>t</td><td>n(t)</td><td>x(t)</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>2</td><td>0</td><td>0</td></tr><tr><td>3</td><td>0</td><td>0</td></tr><tr><td>4</td><td>1</td><td>50</td></tr><tr><td>5</td><td>0</td><td>0</td></tr><tr><td>6</td><td>0</td><td>0</td></tr><tr><td>7</td><td>0</td><td>0</td></tr><tr><td>8</td><td>0</td><td>0</td></tr><tr><td>9</td><td>0</td><td>0</td></tr><tr><td>10</td><td>1</td><td>30</td></tr><tr><td>11</td><td>0</td><td>0</td></tr><tr><td>12</td><td>0</td><td>0</td></tr><tr><td>Sum</td><td>2</td><td>80</td></tr></table>

Also, the average pieces per line is

$$
\bar {d} = 2 8 / 1 3 = 2. 1 5
$$

The estimate of the level is obtained from

$$
\mathrm {a} = \sum \mathrm {x (t) / N} = 2 8 / 1 2 = 2. 3 3
$$

or from

$$
\mathrm {a} = \bar {n} \bar {d} = 1. 0 8 3 \times 2. 1 5 = 2. 3 3
$$

Table 3.8 lists the forecasts for the first 6 future months. Note, the raw forecasts are $f(\tau) = 2.33$ , and the corresponding integer forecasts, $x^{\prime}(\tau)$ , become (2, 3, 2, 2, 3, 2).

Example 3.6 Consider another part where the lines and demands are saved in the data file, and these are listed in Table 3.9. This part has low demands where over the past 12 months, only two lines came in, one for 50 pieces and another for 30 pieces.

Table 3.10 Raw forecasts, $\mathrm{f}\left( \tau \right)$ ,and integer forecasts, ${\mathrm{x}}^{\prime }\left( \tau \right)$ ,for the part in Example 3.6   

<table><tr><td>t</td><td>f(τ)</td><td>x^*(τ)</td></tr><tr><td>1</td><td>6.67</td><td>7</td></tr><tr><td>2</td><td>6.67</td><td>7</td></tr><tr><td>3</td><td>6.67</td><td>6</td></tr><tr><td>4</td><td>6.67</td><td>7</td></tr><tr><td>5</td><td>6.67</td><td>7</td></tr><tr><td>6</td><td>6.67</td><td>6</td></tr><tr><td>7</td><td>6.67</td><td>7</td></tr><tr><td>8</td><td>6.67</td><td>7</td></tr><tr><td>9</td><td>6.67</td><td>6</td></tr><tr><td>10</td><td>6.67</td><td>7</td></tr><tr><td>11</td><td>6.67</td><td>7</td></tr><tr><td>12</td><td>6.67</td><td>6</td></tr></table>

In this situation, the following averages are computed:

$$
\bar {n} = 2 / 1 2 = 0. 1 6 7 = \text {a v e r a g e l i n e s p e r m o n t h}
$$

$$
\bar {d} = 8 0 / 2 = 4 0 = \text {a v e r a g e p i c e s p e r l i n e}
$$

The estimate of the level is $\dot{a} = \overline{d} \times \overline{n} = 40 \times 0.167 = 6.67$ . Table 3.10 lists the raw and integer forecasts of this part for the future 12 months. Note, in this low line item, the forecasts don't look much like the history months.

# 3.17 Integer Lines to Integer Forecasts

Another way to generate the forecasts so they more closely resemble the flow of demands is shown in Table 3.11. In this situation, the raw and integer lines are forecast for each of the 12 future months. The raw lines are $\overline{n} = 0.17$ per month. The integer lines, n(t), are zero's and one's, where months 3 and 10 have an integer forecast of one. The demands for these months become:

$$
\mathrm {x} ^ {\prime} (t) = \mathrm {n} ^ {\prime} (t) \bar {d}
$$

When $\mathrm{n}^{\prime}(\mathrm{t}) = 1$ , the forecast is 40, and when $\mathrm{n}^{\prime}(\mathrm{t}) = 0$ , the forecast is zero.

Table 3.11 Raw lines, $\overline{n}$ integer lines, $\mathfrak{n}^{\prime}(\tau)$ , and integer forecast of demands, $\mathrm{x}^{\prime}(\tau)$ for future months $\tau$   

<table><tr><td>τ</td><td>\(\overline{n}\)</td><td>n^{\(^\prime\)}(τ)</td><td>x^{\(^\prime\)}(τ)</td></tr><tr><td>1</td><td>0.17</td><td>0</td><td>0</td></tr><tr><td>2</td><td>0.17</td><td>0</td><td>0</td></tr><tr><td>3</td><td>0.17</td><td>1</td><td>40</td></tr><tr><td>4</td><td>0.17</td><td>0</td><td>0</td></tr><tr><td>5</td><td>0.17</td><td>0</td><td>0</td></tr><tr><td>6</td><td>0.17</td><td>0</td><td>0</td></tr><tr><td>7</td><td>0.17</td><td>0</td><td>0</td></tr><tr><td>8</td><td>0.17</td><td>0</td><td>0</td></tr><tr><td>9</td><td>0.17</td><td>0</td><td>0</td></tr><tr><td>10</td><td>0.17</td><td>1</td><td>40</td></tr><tr><td>11</td><td>0.17</td><td>0</td><td>0</td></tr><tr><td>12</td><td>0.17</td><td>0</td><td>0</td></tr></table>

# Summary

Five horizontal forecast models are described. The horizontal forecast model is based on the N most prior monthly demands where each demand entry is assigned the same weight in generating the forecasts. The horizontal moving average forecast model uses a parameter N that specifies the number of most recent monthly demands to use in generating the forecasts. The method gives equal weight to each of the demands. A special adjustment is made for new parts when the number of history months is less than the parameter of N. The horizontal discounting forecast model is based on two parameters, N, the number of months of history to use, and $\beta$ , the discount rate that assigns more weight to each more recent demand. The horizontal smoothing forecast model also gives more weight to the more recent demand entries. The model adjusts the prior forecast with the most current demand entry. The horizontal 2-stage forecast model generates a forecast for the number of lines by future months and then applies the average pieces-per-line to obtain the forecast of demands for each of the future months. This method may be useful when the history demands are of the lumpy type. For each of the forecast models, the methods generate raw forecasts that are in fractional form. A cumulative round algorithm converts the raw forecasts to integer forecasts. The standard deviation of the 1-month forecast error is also computed for the models. This is a measure on the accuracy of the forecasts and is needed in subsequent computations concerning the inventory replenishments in the stocking location. A relative way to measure the forecast error is by the coefficient of variation, denoted as cov.

# Chapter 4 Trend Forecasts

# 4.1 Introduction

Some of the items stocked in the inventory have demand patterns where the month-to-month level is gradually increasing (or decreasing) in a steady way, and thereby, a trend forecast model is called. The model has two coefficients, $a$ and $b$ , where $a$ is the intercept and $b$ is the slope. Three such models are described here: trend regression forecasts, trend discount forecasts and trend smoothing forecasts. The trend regression forecast model generates a straight line fit through the most recent N history demands giving equal weight to each history demand. The trend discount forecast model also uses the N most recent history demands, but gives relatively less weight to each older demand. This model is based on a discount parameter, $\beta$ , that specifies how to apportion the weight to each older demand entry. The trend smoothing forecast model revises the forecast coefficients as each new demand entry becomes available. The model has two parameters, $\alpha$ and $\beta$ , that are used to revise the trend coefficients, $(a, b)$ , at each month. All three of the forecast models generate forecasts that are in fractional numbers and are here called raw forecasts. The forecasts are converted to integers using the cumulative rounding algorithm described in Chap. 2. For latter use, in inventory control, the standard deviation of each of the forecast models is also generated each month. For comparative sake, the coefficient of variation, cov, is also generated each month. Three dampening forecast models are described, to avoid situations when the forecasts are quickly declining to zero and below.

# 4.2 Trend Regression Forecast

The trend regression model generates a straight line fit through the past demands to project as forecasts for the future months. The model requires one parameter, $\mathrm{N}$ , that specifies the number of most recent past monthly demands to use in generating the forecasts. The history demands are labeled as, $\mathrm{x(t)}$ for $t = 1$ to $\mathrm{N}$ , and $\mathrm{N}$ is the most

current history month, whereby $t = 1$ is the oldest month. The forecast model has two coefficients, (a, b), where a is the intercept at $t = 0$ , and b is the slope. The fit of the demands over the N history months is denoted as $f(t)$ where,

$$
f (t) = a + b t \quad t = 1 \text {t o N}
$$

The regression model is based on finding the estimates of the coefficients that minimize the sum of squares of residual errors, $\mathrm{e(t)}$ , over the history months. The residual error for history month $t$ is the following:

$$
\mathrm {e} (\mathrm {t}) = \left[ \mathrm {x} (\mathrm {t}) - \mathrm {f} (\mathrm {t}) \right]
$$

The sum of square of the residual errors is denoted as $S(e)$ where,

$$
\mathrm {S} (\mathrm {e}) = \sum_ {t = 1} ^ {N} e (t) ^ {2}
$$

A bit of calculus is used to determine how to find the fit that yields the least sum of squares of the residual errors. The minimum of S(e) requires finding the coefficients (a, b) that satisfy the following two equations:

$$
\begin{array}{l} \Sigma \mathrm {x} = \mathrm {a N} + \mathrm {b} \Sigma \mathrm {t} \\ \Sigma \mathrm {x t} = \mathrm {a} \Sigma \mathrm {t} + \mathrm {b} \Sigma \mathrm {t} ^ {2} \\ \end{array}
$$

where the sums are for $t = 1$ to $N$ . Also, for notational ease, $\Sigma t = \sum_{t=1}^{N} t$ , $\Sigma t^2 = \sum_{t=1}^{N} t^2$ , $\Sigma x = \sum_{t=1}^{N} x(t)$ and $\Sigma xt = \sum_{t=1}^{N} x(t)t$

Solving for the coefficients, yields,

$$
\begin{array}{l} \mathrm {b} = \left[ \Sigma \mathrm {x} \Sigma \mathrm {t} - \mathrm {N} \Sigma \mathrm {x t} \right] / \left[ \left(\Sigma \mathrm {t}\right) ^ {2} - \mathrm {N} \Sigma \mathrm {t} ^ {2} \right] \\ \mathrm {a} = \left[ \Sigma \mathrm {x} - \mathrm {b} \Sigma \mathrm {t} \right] / \mathrm {N} \\ \end{array}
$$

Recall, a is the intercept at $t = 0$ . In forecasting, the level is commonly used in its place and represents the average of the demands at $t = N$ , the most current month. This also is the level at $\tau = 0$ , where $\tau$ identifies the future months. For this purpose, the intercept, a, is converted to the level, a', as follows:

$$
\mathrm {a} ^ {\prime} = \mathrm {a} + \mathrm {N b}
$$

The forecast for future month $\tau$ becomes,

$$
f (\tau) = a ^ {\prime} + b \tau \quad \tau = 1, 2, \dots
$$

Table 4.1 Demand history months, t, and history demands, $\mathrm{x}\left( \mathrm{t}\right)$ ,for Example 4.1   

<table><tr><td>t</td><td>x(t)</td></tr><tr><td>1</td><td>17</td></tr><tr><td>2</td><td>18</td></tr><tr><td>3</td><td>10</td></tr><tr><td>4</td><td>25</td></tr><tr><td>5</td><td>18</td></tr><tr><td>6</td><td>25</td></tr><tr><td>7</td><td>23</td></tr><tr><td>8</td><td>20</td></tr><tr><td>9</td><td>17</td></tr><tr><td>10</td><td>23</td></tr><tr><td>11</td><td>23</td></tr><tr><td>12</td><td>18</td></tr></table>

Example 4.1 Suppose a system where the trend regression forecast model is to be used on a part with $N = 12$ history months of demands, and the history demands are those listed in Table 4.1 as $\mathbf{x}(t)$ .

Raw Forecasts To apply the model, the following computations and summations are carried out, and are listed below where the summations range from $t = 1$ to 12.

$$
\mathrm {N} = 1 2
$$

$$
\Sigma \mathrm {x} = 2 3 7
$$

$$
\Sigma \mathrm {x t} = 1 5 9 6
$$

$$
\Sigma \mathrm {t} = 7 8
$$

$$
\boldsymbol {\Sigma} \mathbf {t} ^ {2} = 6 5 0
$$

Solving for the coefficients (b, a) yields:

$$
b = 0. 3 8 8 \quad = s l o p e
$$

$$
a = 1 7. 2 2 7 \quad = i n t e r c e p t a t t = 0
$$

The level becomes,

$$
a ^ {\prime} = a + 1 2 b = 2 1. 8 8 5 \quad = \text {l e v e l} \quad \tau = 0 \quad (t = 1 2)
$$

So now, the forecasts for each of the future 12 months are generated using:

$$
f (\tau) = 2 1. 8 8 5 + 0. 3 8 8 \tau \quad \tau = 1 \text {t o} 1 2
$$

Integer Forecasts Since the forecasts are in fractional form, the forecasts are raw forecasts. The corresponding integer forecasts, $\mathrm{x}^{\prime}(\tau)$ , are also generated in the same

Table 4.2 Future months, $\tau$ with raw forecasts, $f(\tau)$ and integer forecasts, $\mathrm{x}^{\prime}(\tau)$   

<table><tr><td>τ</td><td>f(τ)</td><td>x&#x27; (τ)</td></tr><tr><td>1</td><td>22.27</td><td>22</td></tr><tr><td>2</td><td>22.66</td><td>23</td></tr><tr><td>3</td><td>23.04</td><td>23</td></tr><tr><td>4</td><td>23.43</td><td>23</td></tr><tr><td>5</td><td>23.82</td><td>24</td></tr><tr><td>6</td><td>24.21</td><td>24</td></tr><tr><td>7</td><td>24.60</td><td>25</td></tr><tr><td>8</td><td>24.98</td><td>25</td></tr><tr><td>9</td><td>25.37</td><td>25</td></tr><tr><td>10</td><td>25.76</td><td>26</td></tr><tr><td>11</td><td>26.15</td><td>26</td></tr><tr><td>12</td><td>26.54</td><td>27</td></tr></table>

way as given in Chap. 2. Table 4.2 lists the raw and integer forecasts for the future 12 months. Figure 4.1 depicts the flow to the 12 months of history demands and the 12 months of integer forecasts.

Standard Deviation Table 4.3 is a worksheet to begin the calculations of estimating the standard deviation of the forecast errors. The table lists the 12 history months with the associated demand history. and the corresponding fit values, $\mathrm{f(t)}$ . Next is a list of the residual errors, $\mathrm{e(t) = [x(t) - f(t)]}$ , and then the square of $\mathrm{e(t)}$ . The sum of the square of the residual errors is in the base of the table, and is denoted as $S(\mathrm{e})$ .

The estimate of the standard deviation, $s$ , is as follows:

$$
\mathrm {s} = \sqrt {S (e) / (N - 2)}
$$

In the example,

$$
s = \sqrt {1 8 4 . 7 1 / (1 2 - 2)} = 4. 3 0
$$

![](images/fe14fcb39dae69a82796c7c19b84b0e653398ce5f4165b8484ba0f134a2be8e9.jpg)  
Fig. 4.1. Plot of 12 month history of demands and 12 future integer forecasts of Example 4.1

Table 4.3 Worksheet listing the history months, t, demand history, x(t), fit, f(t), residual errors, e(t), and square of residual errors, $\mathrm{e}{\left( \mathrm{t}\right) }^{2}$   

<table><tr><td>t</td><td>x(t)</td><td>f(t)</td><td>e(t)</td><td>e(t)2</td></tr><tr><td>1</td><td>17</td><td>17.61</td><td>-0.62</td><td>0.38</td></tr><tr><td>2</td><td>18</td><td>18.00</td><td>0.00</td><td>0.00</td></tr><tr><td>3</td><td>10</td><td>18.39</td><td>-8.39</td><td>70.42</td></tr><tr><td>4</td><td>25</td><td>18.77</td><td>6.22</td><td>38.69</td></tr><tr><td>5</td><td>18</td><td>19.16</td><td>-1.17</td><td>1.36</td></tr><tr><td>6</td><td>25</td><td>19.55</td><td>5.44</td><td>29.64</td></tr><tr><td>7</td><td>23</td><td>19.94</td><td>3.06</td><td>9.34</td></tr><tr><td>8</td><td>20</td><td>20.33</td><td>-0.33</td><td>0.11</td></tr><tr><td>9</td><td>17</td><td>20.72</td><td>-3.72</td><td>13.84</td></tr><tr><td>10</td><td>23</td><td>21.10</td><td>1.89</td><td>3.58</td></tr><tr><td>11</td><td>23</td><td>21.49</td><td>1.50</td><td>2.26</td></tr><tr><td>12</td><td>18</td><td>21.88</td><td>-3.88</td><td>15.09</td></tr><tr><td>Sum</td><td></td><td></td><td></td><td>184.71</td></tr></table>

Coefficient of Variation The coefficient of variation is measured using the level, a', as the base. This is,

$$
\operatorname {c o v} = \mathrm {s} / \mathrm {a} ^ {\prime} = 4. 3 0 / 2 1. 8 8 5 = 0. 1 9 6
$$

# 4.3 Trend Discount Forecasts

The trend discount forecast model is the same as the trend regression forecast model except this model generates linear forecasts that give relatively more weight to each more recent history demand. The model requires two parameters, $\mathrm{N}$ and $\beta$ . $\mathrm{N}$ states the number of history demands to use in generating the forecasts, and $\beta$ is the discount parameter that specifies how much less weight to give to each older history demand. The history demands are labeled as, $\mathbf{x}(t)$ for $t = 1$ to $\mathrm{N}$ . The forecast model has two coefficients, (a, b), where a is the intercept at $t = 0$ , and b is the slope. The fit of the demands over the $\mathrm{N}$ history months is denoted as $f(t)$ where,

$$
f (t) = a + b t \quad t = 1 \text {t o} N
$$

The regression model is based on finding the estimates of the coefficients that minimize the weighted sum of squares of residual errors, $e(t)$ , over the history months. The residual error for history month $t$ is the following:

$$
e (t) = [ x (t) - f (t) ]
$$

The discount parameter, $\beta$ , falls in the interval $(0 < \beta < 1)$ The demand history is, $\mathbf{x}(1),\ldots ,\mathbf{x}(\mathbf{N})$ . The discount parameter, $\beta$ assigns the weight $\mathrm{w(t)} = \beta^{(\mathrm{N - t})}$ to each history month t. In this way, the estimate of the forecast coefficients, (a, b), are obtained where a higher weight is assigned to each more recent month by a factor of $\beta$ A common value of the discount parameter used for the trend forecast model is $\beta = 0.95$

The weighted sum of square of the residual errors is denoted as S(e) and is computed by,

$$
\mathrm {S} (\mathrm {e}) = \sum_ {t = 1} ^ {N} w (t) e (t) ^ {2}
$$

A bit of calculus is used to determine how to find the fit that yields the least sum of squares of the weighted residual errors. The minimum of S(e) requires finding the coefficients (a, b) that satisfy the following two equations:

$$
\begin{array}{l} \sum \mathrm {x w} = a \sum \mathrm {w} + b \sum \mathrm {t w} \\ \sum \mathrm {x t w} = a \sum \mathrm {t w} + b \sum \mathrm {t} ^ {2} \mathrm {w} \\ \end{array}
$$

where the sums are for $t = 1$ to $N$ . Also, for notational ease, $\sum w = \sum_{t=1}^{N} w(t)$ , $\sum tw = \sum_{t=1}^{N} tw(t)$ , $\sum t^2w = \sum_{t=1}^{N} t^2w(t)$ , $\sum xw = \sum_{t=1}^{N} x(t)w(t)$ and $\sum xtw = \sum_{t=1}^{N} x(t)tw(t)$ .

Solving for the coefficients, yields,

$$
\begin{array}{l} b = \left[ \sum x w \sum t w - \sum w \sum x t w \right] / \left[ \left(\sum t w\right) ^ {2} - \sum w \sum t ^ {2} w \right] \\ a = \left[ \sum x w - b \sum t w \right] / \sum w \\ \end{array}
$$

As before, $a$ is the intercept at $t = 0$ . In the notation here, the level represents the average value of the demands for the most current month, $t = N$ . This also is the level at $\tau = 0$ , where $\tau$ represents the future months. Hence, the intercept, $a$ , is converted to the level, $a'$ , as follows:

$$
a ^ {\prime} = a + N b
$$

So now, the forecast for future month $\tau$ becomes,

$$
f (\tau) = a ^ {\prime} + b \tau \quad \tau = 1, 2, \dots
$$

Example 4.2 Suppose the forecaster now wants to apply the trend discount regression forecast model to the data of Example 4.1. The parameters are: $N = 12$ for the number of history demand months, and $\beta = 0.95$ for the discount weights. Table 4.4 is a list of the 12 months of demand history and the corresponding monthly discount weights. Note at $t = 12$ , $w(12) = 0.95^{(12 - 12)} = 1.000$ ; at $t = 11$ , $w(11) = 0.95^{(12 - 11)} = 0.95$ , and so forth.

Table 4.4 Demand history months, t, demands, x(t), and discount weights, w(t), for Example 4.2   

<table><tr><td>t</td><td>x(t)</td><td>w(t)</td></tr><tr><td>1</td><td>17</td><td>0.568</td></tr><tr><td>2</td><td>18</td><td>0.598</td></tr><tr><td>3</td><td>10</td><td>0.630</td></tr><tr><td>4</td><td>25</td><td>0.663</td></tr><tr><td>5</td><td>18</td><td>0.698</td></tr><tr><td>6</td><td>25</td><td>0.735</td></tr><tr><td>7</td><td>23</td><td>0.773</td></tr><tr><td>8</td><td>20</td><td>0.814</td></tr><tr><td>9</td><td>17</td><td>0.857</td></tr><tr><td>10</td><td>23</td><td>0.902</td></tr><tr><td>11</td><td>23</td><td>0.950</td></tr><tr><td>12</td><td>18</td><td>1.000</td></tr></table>

To apply the model, the following computations and summations are carried out, and are listed below.

$$
\begin{array}{l} \sum \mathrm {x w} = 1 8 3. 5 5 \\ \sum \mathrm {x t w} = 1 3 3 9. 5 9 \\ \sum \mathrm {t w} = 6 5. 3 4 \\ \sum t ^ {2} w = 5 7 1. 8 6 \\ \sum w = 9. 1 9 \\ \end{array}
$$

Raw Forecasts Solving for the coefficients (b, a) yields:

$$
\begin{array}{l} b = 0. 3 2 6 \quad = s l o p e \\ a = 1 7. 6 5 2 \quad = i n t e r c e p t a t t = 0 \\ \end{array}
$$

The level at $t = N$ becomes,

$$
a ^ {\prime} = a + 1 2 b = 2 1. 5 6 1 \quad = \text {l e v e l} \mathrm {a t} \tau = 0 (t = 1 2)
$$

So now, the forecasts for each of the future 12 months are generated using:

$$
f (\tau) = 2 1. 5 6 1 + 0. 3 2 6 \tau \quad \tau = 1 \text {t o} 1 2
$$

Integer Forecasts Since the forecasts are in fractional form, the forecasts are raw forecasts. The corresponding integer forecasts, $\mathrm{x}^{\prime}(\tau)$ , are also generated in the same way as given in Chap. 2. Table 4.5 lists the raw and integer forecasts for the future 12 months. Figure 4.2 depicts the flow to the 12 months of history demands and the corresponding 12 months of integer forecasts.

Table 4.5 Future months, $\tau$ , raw forecasts, $\mathrm{f}\left( \tau \right)$ and integer forecasts, ${\mathrm{x}}^{\prime }\left( \tau \right)$   

<table><tr><td>τ</td><td>f(τ)</td><td>x&#x27; (τ)</td></tr><tr><td>1</td><td>21.88</td><td>22</td></tr><tr><td>2</td><td>22.21</td><td>22</td></tr><tr><td>3</td><td>22.53</td><td>23</td></tr><tr><td>4</td><td>22.86</td><td>23</td></tr><tr><td>5</td><td>23.18</td><td>23</td></tr><tr><td>6</td><td>23.51</td><td>23</td></tr><tr><td>7</td><td>23.84</td><td>24</td></tr><tr><td>8</td><td>24.16</td><td>24</td></tr><tr><td>9</td><td>24.49</td><td>25</td></tr><tr><td>10</td><td>24.81</td><td>25</td></tr><tr><td>11</td><td>25.14</td><td>25</td></tr><tr><td>12</td><td>25.46</td><td>25</td></tr></table>

Table 4.6 is a worksheet to begin the calculations of estimating the standard deviation of the forecast errors. The table lists the 12 history months with the associated demand history, the discount weights, $\mathrm{w(t)}$ , and the corresponding linear fit of the history months, $\mathrm{f(t)}$ . Next is a list of the residual errors, $\mathrm{e(t) = [x(t) - f(t)]}$ , and then the discount weighted square of $\mathrm{e(t)}$ . The weighted sum of the square of the residual errors, $\mathrm{S(e)}$ , is listed at the bottom of the table.

Standard Deviation The estimate of the standard deviation, $s$ , is as follows:

$$
\mathrm {s} = \sqrt {S (e) / \sum w}
$$

In the example,

$$
s = \sqrt {1 3 2 . 2 3 / 9 . 1 9} = 3. 7 9 3
$$

![](images/8477f0affa550eed07ea27e86ef0aaa71c3e2d80985a598b3866cdb0acb116aa.jpg)  
Fig. 4.2 Twelve months of demand history and 12 months of integer forecasts for Example 4.2

Table 4.6 Worsheet with history months, t, demand history, x(t), discount weights, w(t), fit of history months, f(t), residual errors, e(t), and weighted square of residual errors, $\mathrm{e}(\mathrm{t})^{2}\mathrm{w}(\mathrm{t})$   

<table><tr><td>t</td><td>x(t)</td><td>w(t)</td><td>f(t)</td><td>e(t)</td><td>e(t)2w(t)</td></tr><tr><td>1</td><td>17</td><td>0.568</td><td>17.98</td><td>-0.98</td><td>0.54</td></tr><tr><td>2</td><td>18</td><td>0.598</td><td>18.30</td><td>-0.30</td><td>0.06</td></tr><tr><td>3</td><td>10</td><td>0.630</td><td>18.63</td><td>-8.63</td><td>46.93</td></tr><tr><td>4</td><td>25</td><td>0.663</td><td>18.95</td><td>6.05</td><td>24.24</td></tr><tr><td>5</td><td>18</td><td>0.698</td><td>19.28</td><td>-1.28</td><td>1.15</td></tr><tr><td>6</td><td>25</td><td>0.735</td><td>19.61</td><td>5.39</td><td>21.39</td></tr><tr><td>7</td><td>23</td><td>0.773</td><td>19.93</td><td>3.07</td><td>7.28</td></tr><tr><td>8</td><td>20</td><td>0.814</td><td>20.26</td><td>-0.26</td><td>0.05</td></tr><tr><td>9</td><td>17</td><td>0.857</td><td>20.58</td><td>-3.58</td><td>11.01</td></tr><tr><td>10</td><td>23</td><td>0.902</td><td>20.91</td><td>2.09</td><td>3.95</td></tr><tr><td>11</td><td>23</td><td>0.950</td><td>21.23</td><td>1.77</td><td>2.96</td></tr><tr><td>12</td><td>18</td><td>1.000</td><td>21.56</td><td>-3.56</td><td>12.68</td></tr><tr><td>Sum</td><td></td><td></td><td></td><td></td><td>132.23</td></tr></table>

Coefficient of Variation The coefficient of variation is measured using the level, a', as the base. This is,

$$
\begin{array}{l} \operatorname {c o v} = \mathrm {s} / \mathrm {a} \\ = 3. 7 9 3 / 2 1. 5 6 1 \\ = 0. 1 7 6 \\ \end{array}
$$

# 4.4 Trend Smoothing Forecasts

The trend (exponentially) smoothing forecast model is another popular way to forecast the demands that include a trend component. The forecast model at month $t$ for future month $\tau$ is formulated as below:

$$
f (\tau) = a (t) + b (t) \tau \quad f o r \tau = 1, 2, \dots
$$

The coefficients are the following:

$a(t) =$ estimate of the level at month t

$b(t) =$ estimate of the slope at month t

The model requires two parameters: $\alpha =$ smooth parameter for the level, and $\beta =$ smooth parameter for the slope. The current month is labeled as t, and the estimates of the prior month's level and slope, are denoted as a(t-1) and b(t-1), respectively. At month t, the most current demand entry becomes available and is noted

as $x(t)$ . As each month passes on, the estimates of the level and slope are revised in the following way:

$$
\begin{array}{l} \mathrm {a} (\mathrm {t}) = \alpha \left[ x (\mathrm {t}) \right] + (1 - \alpha) \left[ a (\mathrm {t} - 1) + b (\mathrm {t} - 1) \right] \\ \mathrm {b} (\mathrm {t}) = \beta [ \mathrm {a} (\mathrm {t}) - \mathrm {a} (\mathrm {t} - 1) ] + (1 - \beta) [ \mathrm {b} (\mathrm {t} - 1) ] \\ \end{array}
$$

Standard Deviation The estimate of the standard deviation of the one-month ahead forecast error is also revised at each month in the following way. The one-month ahead forecast error at month $t$ is:

$$
\begin{array}{l} \mathrm {e} (t) = \mathrm {x} (t) - \mathrm {f} (t - 1) \\ = x (t) - \left[ a (t - 1) + b (t - 1) \right] \\ \end{array}
$$

The estimate of the standard deviation of the one-month forecast error is smoothed and calculated as below:

$$
s (t) = \sqrt {\alpha [ e (t) ^ {2} ] + (1 - \alpha) [ s (t - 1) ^ {2} ]}
$$

where $s(t - 1)$ is the standard deviation from the prior month, $(t - 1)$ , and $s(t)$ is the standard deviation of the current month $t$ .

Coefficient of Variation Finally, the coefficient of variation at month $t$ is computed by,

$$
\operatorname {c o v} (t) = s (t) / a (t)
$$

Initial Forecast Adjustments When a part is new to the inventory system, there is no prior estimate of the level and slope, and thereby some minor adjustments to the computations are often applied.

An adjustment for this situation is described here. The smoothing parameter for the level, $\alpha$ , is adjusted each month in the following way:

$$
\alpha (t) = \max  (\alpha , 1 / t) \quad t = 1, 2, \dots
$$

This adjustment only pertains to the early months of a part's history. For example, if $\alpha = 0.20$ is desired, the adjusted values of the parameter become: $1.00$ , $0.50$ , $0.33$ , $0.25$ , $0.20$ , $0.20$ ,... for months, $t = 1$ , $2$ , $3$ , $4$ , $5$ , $6$ , and remain at $0.20$ for $t = 5$ or higher. This way, more weight is assigned to the early months, since there is minimum data, while the demands are (possibly) fluctuating more. So, for the early months, the smoothing parameter to estimate the level uses $\alpha(t)$ as described here.

Second, at the first month, $t = 1$ , since there is no prior estimate of the level at $t = 0$ , the estimate of the slope is automatically set to $b(1) = 0$ . Hence, at $t = 1$ , the estimates of the level and slope become,

$$
\begin{array}{l} a (1) = x (1) \\ \mathsf {b} (1) = 0 \\ \end{array}
$$

Example 4.3 Suppose an inventory system is using the trend smoothing forecast model with parameters, $\alpha = \beta = 0.10$ where the parameter for the level is adjusted for the early months as described. A new part enters the system and the first month $(t = 1)$ of demand becomes $x(1) = 23$ pieces. Note, the prior estimates of the coefficients are: $a(0) = b(0) = 0.00$ .

At month $t = 1$ , the following computations take place:

$$
\alpha (1) = \max  (0. 1 0, 1 / 1) = 1. 0 0
$$

$$
\mathrm {a} (1) = 1. 0 0 \mathrm {x} (1) + (1 - 1. 0 0) [ \mathrm {a} (0) + \mathrm {b} (0) ] = \mathrm {x} (1) = 2 3. 0 0
$$

$$
b (1) = 0. 0 0
$$

$$
f (\tau) = 2 3. 0 0 + 0 \tau \quad \tau = 1, 2,...
$$

$$
e (1) = x (1) - [ a (0) + b (0) ] = 2 3 - 0 = 2 3. 0 0
$$

$$
s (1) = \{1. 0 0 \times 2 3 ^ {2} + 0 \times 0 \} ^ {0. 5} = 2 3. 0 0
$$

$$
\operatorname {c o v} (1) = \mathrm {s} (1) / \mathrm {a} (1) = 2 3. 0 0 / 2 3. 0 0 = 1. 0 0
$$

These measures are listed in Table 4.7 at $t = 1$ .

Assume at month $t = 2$ , the demand becomes, $x(2) = 44$ . The smooth parameter for the level is now $\alpha(2) = 1/2 = 0.50$ . Below are the calculations for this month:

$$
\mathrm {a} (2) = 0. 5 0 [ 4 4 ] + (1 - 0. 5 0) [ 2 3. 0 0 + 0. 0 0 ] = 3 3. 5 0
$$

$$
b (2) = 0. 1 0 [ 3 3. 5 0 - 2 3. 0 0 ] + (1 - 0. 1 0) [ 0. 0 0 ] = 1. 0 5
$$

$$
f (t) = 3 3. 5 0 + 1. 0 5 t \quad t = 1, 2, \dots
$$

$$
e (2) = 4 4 - (2 3. 0 0 + 0. 0 0) = 2 1. 0 0
$$

$$
s (2) = \left\{0. 5 0 \times 2 1. 0 0 ^ {2} + (1 - 0. 5 0) 2 3. 0 0 ^ {2} \right\} ^ {0. 5} = 2 2. 0 2
$$

$$
\operatorname {c o v} (2) = \mathrm {s} (2) / \mathrm {a} (2) = 2 2. 0 2 / 3 3. 5 0 = 0. 6 5 7
$$

The above measures are listed in Table 4.7 at $t = 2$ .

Table 4.7 shows how the measures would appear as they progress from month to month for each of the first 24 months of the demand history. At each month, a new demand becomes available and the calculations are carried out, accordingly. Each month, the forecast model is revised, and for subsequent inventory needs, so also is the standard deviation of the one-month ahead forecast error. Note in the table where the coefficient of variation, cov, starts out high and as the months pass by, the cov gradually becomes lower, indicating, the forecasts are turning more reliable.

Figure 4.3 depicts how the estimates of the level has changed from the first month, $t = 1$ , to the last month, $t = 24$ , in the example. Figure 4.4 is a corresponding plot for the slope. Figure 4.5 is a plot that shows the relation with the demand history, $x(t)$ , and the one month ahead foread, $f(t - 1)$ , of the demand.

Table 4.7 Worksheet with month t, smooth parameter $\alpha(t)$ , demand x(t), level a(t), slope b(t), forecast f( $\tau$ ), forecast error e(t), square of forecast error e(t) $^2$ , standard deviation s(t), and coefficient of variation cov(t)   

<table><tr><td>t</td><td>α(t)</td><td>x(t)</td><td>a(t)</td><td>b(t)</td><td>f(τ)</td><td>e(t)</td><td>e(t)2</td><td>s(t)</td><td>cov(t)</td></tr><tr><td>1</td><td>1.00</td><td>23</td><td>23.00</td><td>0.00</td><td>23.00</td><td>23.00</td><td>529.00</td><td>23.00</td><td>1.000</td></tr><tr><td>2</td><td>0.50</td><td>44</td><td>33.50</td><td>1.05</td><td>34.55</td><td>21.00</td><td>485.00</td><td>22.02</td><td>0.657</td></tr><tr><td>3</td><td>0.33</td><td>43</td><td>37.37</td><td>1.33</td><td>38.70</td><td>8.45</td><td>347.13</td><td>18.63</td><td>0.499</td></tr><tr><td>4</td><td>0.25</td><td>15</td><td>32.77</td><td>0.74</td><td>33.51</td><td>-23.70</td><td>400.75</td><td>20.02</td><td>0.611</td></tr><tr><td>5</td><td>0.20</td><td>57</td><td>38.21</td><td>1.21</td><td>39.42</td><td>23.49</td><td>430.93</td><td>20.76</td><td>0.543</td></tr><tr><td>6</td><td>0.17</td><td>47</td><td>40.68</td><td>1.34</td><td>42.02</td><td>7.58</td><td>368.69</td><td>19.20</td><td>0.472</td></tr><tr><td>7</td><td>0.14</td><td>69</td><td>45.87</td><td>1.72</td><td>47.59</td><td>26.98</td><td>420.02</td><td>20.49</td><td>0.447</td></tr><tr><td>8</td><td>0.13</td><td>60</td><td>49.14</td><td>1.88</td><td>51.02</td><td>12.41</td><td>386.76</td><td>19.67</td><td>0.400</td></tr><tr><td>9</td><td>0.11</td><td>44</td><td>50.24</td><td>1.80</td><td>52.04</td><td>-7.02</td><td>349.26</td><td>18.69</td><td>0.372</td></tr><tr><td>10</td><td>0.10</td><td>44</td><td>51.23</td><td>1.72</td><td>52.95</td><td>-8.04</td><td>320.80</td><td>17.91</td><td>0.350</td></tr><tr><td>11</td><td>0.10</td><td>47</td><td>52.36</td><td>1.66</td><td>54.01</td><td>-5.95</td><td>292.26</td><td>17.10</td><td>0.327</td></tr><tr><td>12</td><td>0.10</td><td>56</td><td>54.21</td><td>1.68</td><td>55.89</td><td>1.99</td><td>263.43</td><td>16.23</td><td>0.299</td></tr><tr><td>13</td><td>0.10</td><td>33</td><td>53.60</td><td>1.45</td><td>55.05</td><td>-22.89</td><td>289.48</td><td>17.01</td><td>0.317</td></tr><tr><td>14</td><td>0.10</td><td>59</td><td>55.45</td><td>1.49</td><td>56.93</td><td>3.95</td><td>262.09</td><td>16.19</td><td>0.292</td></tr><tr><td>15</td><td>0.10</td><td>53</td><td>56.54</td><td>1.45</td><td>57.99</td><td>-3.93</td><td>237.43</td><td>15.41</td><td>0.273</td></tr><tr><td>16</td><td>0.10</td><td>82</td><td>60.39</td><td>1.69</td><td>62.08</td><td>24.01</td><td>271.34</td><td>16.47</td><td>0.273</td></tr><tr><td>17</td><td>0.10</td><td>34</td><td>59.27</td><td>1.41</td><td>60.68</td><td>-28.08</td><td>323.05</td><td>17.97</td><td>0.303</td></tr><tr><td>18</td><td>0.10</td><td>59</td><td>60.51</td><td>1.39</td><td>61.90</td><td>-1.68</td><td>291.03</td><td>17.06</td><td>0.282</td></tr><tr><td>19</td><td>0.10</td><td>57</td><td>61.41</td><td>1.34</td><td>62.76</td><td>-4.90</td><td>264.33</td><td>16.26</td><td>0.265</td></tr><tr><td>20</td><td>0.10</td><td>52</td><td>61.68</td><td>1.23</td><td>62.92</td><td>-10.76</td><td>249.47</td><td>15.79</td><td>0.256</td></tr><tr><td>21</td><td>0.10</td><td>67</td><td>63.32</td><td>1.28</td><td>64.60</td><td>4.08</td><td>226.19</td><td>15.04</td><td>0.238</td></tr><tr><td>22</td><td>0.10</td><td>56</td><td>63.74</td><td>1.19</td><td>64.93</td><td>-8.60</td><td>210.96</td><td>14.52</td><td>0.228</td></tr><tr><td>23</td><td>0.10</td><td>58</td><td>64.24</td><td>1.12</td><td>65.36</td><td>-6.93</td><td>194.67</td><td>13.95</td><td>0.217</td></tr><tr><td>24</td><td>0.10</td><td>44</td><td>63.22</td><td>0.91</td><td>64.13</td><td>-21.36</td><td>220.81</td><td>14.86</td><td>0.235</td></tr></table>

![](images/4bf3eb8fd3a26bfcfee31c7094fd6c56d6b3c677d894e7237d68386cb95d15cf.jpg)  
Fig. 4.3 Plot of the level coefficient, $\mathbf{a}(\mathbf{t})$ , for $t = 1$ to 24

![](images/bf260bdc5647b06b7770e57811ea33a57392488c8d757321e466c5874bbacb59.jpg)  
Fig. 4.4 Plot of the slope coefficient, $\mathrm{b(t)}$ , for $t = 1$ to 24

![](images/765d66d8bdfc324a9cb4b54f9f0a909644dab4ad56b59863d643fdbc4f984ad1.jpg)  
Fig. 4.5 Plot of the demands, $\mathbf{x}(\mathbf{t})$ , and the 1 month ahead forecasts, $\mathrm{f(t)}$ for $t = 1$ to 24

# 4.5ampening

Consider an item where a trend forecast model is being applied and the trend is declining and is swiftly approaching zero and below. Even though the trend is derived using the history of demands in a sound manner, the forecaster may wish to change the drop from a straight line leading to zero, to a flow that is always positive and is gradually approaching zero. The gradual flow to zero is in essence, how most items in the inventory die out anyway. This technique is called dampening and is an especially useful adjustment for fast declining forecasts. Three forecast models that use dampening are described in this section. These are the linear trend forecast model, the geometric forecast model and the maximum forecast model.

# 4.6 Linear Trend Forecast Model

Recall, the forecasts with a trend model have coefficients as listed below:

$a =$ level as of the most current time period

b = slope

For convenience in this section, this is called a linear trend forecast model. When the forecast is declining, $b < 0$ , it is of interest to find the month where the forecasts will fall to zero. This is obtained by setting the forecast to zero $(\mathrm{x_L}(\tau) = 0)$ and solving for $\tau$ . The particular month where the forecast reaches zero is denoted $\tau_0$ and is obtained as below:

$$
\tau_ {\mathrm {o}} = - \mathrm {a} / \mathrm {b}
$$

To avoid negative forecasts, the linear trend forecasts are adjusted as below:

$$
x _ {L} ^ {\prime} (\tau) = \max  (a + b \tau , 0) \quad \tau = 1, 2, \dots
$$

It is also useful to compute the all-time-forecast from the linear trend forecast model, denoted as $\mathbf{X}_{\mathrm{L}}^{\prime}$ . This is obtained using some algebra as below:

$$
X _ {L} = \sum_ {1} ^ {\tau o} x _ {L} (\tau) = - a (a + b) / (2 b)
$$

# 4.7 Geometric Forecast Model

Now consider another way to generate forecasts that are declining in a gradual manner. This is by way of the geometric forecast model, defined with two coefficients, $a = \text{level}$ , and $\theta = \text{growth rate}$ . When $\theta$ lies between zero and one, the raw forecasts are dropping each month and never reach zero or below. The model is formulated as below:

$$
\mathrm {x} _ {\mathrm {G}} ^ {\backprime} (\tau) = \mathrm {a} \theta^ {\tau} \quad \tau = 1, 2, \dots
$$

The all-time-forecast using the geometric model, denoted as $\mathrm{X}_{\mathrm{G}}^{\prime}$ , is obtained, using algebra, as below:

$$
X _ {G} = \sum_ {1} ^ {\infty} x _ {G} (\tau) = a \theta / (1 - \theta)
$$

It is also of interest to find the value of $\theta$ that allows the geometric forecast model to have the same all-time-forecast as the linear trend forecast model, whereby, $\mathrm{X}_{\mathrm{G}}^{\prime} = \mathrm{X}_{\mathrm{L}}^{\prime}$ . This is by solving for the value of $\theta$ that equates the two all-time-forecasts, as shown below:

$$
\mathrm {a} \theta / (1 - \theta) = - \mathrm {a} (\mathrm {a} + \mathrm {b}) / (2 \mathrm {b})
$$

Using algebra, the particular value of $\theta$ is the following:

$$
\theta = (a + b) / (a - b)
$$

This is the value of $\theta$ to use when converting forecasts based on the linear trend model to forecasts using the geometric model. As stated earlier, the geometric forecasts will never fall to zero or below and the all-time-forecasts will be the same as the linear trend forecast model.

Table 4.8 Listing of the 12 future months, $\tau$ , the forecasts from the linear model, $\mathrm{x}_{\mathrm{L}}(\tau)$ , $\theta^{\tau}$ , the forecasts from the geometric model, $\mathrm{x}_{\mathrm{G}}(\tau)$ , and from the maximum model, $\mathrm{x}_{\mathrm{M}}(\tau)$   

<table><tr><td>τ</td><td>xL′(τ)</td><td>θτ</td><td>xG′(τ)</td><td>x&#x27;M(τ)</td></tr><tr><td>1</td><td>9</td><td>0.818</td><td>8.182</td><td>9.000</td></tr><tr><td>2</td><td>8</td><td>0.669</td><td>6.694</td><td>8.000</td></tr><tr><td>3</td><td>7</td><td>0.548</td><td>5.477</td><td>7.000</td></tr><tr><td>4</td><td>6</td><td>0.448</td><td>4.481</td><td>6.000</td></tr><tr><td>5</td><td>5</td><td>0.367</td><td>3.666</td><td>5.000</td></tr><tr><td>6</td><td>4</td><td>0.300</td><td>3.000</td><td>4.000</td></tr><tr><td>7</td><td>3</td><td>0.245</td><td>2.454</td><td>3.000</td></tr><tr><td>8</td><td>2</td><td>0.201</td><td>2.008</td><td>2.008</td></tr><tr><td>9</td><td>1</td><td>0.164</td><td>1.643</td><td>1.643</td></tr><tr><td>10</td><td>0</td><td>0.134</td><td>1.344</td><td>1.344</td></tr><tr><td>11</td><td>0</td><td>0.110</td><td>1.100</td><td>1.100</td></tr><tr><td>12</td><td>0</td><td>0.090</td><td>0.900</td><td>0.900</td></tr><tr><td></td><td>45</td><td></td><td>40.950</td><td>48.995</td></tr></table>

# 4.8 Maximum Forecast Model

A criticism of the geometric forecast model is that for the early months, the forecasts generated are smaller than the counterpart forecasts from the linear trend forecast model. Some forecasters are reluctant to accept this situation. A way to overcome is to select the maximum of the two forecasts, denoted as $\mathrm{x}_{\mathrm{M}}^{\prime}(\tau)$ , and this forecast is obtained as below:

$$
\mathrm {x} _ {\mathrm {M}} ^ {\prime} (\tau) = \max  \left(\mathrm {x} _ {\mathrm {L}} ^ {\prime} (\tau), \mathrm {x} _ {\mathrm {G}} ^ {\prime} (\tau)\right) \quad \tau = 1, 2, \dots
$$

Note for this formulation, the forecasts are declining each month, they never fall below zero, and the all-time-forecast is a bit larger than the counterpart all-time-forecasts of both the linear trend forecast model and the geometric forecast model.

Example 4.4 Suppose a situation where the trend model yields a level and trend of: $(a = 10$ and $b = -1)$ , and the forecaster wants to explore the three models of forecasting for this situation.

Linear Trend Forecasts: The monthly forecasts using the linear trend model is listed as below:

$$
\mathrm {x} _ {\mathrm {L}} ^ {\prime} (\tau) = \max  \left[ (1 0 - 1 \tau), 0 \right] \quad \mathrm {t} = 1, 2, \dots
$$

In Table 4.8, the first 12 future months, $\tau$ , are listed in column 1, and the linear trend forecasts, $\mathbf{x}_{\mathrm{L}}^{\prime}(\tau)$ , are in column 2. Note where the first month the demands reach zero is $\tau = 10$ , and this corresponds to:

$$
\tau_ {\mathrm {o}} = - \mathrm {a} / \mathrm {b} = - 1 0 / - 1 = 1 0
$$

The all-time-forecast for the linear trend forecast model is computed as:

$$
\begin{array}{l} x _ {\mathrm {L}} = - a (a + b) / (2 b) \\ = - 1 0 (1 0 - 1) / (- 2) \\ = 4 5 \\ \end{array}
$$

This quantity agrees with the sum at the bottom of column 2 in the table.

Geometric Forecasts: A first step to apply the geometric forecast model is to determine the growth rate, $\theta$ , as shown below:

$$
\begin{array}{l} \theta = (a + b) / (a - b) \\ = (1 0 - 1) / (1 0 + 1) \\ = 9 / 1 1 \\ \end{array}
$$

Hence, the forecasts are generated as below:

$$
\begin{array}{l} \mathrm {x} _ {\mathrm {L}} ^ {\prime} (\tau) = a \theta^ {\tau} \\ = 1 0 (9 / 1 1) ^ {\tau} \quad \tau = 1, 2, \dots \\ \end{array}
$$

The values of $\theta^{\tau}$ are listed in column 3 of the table, and the monthly geometric forecasts are in column 4.

The all-time-forecast using the geometric forecast model is computed as below:

$$
\begin{array}{l} X _ {G} = a \theta / (1 - \theta) \\ = 1 0 (9 / 1 1) / (1 - 9 / 1 1) \\ = 4 5 \\ \end{array}
$$

Note, the sum of the forecasts for the first 12 months of the geometric model is listed at the bottom of column 4 and is 40.950, a bit smaller than the corresponding sum of 45 for the linear trend forecast.

Maximum Forecast: A third way to generate the forecasts for a fast declining item is the maximum forecast that is computed as below:

$$
\mathrm {x} _ {\mathrm {M}} ^ {\prime} (\tau) = \max  \left(\mathrm {x} _ {\mathrm {L}} ^ {\prime} (\tau), \mathrm {x} _ {\mathrm {G}} ^ {\prime} (\tau)\right) \quad \tau = 1, 2, \dots
$$

The results are listed in the fifth column of the table, $\mathrm{x}_{\mathrm{M}}^{\prime}(\tau)$ . Note the sum of the forecasts for the first 12 months is 48.995, which is higher than the counterpart sum from the linear trend forecast model.

Figure 4.6 is a plot of the 12 future forecasts using the linear trend forecast model, $\mathrm{x}_{\mathrm{L}}^{\prime}(\tau)$ , and the geometric trend forecast model, $\mathrm{x}_{\mathrm{G}}^{\prime}(\tau)$ . Figure 4.7 depicts the forecasts from the maximum forecast model, $\mathrm{x}_{\mathrm{M}}^{\prime}(\tau)$ .

![](images/60ff1853f9ad722be906a4bcaad2997057ced81ae40389638965d1cdcdc7c921.jpg)  
Fig. 4.6 Plot of the 12 months of forecasts from the linear forecast model, $\mathrm{x}_{\mathrm{L}}^{\prime}(\tau)$ and from the geometric forecast model, $\mathrm{x}_{\mathrm{G}}^{\prime}(\tau)$

![](images/f509d001feedddd7bbd50397cb836efdbe161f02ddc34a581eadd0e2ef19db86.jpg)  
Fig. 4.7 Plot of the 12 months of forecasts from the maximum forecast model, $\mathrm{x}_{\mathrm{M}}^{\prime}(\tau)$

# 4.9 Other Dampening Applications

Dampening can also be applied to the seasonal models of Chap. 5 and the promotion trend model of Chap. 6. The only portion of the seasonal and promotion models that are affected is the trend, $(\mathrm{a} + \mathrm{b}\tau)$ .

# Summary

Three forecast models are described that have a trend demand pattern, the trend regression forecast model, the trend discount forecast model and the trend smoothing forecast model. The trend regression model generates the forecasts using the most recent N monthly demands and assigns equal weight to each demand entry. The trend discount forecast model also uses the N most recent demand entries and gives relatively less weight to each older monthly demand entry. The trend smoothing forecast model revises the forecast each month with use of the most current demand entry. Each of the forecast models develops forecasts that are in numerical fractions

and here called raw forecasts. The raw forecasts are converted to integer forecasts in a systematic way. The standard deviation of the one-month forecast error is also computed for each of the forecast models, and the coefficient of variation is computed as well. Three dampening forecast models are also described.

# Chapter 5 Seasonal Forecasts

# 5.1 Introduction

Seasonal forecasts are needed when the demands over a year have a cyclical flow such as the rise for light clothing during the summers; heavy clothing during the winters, school supplies in late summers; antifreeze during the winters; golf balls in the summers; cold tablets in the winters; and sunglasses in the summers. Two forecast models are described: the seasonal smoothing multiplicative forecast model, and the seasonal smoothing additive forecast model. Perhaps the most common application of the model is when the demands are monthly covering 12 months in a year. The seasonal multiplicative model is described fully with example data. The model has two stages: first is to initialize the forecasts using the most current N history demands, and second is to revise the forecasts as each new monthly demand becomes available. The model includes a trend component and twelve seasonal ratios for each month of the year. The trend component could be flat, rising or falling, and the seasonal ratios could vary for each month of the year indicating an increase or decrease in the demands for the month relative to the trend. The model requires three smoothing parameters that assign higher weights to the more recent demands in the history. This way, the forecasts can readily react to any changes in the demand flow of the items in forecast. For brevity, an abridged discussion of the seasonal additive model is presented.

# 5.2 Seasonal Multiplicative Model

The seasonal (exponentially) smoothing multiplicative model applies when the demands follow a cyclical pattern from year to year, like the rise in the sale of bathing suits during the summer months. This demand flow is called a seasonal demand

pattern and combines both seasonal and trend components. The forecast model for the $\tau$ -th future month, as of month $t$ , is below:

$$
f (\tau) = (a + b \tau) r (t + \tau) \quad \tau = 1, 2, \dots
$$

where: $t$ is the current month, $a$ is the level of the current month, $b$ is the slope, and $r(t + \tau)$ is the seasonal ratio for the $\tau$ -th future month. The underlying trend of the seasonal pattern is measured by $(a + bt)$ . The seasonal ratios specify how the expected demand for the month will vary with respect to the trend. Altogether, there are 12 separate seasonal ratios, $r(1), \ldots, r(12)$ , one for each month of the year and they repeat year after year. The seasonal ratios have an average of one and all are greater than zero. When $r(t) = 1.00$ , the expected demand for month $t$ is the same as the trend; when $r(t) > 1$ , the expected demand for month $t$ is larger than the trend; and when $r(t) < 1$ , the expected demand is below the trend.

The model is run in two stages: initialize and revise. The initialize stage is needed to estimate the 14 coefficients of the model (a, b, r(1), ..., r(12)). The revise stage is used to update the model coefficients each month when a new demand entry becomes available.

Initialize Forecast Stage The initialize stage is described assuming 24 months of history demands are available. The demands are labeled as $\mathrm{x}(1),\dots,\mathrm{x}(24)$ where $\mathrm{x}(1)$ is the oldest demand, and $\mathrm{x}(24)$ the most current.

The seasonal model also calls for three parameters, $(\alpha, \beta, \gamma)$ , all in the range of zero to one, and typically, all are set near 0.10. The parameter $\alpha$ is used to smooth the estimate of the level, $\beta$ to smooth the slope, and $\gamma$ to smooth the seasonal ratios.

Below is an overview of the ten steps in the initialize stage.

1. X1 is the average of the first 12 history demands.   
2. X2 is the average of the last 12 history demands.   
3. $\mathrm{b}^{\prime}(0)$ is the estimate of the slope at $t = 0$ .   
4. a'(0) is the estimate of the level at $t = 0$ .   
5. a $\mathbf{\Phi}(t)$ is the estimate of the level at month $t$ for $t = 1$ to 24.   
6. $\mathrm{r}^{\prime}(\mathrm{t})$ is a measure of the seasonal ratio at $t = 1$ to 24.   
7. $\mathrm{r(t)}$ is an average estimate of the seasonal ratio at $t = 1$ to 12.   
8. Let $\mathrm{a}(0) = \mathrm{a}^{\prime}(0)$ and $\mathrm{b}(0) = \mathrm{b}^{\prime}(0)$ .   
9. Smoothed estimates of $\mathrm{a(t)}$ , $\mathrm{b(t)}$ and $\mathrm{r(t)}$ are derived one month at a time starting with month $t = 1$ and continuing till $t = 24$ .   
10. At $t = 24$ , the initial forecast for future month $\tau$ is: $f(\tau) = [a(24) + b(24)\tau]r(24 + \tau)$ .

In a more detailed mathematical way, the ten steps to initialize the seasonal model listed above are below:

1. $\mathrm{X}1 = [\mathrm{x}(1) + \dots +\mathrm{x}(12)] / 12$   
2. $\mathrm{X}2 = [\mathrm{x}(13) + \dots +\mathrm{x}(24)] / 12$   
3. $\mathrm{b}^{\backprime}(0) = [\mathrm{X}2 - \mathrm{X}1] / 12$   
4. $a^{\prime}(0) = X1 - 6.5b^{\prime}(0)$   
5. $a^{\prime}(t) = a^{\prime}(0) + b^{\prime}(0)t\quad t = 1$ to 24   
6. $\mathrm{r}^{\prime}(\mathrm{t}) = \mathrm{x}(\mathrm{t}) / \mathrm{a}^{\prime}(\mathrm{t})$ t=1 to 24   
7. $\mathrm{r(t) = [r^{\prime}(t) + r^{\prime}(t + 12)] / 2} \quad t = 1$ to 12   
8. $a(0) = a^{\prime}(0)$ and $b(0) = b^{\prime}(0)$   
9. Do the following for $t = 1$ to 24

$$
\begin{array}{l} a (t) = \alpha [ x (t) / r (t) ] + (1 - \alpha) [ a (t - 1) + b (t - 1) ] \\ b (t) = \beta [ a (t) - a (t - 1) ] + (1 - \beta) [ b (t - 1) ] \\ \mathrm {r} (t + 1 2) = \gamma [ \mathrm {x} (t) / \mathrm {a} (t) ] + (1 - \gamma) [ \mathrm {r} (t) ] \\ \end{array}
$$

Because $t = 24$ is the final history month, the forecasts for the $\tau$ -th future month, as of $t = 24$ , is computed as below:

$$
f (\tau) = [ a (2 4) + b (2 4) \tau ] r (2 4 + \tau) \quad \tau = 1, 2, \dots
$$

It is important to synchronize the 12 unique seasonal ratios to the months following the most current month, $t = 24$ . For example, if month $t = 24$ is March, then arrange for the seasonal ratio of the subsequent months to begin with April, and so forth.

Example 5.1 Suppose a system where the 24 months of demand history are those listed in Table 5.1 in the column, $\mathrm{x(t)}$ . In the example, the smoothing parameters are $(\alpha = 0.10, \beta = 0.10$ and $\gamma = 0.10$ ). The following is a summary of the nine initialize steps.

1. $\mathrm{X}1 = \left\lbrack  {{12} + \ldots  + {11}}\right\rbrack  /{12} = {20.91}$   
2. $\mathrm{X}2 = \left\lbrack  {{13} + \ldots  + {26}}\right\rbrack  /{12} = {27.33}$   
3. $b(0) = (27.33 - 20.91) / 12 = 0.534$   
4. $a(0) = 20.91 - 6.5 \times 0.534 = 17.441$   
5. $a(t) = 17.441 + 0.534t$ $\mathrm{t} = 1$ to 24 (column 3)   
6. $\mathrm{r}^{\prime}(\mathrm{t})$ is computed for $\mathrm{t} = 1$ to 24, (column 4)   
7. $\mathrm{r(t)}$ is the average of months $t$ and $t + 12$ for $t = 1$ to 12, (column 5)   
8. $\mathrm{a}\left( 0\right)  = {17.441}$ and $\mathrm{b}\left( 0\right)  = {0.534}$   
9. The smoothing for $t = 1$ to 24 is as below:

$$
a (t) = 0. 1 [ x (t) / r (t) ] + 0. 9 [ a (t - 1) + b (t - 1) ] \quad (c o l u m n 6)
$$

$$
b (t) = 0. 1 [ a (t) - a (t - 1) ] + 0. 9 b (t - 1) ] \quad \text {(c o l u m n 7)}
$$

$$
\mathrm {r} (t + 1 2) = 0. 1 [ \mathrm {x} (t) / \mathrm {a} (t) ] + 0. 9 [ \mathrm {r} (t) ] \quad \text {(c o l u m n 8)}
$$

Table 5.1 Initialize worksheet for seasonal smoothing model, with history month t, demand history x(t), level a'(t), seasonal ratio r'(t), seasonal ratio r(t), level a(t), slope b(t), seasonal ratio r(t+12), fit f(t), and residual error e(t)   

<table><tr><td>t</td><td>x(t)</td><td>a&#x27;(t)</td><td>r&#x27;(t)</td><td>r(t)</td><td>a(t)</td><td>b(t)</td><td>r(t+12)</td><td>f(t)</td><td>e(t)</td></tr><tr><td>1</td><td>12</td><td>17.73</td><td>0.68</td><td>0.61</td><td>17.93</td><td>0.55</td><td>0.61</td><td>11.01</td><td>0.99</td></tr><tr><td>2</td><td>22</td><td>18.26</td><td>1.20</td><td>0.72</td><td>19.67</td><td>0.67</td><td>0.76</td><td>15.02</td><td>6.98</td></tr><tr><td>3</td><td>27</td><td>18.80</td><td>1.44</td><td>1.31</td><td>20.37</td><td>0.68</td><td>1.31</td><td>26.77</td><td>0.23</td></tr><tr><td>4</td><td>22</td><td>19.33</td><td>1.14</td><td>1.11</td><td>20.92</td><td>0.66</td><td>1.11</td><td>23.15</td><td>-1.15</td></tr><tr><td>5</td><td>19</td><td>19.86</td><td>0.96</td><td>1.41</td><td>20.77</td><td>0.58</td><td>1.36</td><td>28.27</td><td>-9.27</td></tr><tr><td>6</td><td>27</td><td>20.40</td><td>1.32</td><td>1.65</td><td>20.85</td><td>0.53</td><td>1.61</td><td>33.67</td><td>-6.67</td></tr><tr><td>7</td><td>44</td><td>20.93</td><td>2.10</td><td>1.67</td><td>21.88</td><td>0.58</td><td>1.71</td><td>37.33</td><td>6.67</td></tr><tr><td>8</td><td>21</td><td>21.47</td><td>0.98</td><td>1.01</td><td>22.29</td><td>0.57</td><td>1.00</td><td>22.35</td><td>-1.35</td></tr><tr><td>9</td><td>15</td><td>22.00</td><td>0.68</td><td>0.82</td><td>22.41</td><td>0.52</td><td>0.80</td><td>17.96</td><td>-2.96</td></tr><tr><td>10</td><td>21</td><td>22.54</td><td>0.93</td><td>0.91</td><td>22.93</td><td>0.52</td><td>0.91</td><td>20.98</td><td>0.02</td></tr><tr><td>11</td><td>7</td><td>23.07</td><td>0.30</td><td>0.37</td><td>22.99</td><td>0.47</td><td>0.37</td><td>8.40</td><td>-1.40</td></tr><tr><td>12</td><td>11</td><td>23.61</td><td>0.47</td><td>0.52</td><td>23.25</td><td>0.45</td><td>0.51</td><td>11.90</td><td>-0.90</td></tr><tr><td>13</td><td>13</td><td>24.14</td><td>0.54</td><td></td><td>23.47</td><td>0.43</td><td>0.60</td><td>14.14</td><td>-1.14</td></tr><tr><td>14</td><td>6</td><td>24.68</td><td>0.24</td><td></td><td>22.34</td><td>0.27</td><td>0.68</td><td>15.16</td><td>-9.16</td></tr><tr><td>15</td><td>30</td><td>25.21</td><td>1.19</td><td></td><td>22.64</td><td>0.28</td><td>1.31</td><td>29.75</td><td>0.25</td></tr><tr><td>16</td><td>28</td><td>25.75</td><td>1.09</td><td></td><td>23.14</td><td>0.30</td><td>1.12</td><td>25.97</td><td>2.03</td></tr><tr><td>17</td><td>49</td><td>26.28</td><td>1.86</td><td></td><td>24.57</td><td>0.41</td><td>1.47</td><td>36.08</td><td>12.92</td></tr><tr><td>18</td><td>53</td><td>26.82</td><td>1.98</td><td></td><td>25.69</td><td>0.48</td><td>1.69</td><td>43.45</td><td>9.55</td></tr><tr><td>19</td><td>34</td><td>27.35</td><td>1.24</td><td></td><td>25.59</td><td>0.42</td><td>1.64</td><td>41.92</td><td>-7.92</td></tr><tr><td>20</td><td>29</td><td>27.89</td><td>1.04</td><td></td><td>26.29</td><td>0.45</td><td>1.02</td><td>26.77</td><td>2.23</td></tr><tr><td>21</td><td>27</td><td>28.42</td><td>0.95</td><td></td><td>27.37</td><td>0.52</td><td>0.83</td><td>22.80</td><td>4.20</td></tr><tr><td>22</td><td>26</td><td>28.95</td><td>0.90</td><td></td><td>27.94</td><td>0.52</td><td>0.92</td><td>25.61</td><td>0.39</td></tr><tr><td>23</td><td>13</td><td>29.49</td><td>0.44</td><td></td><td>29.11</td><td>0.59</td><td>0.38</td><td>11.05</td><td>1.95</td></tr><tr><td>24</td><td>17</td><td>30.02</td><td>0.57</td><td></td><td>30.02</td><td>0.62</td><td>0.52</td><td>15.64</td><td>1.36</td></tr></table>

# 5.2 Seasonal Multiplicative Model

![](images/4c32ca1c49b3e53fba972b252ee436e4ecad8574d3014e23aa9c7033a6a1cc09.jpg)  
Fig. 5.1 Plot of 24 months of demand history, $\mathrm{x(t)}$ , and the corresponding, level, a(t)

Initial Forecasts The initialize stage is now complete, and the initial forecast as of month $t = 24$ for the $\tau$ -th future month is the following:

$$
\begin{array}{l} f (\tau) = [ a (2 4) + b (2 4) \tau ] r (2 4 + \tau) \quad \tau = 1, 2, \dots \\ = [ 3 0. 0 2 + 0. 6 2 \tau ] r (2 4 + \tau) \\ \end{array}
$$

Note, the seasonal ratios, at $t = 24$ , for the future months are listed in column 8 under $r(t + 12)$ . So for the first future month, the seasonal ratio is for month $t = (24 + 1) = 25$ , and this is found in the row when $t = 13$ and the seasonal ratio is $r(13 + 12) = 0.60$ . In a like way, all of the seasonal ratios for the future months are obtained. The forecasts for the first three future months are listed below:

$\tau$ f(τ)

1 $[30.02 + 0.62\times 1]0.60 = 18.38$   
2 $[30.02 + 0.62\times 2]0.68 = 21.26$   
3 $[30.02 + 0.62\times 3]1.31 = 41.76$

Seasonally Adjusted Average Figure 5.1 depicts the flow of the demand history, $\mathbf{x}(\mathbf{t})$ , and the estimates of the associated level, $\mathbf{a}(\mathbf{t})$ , for each of the months $t = 1$ to 24. Recall, the level estimates the seasonally adjusted average for the month. The figure shows where the level is slightly increasing each month.

Fitted Values The fitted values are also listed in Table 5.1 for each of the history months, $t = 1$ to 24. The fit is denoted as $f(t)$ and is computed by, $f(t) = a(t)\times r(t)$ . For example, at $t = 10$ , $a(10) = 23.935$ and $r(10) = 0.915$ , thereby, $f(10) = 23.935\times 0.915 = 20.986$ . For brevity, the table only lists two decimals in the columns, while the computations are based on the higher fractional values. Figure 5.2 is a plot showing the relationship between the demand history, $x(t)$ , and the associated fitted value, $f(t)$ , for each month in the history.

Residual Errors The residual errors, $\mathrm{e(t)}$ , are also listed in Table 5.1 for each of the history months, $t = 1$ to 24. These are computed by

$$
\mathrm {e} (t) = \mathrm {x} (t) - \mathrm {f} (t).
$$

![](images/3a84860ad5f5b06d2268671a056a75cf31299c6af094e43d7366ce9ff7aa5631.jpg)  
Fig. 5.2 Plot of 24 months of demand history, $\mathrm{x(t)}$ , and the corresponding fit, $\mathrm{f(t)}$

![](images/00da39709c926fa2a164185ea2e0c437ea47d402cc00330dd5b2d5ade45c924d.jpg)  
Fig. 5.3 Plot of absolute residual error, $|\mathsf{e}|$ , and fit $|\mathsf{e}|$ over 24 months of history

At month $t = 10$ , say, $x(10) = 21$ , $f(10) = 20.98$ , and thereby $e(10) = (21 - 20.98) = 0.02$ .

In general, the absolute values of the residual errors will tend to flow higher and lower in a direct relation with the seasonal ratios. The lower the seasonal ratio for a month, the smaller the absolute values tend to be, and so forth. In Table 5.1, the average of the monthly absolute value is $|\overline{e}| = 3.83$ . Figure 5.3 depicts the flow of the absolute values, $|e|$ for each of the history months. The table also lists a pseudo way to generate a fitted value of the absolute value, denoted as $|e|$ . The fitted values are computed in the following way:

$$
\left| \mathrm {e} (t) \right| ^ {\prime} = 3. 8 3 \times \sqrt {r (t)} \text {f o r} t = 1 \text {t o} 2 4
$$

Note at $t = 10$ , $r(10) = 0.91$ , and thereby,

$$
\left| \mathrm {e} (1 0) \right| ^ {\prime} = 3. 8 3 \times \sqrt {0 . 9 1} = 3. 6 3
$$

Figure 5.3 depicts the flow of the fitted error values for each of the 24 history months. The flow shows where the absolute values of the residual errors appear to rise and fall in the same direction as the fitted values. The swing is also in the same direction as the seasonal ratios.

# 5.3 Revised Forecasts

Standard Deviation An estimate of the standard deviation of the forecast errors is computed as shown below where $s(t)^2$ is the standard deviation squared at month $t$ .

$$
A t t = 1: s (1) ^ {2} = e (1) ^ {2}
$$

$$
F o r t = 2 \text {t o} N: s (t) ^ {2} = \alpha e (t) ^ {2} + (1 - \alpha) s (t) ^ {2}
$$

The estimate of the standard deviation for the item is the final one, $s(t)^2$ , computed at $t = N$ , i.e.,

$$
s = \sqrt {s (N) ^ {2}}
$$

In the example,

$$
s = 5. 5 5
$$

Assuming the pseudo fitted relation sited above with the absolute residual errors, the following rule-of-thumb may be applied with respect to the estimate of the standard deviation of the forecast error for each month. This is the following:

$$
\begin{array}{l} \mathrm {s} (\mathrm {r}) = \mathrm {s} \sqrt {\mathrm {r}} \\ = 5. 5 5 \sqrt {\mathrm {r}} \\ \end{array}
$$

where $s(r)$ is the standard deviation for a month, $t$ , with the seasonal ratio set as $r = r(t)$ .

For example, $s = 5.55$ , and at month $t = 10$ , $r(10) = 0.91$ , thereby,

$$
\begin{array}{l} s (0. 9 1) = 5. 5 5 \sqrt {0 . 9 1} \\ = 5. 2 9 \\ \end{array}
$$

# 5.3 Revised Forecasts

After completing the initial stage, the forecasts are revised each month when a new demand entry becomes available. The revision uses smoothing, with the same parameters, $(\alpha, \beta, \gamma)$ , as in the initialize stage. As each month $t$ passes on, and a new demand entry, $\mathbf{x}(t)$ , becomes available, the three model coefficients are revised as below:

$$
\begin{array}{l} a (t) = \alpha [ x (t) / r (t) ] + (1 - \alpha) [ a (t - 1) + b (t - 1) ] \\ b (t) = \beta [ a (t) - a (t - 1) ] + (1 - \beta) [ b (t - 1) ] \\ \mathrm {r} (t + 1 2) = \gamma [ \mathrm {x} (t) / \mathrm {a} (t) ] + (1 - \gamma) [ \mathrm {r} (t) ] \\ \end{array}
$$

And as before, the forecast at month $t$ for future month $\tau$ is the following:

$$
f (\tau) = [ a (t) + b (t) \tau ] r (t + \tau) \quad t = 1, 2, \dots
$$

Example 5.2 Continuing with Example 5.1, suppose the demand at month $t = 25$ is $x(25) = 15$ . So now the revised coefficients are computed as below:

$$
\mathrm {a} (2 5) = 0. 1 \times 1 5 + 0. 9 \times [ 3 0. 0 2 + 0. 6 2 ] = 2 9. 0 7 6
$$

$$
b (2 5) = 0. 1 \times [ 2 9. 0 7 6 - 3 0. 0 2 ] + 0. 9 \times 0. 6 2 = 0. 4 6 4
$$

$$
\mathrm {r} (3 6) = 0. 1 \times [ 1 5 / 2 9. 0 7 6 ] + 0. 9 \times 0. 6 0 = 0. 5 9 1 6
$$

The $\tau$ month ahead forecasts as of month $t = 25$ becomes,

$$
f (\tau) = [ 2 9. 0 7 6 + 0. 4 6 4 \tau ] r (2 5 + \tau) \quad \tau = 1, 2, \dots
$$

At $\tau = 1$

$$
\begin{array}{l} f (1) = [ 2 9. 0 7 6 + 0. 4 6 4 \times 1 ] r (2 6) \\ = [ 2 9. 0 7 6 + 0. 4 6 4 ] 0. 6 8 \\ = 2 0. 0 9 \\ \end{array}
$$

and so forth.

# 5.4 Initialize with 12-Months of Demand History

When 12 months of demand history are available, $[x(1),\dots,x(12)]$ , the seasonal multiplicative model can be initialized as described below:

$$
\mathrm {X} 1 = [ \mathrm {x} (1) + \dots + \mathrm {x} (1 2) ] / 1 2 = \text {a v e r a g e d e m a n d f o r y e a r} 1
$$

$$
a ^ {\prime} (1 2) = X 1 = \text {e s t i m a t e}
$$

$$
b ^ {\prime} (1 2) = 0. 0 = \text {e s t i m a t e o f s l o p e a t m o n t h} t = 1 2
$$

$$
\mathrm {r} (t + 1 2) = \mathrm {x} (t) / X 1 \quad \text {f o r} t = 1 \text {t o} 1 2 = \text {e s t i m a t e o f s e a s o n a l r a t i o s f o r} 1 2 \text {m o n t h s}
$$

# 5.5 Seasonal Additive Model

The additive version of the seasonal smoothing model is almost the same as the multiplicative version. Instead of using seasonal ratios as the multiplicative model does, the additive model uses seasonal increments that can be plus or minus. The initializing steps and the revision steps are almost the same in both models. For brevity, the description below is given without an example to illustrate the steps.

Initialize Forecast Stage The initialize stage is described assuming 24 months of history demands are available. The demands are labeled as $\mathrm{x}(1),\dots,\mathrm{x}(24)$ where $\mathrm{x}(1)$ is the oldest demand, and $\mathrm{x}(24)$ the most current.

The seasonal model also calls for three parameters, $(\alpha, \beta, \gamma)$ , all in the range of zero to one, and typically, all are set near 0.10. The parameter $\alpha$ is used to smooth the estimate of the level, $\beta$ to smooth the slope, and $\gamma$ to smooth the seasonal increments.

Below is an overview of the ten steps in the initialize stage.

1. X1 is the average of the first 12 history demands.   
2. X2 is the average of the last 12 history demands.   
3. $\mathrm{b}^{\prime}(0)$ is the estimate of the slope at $t = 0$ .   
4. a'(0) is the estimate of the level at $t = 0$ .   
5. a'(t) is the estimate of the level at month t for $t = 1$ to 24.   
6. $\mathrm{d}^{\prime}(t)$ is a measure of the seasonal increment at $t = 1$ to 24.   
7. $\mathrm{d}(t)$ is an average estimate of the seasonal increment at $t = 1$ to 12.   
8. Let $a(0) = a^{\prime}(0)$ and $b(0) = b^{\prime}(0)$ .   
9. Smoothed estimates of $a(t)$ , $b(t)$ and $d(t)$ are derived one month at a time starting with month $t = 1$ and continuing till $t = 24$ .   
10. At $t = 24$ , the initial forecast for future month $\tau$ is:

$$
f (\tau) = [ a (2 4) + b (2 4) \tau + d (2 4 + \tau) ]
$$

In a more detailed mathematical way, the ten steps to initialize the seasonal additive model listed above are below:

1. $\mathrm{X}1 = [\mathrm{x}(1) + \dots +\mathrm{x}(12)] / 12$   
2. $X2 = [x(13) + \dots + x(24)] / 12$   
3. $\mathrm{b}^{\prime}(0) = [\mathrm{X}2 - \mathrm{X}1] / 12$   
4. a $^{\prime}(0) = X1 - 6.5b^{\prime}(0)$   
5. $a^{\prime}(t) = a^{\prime}(0) + b^{\prime}(0)t\quad t = 1$ to 24   
6. $\mathrm{d}^{\prime}(\mathrm{t}) = [\mathrm{x}(\mathrm{t}) - \mathrm{a}^{\prime}(\mathrm{t})]$ t=1 to 24   
7. $\mathrm{d}(\mathrm{t}) = [\mathrm{d}'(\mathrm{t}) + \mathrm{d}'(\mathrm{t} + 12)] / 2 \quad \mathrm{t} = 1$ to 12   
8. $a(0) = a^{\prime}(0)$ and $b(0) = b^{\prime}(0)$   
9. Do the following for $t = 1$ to 24

$$
\begin{array}{l} a (t) = \alpha [ x (t) - d (t) ] + (1 - \alpha) [ a (t - 1) + b (t - 1) ] \\ b (t) = \beta [ a (t) - a (t - 1) ] + (1 - \beta) [ b (t - 1) ] \\ d (t + 1 2) = \gamma [ x (t) - a (t) ] + (1 - \gamma) [ d (t) ] \\ \end{array}
$$

Because $t = 24$ is the final history month, the forecasts for the $\tau$ -th future month, as of $t = 24$ , is computed as below:

$$
f (\tau) = [ a (2 4) + b (2 4) \tau + d (2 4 + \tau) ] \quad \tau = 1, 2, \dots
$$

It is important to synchronize the 12 unique seasonal increments to the months following the most current month, $t = 24$ . For example, if month $t = 24$ is March, then arrange for the seasonal increments of the subsequent months to begin with April, and so forth.

# 5.6 Initialize With 12-Months of Demand History

When 12 months of demand history are available, $[x(1),\dots,x(12)]$ , the seasonal additive model can be initialized as described below:

$$
X 1 = [ x (1) + \dots + x (1 2) ] / 1 2 = a v e r a g e d e m a n d f o r y e a r 1
$$

$$
a ^ {\prime} (1 2) = X 1 = \text {e s t i m a t e}
$$

$$
b ^ {\prime} (1 2) = 0. 0 = \text {e s t i m a t e o f s l o p e a t m o n t h} t = 1 2
$$

$$
\begin{array}{l} \mathrm {d} (t + 1 2) = [ \mathrm {x} (t) - \mathrm {X} 1 ] \quad \text {f o r} t = 1 \text {t o} 1 2 \\ = \text {e s t i m a t e} \\ \end{array}
$$

# 5.7 Revision Forecasts

After the initialize stage passes, the forecasts coefficients are revised each month with the arrival of a new demand entry, $\mathrm{x(t)}$ . The revision steps for the three forecast coefficients are listed below:

$$
\begin{array}{l} a (t) = \alpha [ x (t) - d (t) ] + (1 - \alpha) [ a (t - 1) + b (t - 1) ] \\ \mathrm {b} (\mathrm {t}) = \beta [ \mathrm {a} (\mathrm {t}) - \mathrm {a} (\mathrm {t} - 1) ] + (1 - \beta) [ \mathrm {b} (\mathrm {t} - 1) ] \\ \mathrm {d} (t + 1 2) = \gamma [ \mathrm {x} (t) - \mathrm {a} (t) ] + (1 - \gamma) [ \mathrm {d} (t) ] \\ \end{array}
$$

Upon the revision, the new forecast as of time $t$ for the $\tau$ -th future month becomes the following:

$$
f (\tau) = [ a (t) + b (t) \tau + d (t + \tau) ] \quad \tau = 1, 2, \dots
$$

# Summary

The seasonal multiplicative model has components for the trend and monthly seasonal ratios. The model is run with two stages, the initial stage and the revision stage. This chapter shows how the initial stage estimates the fourteen model coefficients using the most recent months of demand history. Three parameters are used in the process, one to smooth the level, another to smooth the slope, and a third to smooth the seasonal ratios. Upon completing the initial stage, the initial forecasts can be generated. The chapter also shows how to compute an estimate of the standard deviation of the 1-month forecast error. Subsequent to the initial stage, the revision stage is run after each new monthly demand entry becomes available. With each new month, when a new demand entry becomes available, the model coefficients are revised by smoothing, and refreshed forecasts are generated. A brief review of the seasonal additive model is also presented.

# Chapter 6 Promotion Forecasts

# 6.1 Introduction

Promotions come in various ways: price reduction, buy one get one free, zero interest, no money down, and so on. They often occur when a supplier or a stock location offers a price incentive of some sort to the customers to buy now with enticements for purchases more often or in larger quantities. The promotion typically has a start-date and end-date, and the demand during these days is relatively higher than the normal non-promo days. This situation causes wild fluctuations in the demand history and upsets the forecasting model in use. The standard deviation increases and the forecast coefficients swing out of normal control. Special adjustments are needed in the forecast models to overcome the fluctuations. Two forecast models are described here to accommodate the promotion activity: the promotion horizontal model and the promotion trend model. Both of the models involve two stages: the initial stage and the revision stage. The initial stage is the first estimates of the coefficients of the model. This stage requires N history months of demands and promotion measures. The coefficients of the model are estimated using regression methods where equal weight is given to each of the history months. The revision stage is used for the months after the initial stage where the coefficients are revised every month with each current month's data using the smoothing method. Estimates of the standard deviation and the coefficient of variation are computed for each of the two stages.

# 6.2 Promotion Horizontal Model

The promotion horizontal model is based on the most recent N months of demand and promotion history. The demands are denoted as $\mathrm{x(t)}$ and the promotions are $\mathfrak{p}(\mathfrak{t})$ for $t = 1$ to $\mathbf{N}$ , where $t = 1$ is the oldest month and $t = \mathbf{N}$ is the most current month. The model is of the following form:

$$
\mathrm {f (t) = a + c p (t)}
$$

where $\mathrm{f(t)}$ is the fitted value at history month $t$ , and $\mathfrak{p}(\mathfrak{t})$ is the corresponding promotion measure at $t$ . The promotion, $\mathfrak{p}(t)$ , could be a measure of the portion of month $t$ that is active with a promotion. The two coefficients are (a, c), where a, is the estimate of the level, and c is the promo coefficient.

To apply, the model requires two stages, initialize and revision as described below. The initialize stage uses regression to estimate the coefficients of the model, and the revision stage uses smoothing.

# 6.3 Initialize Stage

The initialize first stage requires some history data for the part. The data comes from the most recent N months of demand and promotion history. The history months are $t = 1, \dots, N$ . The demand history is $x(1), \dots, x(N)$ , and the promotion history is $p(1), \dots, p(N)$ . Regression analysis is used to estimate the coefficients for the level and promotion coefficients.

Using the least squares method in the typical way, the following two equations are generated to obtain the two unknown coefficients, (a, c).

$$
\begin{array}{l} \sum x = (N) a + \left(\sum p\right) c \\ \sum \mathrm {x p} = (\sum \mathrm {p}) \mathrm {a} + (\sum \mathrm {p} ^ {2}) \mathrm {c} \\ \end{array}
$$

For notational ease, the following summation substitutions are used:

$$
\begin{array}{l} \sum_ {t = 1} ^ {N} x (t) = \sum x \\ \sum_ {t = 1} ^ {N} p (t) = \sum p \\ \sum_ {t = 1} ^ {N} x (t) p (t) = \sum \mathrm {x p} \\ \sum_ {t = 1} ^ {N} p (t) ^ {2} = \sum \mathrm {p} ^ {2} \\ \end{array}
$$

Below shows how to compute the coefficients.

$$
\begin{array}{l} \mathrm {c} ^ {\prime} = \left[ \sum \mathrm {x} \sum \mathrm {p} - \sum \mathrm {x p N} \right] / \left[ \left(\sum \mathrm {p}\right) ^ {2} - \sum \mathrm {p} ^ {2} \mathrm {N} \right] \\ a ^ {\prime} = \left[ \sum x - c ^ {\prime} \sum p \right] / N \\ \end{array}
$$

Table 6.1 Example 6.1 data: history month t, demand history x(t), and promotion p(t)   

<table><tr><td>t</td><td>x(t)</td><td>p(t)</td></tr><tr><td>1</td><td>9</td><td>0</td></tr><tr><td>2</td><td>13</td><td>0</td></tr><tr><td>3</td><td>38</td><td>0.4</td></tr><tr><td>4</td><td>18</td><td>0.2</td></tr><tr><td>5</td><td>6</td><td>0</td></tr><tr><td>6</td><td>7</td><td>0</td></tr><tr><td>7</td><td>13</td><td>0</td></tr><tr><td>8</td><td>26</td><td>0.5</td></tr><tr><td>9</td><td>6</td><td>0</td></tr><tr><td>10</td><td>10</td><td>0</td></tr><tr><td>11</td><td>4</td><td>0</td></tr><tr><td>12</td><td>8</td><td>0</td></tr></table>

The fitted values over the history months are calculated as follows:

$$
f (t) = a ^ {\prime} + c ^ {\prime} p (t) \quad t = 1 \text {t o N}
$$

For each of the history months, the residual errors, $\mathrm{e(t)}$ , are obtained in the following way:

$$
\mathrm {e} (t) = \mathrm {x} (t) - \mathrm {f} (t)
$$

The residual errors are used to estimate the standard deviation of the one month forecast error, denoted as $s$ . To apply, the sum of the square of the residual errors is tallied, $\sum e(t)^2$ , and is used as follows:

$$
s = \sqrt {\sum e (t) ^ {2} / (N - 2)}
$$

Finally, the coefficient of variation, cov, for the forecast error is computed using the estimate of the standard deviation, s, and the level, a', as follows:

$$
\operatorname {c o v} = \mathrm {s} / \mathrm {a} ^ {\prime}
$$

Example 6.1 Suppose the forecaster wishes to apply the promotion horizontal regression model for an item with $N = 12$ months of past history of demands and promotion as listed in Table 6.1.

Table 6.2 Worksheet for history months t, with demand history $\mathrm{x}\left( \mathrm{t}\right)$ ,promotion p(t),fit f(t),and residual error e(t)   

<table><tr><td>t</td><td>x(t)</td><td>p(t)</td><td>f(t)</td><td>e(t)</td></tr><tr><td>1</td><td>9</td><td>0</td><td>8.62</td><td>0.38</td></tr><tr><td>2</td><td>13</td><td>0</td><td>8.62</td><td>4.38</td></tr><tr><td>3</td><td>38</td><td>0.4</td><td>28.46</td><td>9.54</td></tr><tr><td>4</td><td>18</td><td>0.2</td><td>18.54</td><td>-0.54</td></tr><tr><td>5</td><td>6</td><td>0</td><td>8.62</td><td>-2.62</td></tr><tr><td>6</td><td>7</td><td>0</td><td>8.62</td><td>-1.62</td></tr><tr><td>7</td><td>13</td><td>0</td><td>8.62</td><td>4.38</td></tr><tr><td>8</td><td>26</td><td>0.5</td><td>33.42</td><td>-7.42</td></tr><tr><td>9</td><td>6</td><td>0</td><td>8.62</td><td>-2.62</td></tr><tr><td>10</td><td>10</td><td>0</td><td>8.62</td><td>1.38</td></tr><tr><td>11</td><td>4</td><td>0</td><td>8.62</td><td>-4.62</td></tr><tr><td>12</td><td>8</td><td>0</td><td>8.62</td><td>-0.62</td></tr></table>

The summations described above are the following:

$$
\begin{array}{l} \sum x = 1 5 8 \\ \Sigma \mathrm {p} = 1. 1 \\ \sum \mathrm {x p} = 3 1. 8 \\ \Sigma \mathrm {p} ^ {2} = 0. 4 5 \\ \end{array}
$$

The coefficient estimates are listed below:

$$
\begin{array}{l} a ^ {\prime} = 8. 6 2 1 \\ c = 4 9. 5 9 \\ \end{array}
$$

and thereby, the fitted values for the history months are obtained by the relation,

$$
f (t) = 8. 6 2 1 + 4 9. 5 9 p (t) \quad t = 1 \text {t o} 1 2
$$

Table 6.2 lists the fitted values, $f(t)$ , and the corresponding residual errors, $e(t)$ , for the history months. The residual error for month $t$ is obtained by: $e(t) = x(t) - f(t)$ . Figure 6.1 depicts the relation between the demand history and the associated fitted value for the history months, $t = 1$ to 12.

# 6.5 Forecasts

![](images/2c88b9fd7a6a91c599df0079829d500da391dcad35a9d2938cde89379b9342b0.jpg)  
Fig. 6.1 Plot of demand history $\mathbf{x}(\mathfrak{t})$ , and fit $\mathrm{f(t)}$ for $t = 1$ to 12

# 6.4 Standard Deviation and Cov

Continuing with Example 6.1, the sum of square of errors over the twelve history months is computed as:

$$
\sum \mathrm {e} (\mathrm {t}) ^ {2} = 2 2 4. 8 6
$$

So now, the standard deviation can be estimated as described earlier. This is,

$$
s = \sqrt {2 2 4 . 8 6 / 1 0} = 4. 7 4 2
$$

The associated coefficient of variation becomes,

$$
\mathrm {c o v} = \mathrm {s} / \mathrm {a} ^ {\prime} = 4. 7 4 2 / 8. 6 2 1 = 0. 5 5 0
$$

# 6.5 Forecasts

The forecasts for the future months can now be generated. To apply, the analyst must have some projection of the promotion activity for the future months. In this model, $\mathrm{p}(\tau)$ represents the portion of future month $\tau$ where a promo is to be held. Applying this data, the forecast is the following:

$$
f (\tau) = a ^ {\prime} + c ^ {\prime} p (\tau) \quad \tau = 1, 2, \dots
$$

Using the estimates of the coefficients from Example 6.1, the forecast model is,

$$
f (\tau) = 8. 6 2 1 + 4 9. 5 9 p (\tau) \quad \tau = 1, 2, \dots
$$

Example 6.2 Applying the results from Example 6.1, suppose forecasts are needed for future months $\tau = 1, 2, 3$ , where no promotion is planned for months 1 and 2, but a full month of promotion is set for month 3. Thereby, $p(1) = p(2) = 0$ and $p(3) = 1$ . The forecasts for the first three future months become:

$$
\begin{array}{l} \mathrm {f (1)} = 8. 6 2 1 \\ \mathrm {f} (2) = 8. 6 2 1 \\ f (3) = 8. 6 2 1 + 4 9. 5 9 \times 1 = 5 8. 5 2 \\ \end{array}
$$

# 6.6 Revision Stage

The second stage of the forecast model uses smoothing to estimate the coefficients of the model and pertains to the months beyond the initialize months. To apply this method, a smoothing parameter, $\alpha$ , is needed. At current month $t$ , the data available to revise the coefficients are listed below:

$$
\begin{array}{l} \mathbf {t} = \mathrm {h i s t o r y m o n t h} \\ \mathrm {x} (t) = \text {d e m a n d a t m o n t h} t \\ p (t) = p r o m o t i o n a t m o n t h t \\ a (t - 1) = \text {e s t i m a t e} (t - 1) \\ c (t - 1) = \text {e s t i m a t e} (t - 1) \\ \alpha = \text {s m o o t h i n g p a r a m e t e r} \\ \end{array}
$$

Using the above data, the revise equations for the level, $\mathbf{a}(\mathbf{t})$ , and for the promo, $\mathbf{c}(\mathbf{t})$ , coefficients are the following:

$$
\begin{array}{l} \mathrm {a} (t) = \alpha [ \mathrm {x} (t) - \mathrm {c} (t - 1) \mathrm {p} (t) ] + (1 - \alpha) \mathrm {a} (t - 1) \\ i f \mathrm {p} (t) = 0, \operatorname {s e t} \mathrm {c} (t) = \mathrm {c} (t - 1), \text {e l s e}, \\ c (t) = \alpha \left[ \left(x (t) - a (t)\right) / p (t) \right] + (1 - \alpha) c (t - 1) \\ \end{array}
$$

# 6.7 Unbiased Estimates

The expected values of the above two equations are listed below.

$$
\begin{array}{l} \mathrm {E} [ \mathrm {a} (\mathrm {t}) ] = \alpha [ \mathrm {a} + \mathrm {c} \times \mathrm {p} (\mathrm {t}) - \mathrm {c} \times \mathrm {p} (\mathrm {t}) ] + (1 - \alpha) \mathrm {a} = \mathrm {a} \\ \operatorname {E} \left[ c (t) \right] = \alpha \left[ \left(a + c \times p (t) - a\right) / p (t) \right] + (1 - \alpha) c = c \\ \end{array}
$$

Note where the expected value of $\mathrm{a(t)}$ is a (the true level), and for $\mathbf{c}(\mathbf{t})$ it is c (the true promo coefficient). This verifies that the revise equations yield unbiased estimators.

# 6.7 Unbiased Estimates

The revised coefficient estimates are then used to project unbiased forecasts for the future monthly demands.

Example 6.3 Continuing with Examples 6.1 and 6.2, suppose at the first future month, $t = 13$ , the new demand entry is $x(13) = 8$ and there is no promotion. Hence, $p(13) = 0$ . In the example, the smoothing parameter is set as $\alpha = 0.10$ . The revised coefficients and related computations are listed below:

$$
\begin{array}{l} \mathrm {a} (1 3) = 0. 1 [ 8 - 0 \times 4 9. 5 9 ] + 0. 9 [ 8. 6 2 1 ] = 8. 5 5 8 \\ c (1 3) = 4 9. 5 9 \\ \mathrm {e} (1 3) = [ \mathrm {x} (1 3) - \mathrm {f} (1 3) ] = [ 8 - 8. 6 2 1 ] = - 0. 6 2 1 \\ s (1 3) = \left\{0. 1 [ - 0. 6 2 1 ] ^ {2} + 0. 9 [ 4. 7 4 2 ^ {2} ] \right\} ^ {0. 5} = 4. 5 0 1 \\ \operatorname {c o v} (1 3) = \mathrm {s} (1 3) / \mathrm {a} (1 3) = 4. 5 0 1 / 8. 5 5 8 = 0. 5 2 6 \\ \end{array}
$$

Continuing with the example, assume at month $t = 14$ , the demand is $x(14) = 2$ and the promotion is $p(14) = 0$ . Thereby, the revised coefficients are:

$$
\begin{array}{l} a (1 4) = 0. 1 [ 2 - 0 \times 4 9. 5 9 ] + 0. 9 [ 8. 5 5 8 ] = 7. 9 0 2 \\ c (1 4) = 4 9. 5 9 \\ \end{array}
$$

Going further at month $t = 15$ , suppose the demand is $x(15) = 67$ , and the month had a full promotion, whereby, $p(14) = 1.0$ . The revised estimates of the coefficients are the following;

$$
\begin{array}{l} a (1 5) = 0. 1 [ 6 7 - 1 \times 4 9. 5 9 ] + 0. 9 [ 7. 9 0 2 ] = 8. 8 5 3 \\ c (1 5) = 0. 1 \left[ (6 7 - 8. 8 5 3) / 1. 0 \right] + 0. 9 [ 4 9. 5 9 4 ] = 5 0. 4 5 0 \\ \end{array}
$$

The example continues for months $t = 13$ to 24, with the associated demand, $x(t)$ , and promo, $p(t)$ , entries for each month listed in Table 6.3. The table also shows how the coefficients (a, c) and fitted values, $f(t)$ , would change as each month passes.

With each new month $t$ , the computations described above are carried and the revised coefficients $a(t)$ and $c(t)$ become available. Hence, the forecasts for the future months, $\tau$ , become the following;

$$
\mathrm {f} (\tau) = \mathrm {a} (t) + \mathrm {c} (t) \mathrm {p} (\tau) \quad \tau = 1, 2, \dots
$$

At $t = 24$ , the forecast for future month $\tau$ is the following:

$$
f (\tau) = 8. 4 8 1 + 4 9. 4 7 4 p (\tau) \quad \tau = 1, 2, \dots
$$

Table 6.3 Worksheet showing the demands $\mathrm{x}\left( \mathrm{t}\right)$ ,and promotions $\mathrm{p}\left( \mathrm{t}\right)$ ,for months $\mathrm{t} = {13}$ to 24,and the corresponding estimates of the level a(t),the promo coefficient c(t),and the fitted value $f\left( t\right)$   

<table><tr><td>t</td><td>x(t)</td><td>p(t)</td><td>a(t)</td><td>c(t)</td><td>f(t)</td></tr><tr><td>13</td><td>8</td><td>0</td><td>8.558</td><td>49.594</td><td>8.56</td></tr><tr><td>14</td><td>2</td><td>0</td><td>7.902</td><td>49.594</td><td>7.90</td></tr><tr><td>15</td><td>67</td><td>1</td><td>8.852</td><td>50.449</td><td>59.30</td></tr><tr><td>16</td><td>9</td><td>0</td><td>8.867</td><td>50.449</td><td>8.87</td></tr><tr><td>17</td><td>13</td><td>0</td><td>9.280</td><td>50.449</td><td>9.28</td></tr><tr><td>18</td><td>11</td><td>0</td><td>9.452</td><td>50.449</td><td>9.45</td></tr><tr><td>19</td><td>8</td><td>0</td><td>9.307</td><td>50.449</td><td>9.31</td></tr><tr><td>20</td><td>41</td><td>0.8</td><td>8.440</td><td>49.474</td><td>48.02</td></tr><tr><td>21</td><td>8</td><td>0</td><td>8.396</td><td>49.474</td><td>8.40</td></tr><tr><td>22</td><td>10</td><td>0</td><td>8.557</td><td>49.474</td><td>8.56</td></tr><tr><td>23</td><td>5</td><td>0</td><td>8.201</td><td>49.474</td><td>8.20</td></tr><tr><td>24</td><td>11</td><td>0</td><td>8.481</td><td>49.474</td><td>8.48</td></tr></table>

Assume now where forecasts are needed for each of the subsequent three months. Suppose also where marketing is planning no promo in future months $\tau = 1$ and 2, but a $40\%$ promotion in future month $\tau = 3$ . Thereby, $\mathrm{p}(1) = \mathrm{p}(2) = 0$ and $\mathrm{p}(3) = 0.4$ , and the associated forecasts are the following:

$$
\begin{array}{l} f (1) = 8. 4 8 \\ f (2) = 8. 4 8 \\ \mathrm {f} (3) = 8. 4 8 + 4 9. 4 7 (0. 4) = 2 8. 2 7 \\ \end{array}
$$

Figure 6.2 compares the total demand history, $\mathrm{x(t)}$ , for the initialize months, with $t = 1$ to 12 on the left-hand-side, and with the revised months, $t = 13$ to 24 on the right-hand-side. The associated fitted values, $\mathrm{f(t)}$ , are also shown.

# 6.8 Promotion Trend Model

Promotion forecasting is now extended to include a trend factor, and is here called the promotion trend model. The model pertains to demands that are trending, either up or down, in the long run, and has periodic promotion activities. The model is of the following form,

$$
\mathrm {f} (\mathrm {t}) = \mathrm {a} + \mathrm {b t} + \mathrm {c p} (\mathrm {t})
$$

where $\mathrm{f(t)}$ is the fitted value for history month $t$ , and $\mathrm{p(t)}$ is the promotion measure at month $t$ . The coefficients are (a, b, c) where a is the intercept at $t = 0$ , b is the slope

![](images/6f9792e9fa20a094a359f45ec90382daa6c5b4348eae635f17c115db06752228.jpg)  
Fig. 6.2 Depiction of the demands (x) and the fitted values (f) for the12 history months $(t = 1$ to 12), and for the subsequent 12 revised months $(t = 13$ to 24)

coefficient, and $c$ is the promo coefficient. As in the horizontal model, $p(t)$ could be the portion of the month that contains promotion activity. As before, the model has two stages, initialize and revision. The initialize stage uses regression to estimate the coefficients, and the revision stage uses smoothing.

# 6.9 Initialize Stage

The initialize first stage requires some history data for the part. The data comes from the most recent N months of demand and promotion history. The history months are $t = 1, \dots, N$ . The demand history is $x(1), \dots, x(N)$ , and the promotion history is $p(1), \dots, p(N)$ . Regression analysis is used to estimate the coefficients for the level and promotion.

Using the least squares method in the typical way, the following three equations are generated to obtain the three unknowns, (a, b, c).

$$
\Sigma \mathrm {x} = (\mathrm {N}) \mathrm {a} + (\Sigma \mathrm {t}) \mathrm {b} + (\Sigma \mathrm {p}) \mathrm {c}
$$

$$
\Sigma \mathrm {x t} = (\Sigma \mathrm {t}) \mathrm {a} + (\Sigma \mathrm {t} ^ {2}) \mathrm {b} + (\Sigma \mathrm {p t}) \mathrm {c}
$$

$$
\Sigma \mathrm {x p} = (\Sigma \mathrm {p}) \mathrm {a} + (\Sigma \mathrm {p t}) \mathrm {b} + (\Sigma \mathrm {p} ^ {2}) \mathrm {c}
$$

For notational ease, the summations listed above are abbreviations as shown below:

$$
\sum_ {t = 1} ^ {N} x (t) = \sum x
$$

$$
\sum_ {t = 1} ^ {N} x (t) p (t) = \sum \mathrm {x p}
$$

$$
\sum_ {t = 1} ^ {N} x (t) t = \sum x t
$$

$$
\sum_ {t = 1} ^ {N} p (t) t = \Sigma \mathrm {p t}
$$

$$
\sum_ {t = 1} ^ {N} t = \sum t
$$

$$
\begin{array}{l} \sum_ {t = 1} ^ {N} t ^ {2} = \sum t ^ {2} \\ \sum_ {t = 1} ^ {N} p (t) = \Sigma \mathrm {p} \\ \sum_ {t = 1} ^ {N} p (t) ^ {2} = \sum \mathrm {p} ^ {2} \\ \end{array}
$$

Matrix methods are used to solve for the three coefficients. The matrix relation is the following:

$$
\left[ \begin{array}{l} \sum \mathrm {x} \\ \sum \mathrm {x t} \\ \sum \mathrm {x p} \end{array} \right] = \left[ \begin{array}{c c c} N & \sum \mathrm {t} & \sum \mathrm {p} \\ \sum \mathrm {t} & \sum \mathrm {t} ^ {2} & \sum \mathrm {p t} \\ \sum \mathrm {p} & \sum \mathrm {p t} & \sum \mathrm {p} ^ {2} \end{array} \right] \left[ \begin{array}{l} a \\ b \\ c \end{array} \right]
$$

The following notation is now helpful. The vector, $X$ becomes,

$$
\mathrm {X} = \left[ \begin{array}{c} \sum \mathrm {x} \\ \sum \mathrm {x t} \\ \sum \mathrm {x p} \end{array} \right]
$$

Matrix T is,

$$
\mathrm {T} = \left[ \begin{array}{c c c} N & \sum \mathrm {t} & \sum \mathrm {p} \\ \sum \mathrm {t} & \sum \mathrm {t} ^ {2} & \sum \mathrm {p t} \\ \sum \mathrm {p} & \sum \mathrm {p t} & \sum \mathrm {p} ^ {2} \end{array} \right]
$$

and vector A is,

$$
\mathbf {A} = \left[ \begin{array}{l} a \\ b \\ c \end{array} \right]
$$

Using the notation above, the relation below becomes,

$$
\mathrm {X} = \mathrm {T A}
$$

and the solution of the vector $A$ is found as follows:

$$
\mathrm {A} = \mathrm {T} ^ {- 1} \mathrm {X}
$$

where $\mathrm{T}^{-1}$ is the inverse of the matrix T. For notational ease, the coefficient estimates are listed as: a', b', c'.

The fitted value for history month t is the following:

$$
f (t) = a ^ {\prime} + b ^ {\prime} t + c ^ {\prime} p (t) \quad t = 1 \text {t o T}
$$

and the associated residual error is computed as below:

$$
\mathrm {e} (t) = \mathrm {x} (t) - \mathrm {f} (t)
$$

# 6.10 Standard Deviation and Cov

To compute an estimate of the standard deviation of the forecast error, denoted as $s$ , the sum of square of errors, $\sum e(t)^2$ , is needed. With $N$ months of history, the estimate of the standard deviation is computed as below:

$$
s = \sqrt {\sum e (t) ^ {2} / (N - 3)}
$$

Finally, the coefficient of variation uses the standard deviation, s, and the level, a, as follows:

$$
\operatorname {c o v} = \mathrm {s} / \mathrm {a} ^ {\prime}
$$

Example 6.4 Assume the trend promotion forecast model will be used for a part with 12 months of past history of demands, $\mathrm{x(t)}$ , and promotion, $\mathrm{p(t)}$ , as listed in Table 6.4.

To begin, the summations needed to estimate the coefficients, (a, b, c), are tallied and the summations are below:

$$
\begin{array}{l} \sum x = 2 0 8 \\ \sum \mathrm {x p} = 3 5. 6 \\ \sum x t = 1 3 8 4 \\ \sum \mathrm {p t} = 6 \\ \sum t = 7 8 \\ \sum \mathrm {t} ^ {2} = 6 5 0 \\ \sum p = 1. 1 \\ \sum \mathrm {p} ^ {2} = 0. 4 5 \\ \end{array}
$$

Applying the matrix notation given earlier, X and T become,

$$
\mathrm {X} = \left[ \begin{array}{l} 2 0 8 \\ 1 3 8 4 \\ 3 5. 6 \end{array} \right]
$$

Table 6.4 Data for Example 6.4: history months t, demand history x(t), and promotion history p(t) for t=1 to 12   

<table><tr><td>t</td><td>x(t)</td><td>p(t)</td></tr><tr><td>1</td><td>8</td><td>0</td></tr><tr><td>2</td><td>10</td><td>0</td></tr><tr><td>3</td><td>38</td><td>0.4</td></tr><tr><td>4</td><td>22</td><td>0.2</td></tr><tr><td>5</td><td>11</td><td>0</td></tr><tr><td>6</td><td>10</td><td>0</td></tr><tr><td>7</td><td>10</td><td>0</td></tr><tr><td>8</td><td>32</td><td>0.5</td></tr><tr><td>9</td><td>15</td><td>0</td></tr><tr><td>10</td><td>10</td><td>0</td></tr><tr><td>11</td><td>26</td><td>0</td></tr><tr><td>12</td><td>16</td><td>0</td></tr></table>

$$
\mathrm {T} = \left[ \begin{array}{c c c} 1 2 & 7 8 & 1. 1 \\ 7 8 & 6 5 0 & 6 \\ 1. 1 & 6 & 0. 4 5 \end{array} \right]
$$

The inverse of the matrix $\mathrm{T}$ is the following;

$$
\mathrm {T} ^ {- 1} = \left[ \begin{array}{c c c} 0. 4 4 0 & - 0. 0 4 9 & - 0. 4 2 3 \\ - 0. 0 4 9 & 0. 0 0 7 & 0. 0 2 4 \\ - 0. 4 2 3 & 0. 0 2 4 & 2. 9 4 2 \end{array} \right]
$$

Solving for the vector $\mathrm{A}$ , the coefficient estimates become,

$$
a ^ {\prime} = 8. 6 4 5
$$

$$
b ^ {\prime} = 0. 3 5 0
$$

$$
\mathrm {c} ^ {\prime} = 4 9. 9 6 7
$$

Note, a` is an estimate for $t = 0$ , and b` and c` are estimates for any month $t = 1$ to 12. Using the notation a(t), b(t) and c(t) as the estimates for month $t$ ,

$$
a (0) = a ^ {\prime}, b (1 2) = b ^ {\prime}, c (1 2) = c ^ {\prime}, a n d a (1 2) = a (0) + 1 2 b ^ {\prime}
$$

So now, $a(12)$ is the estimate of the level at the most current month.

Table 6.5 Worksheet with history months t, demand history x(t), promotion history p(t), fit f(t), and residual error e(t) for months t=1 to 12   

<table><tr><td>t</td><td>x(t)</td><td>p(t)</td><td>f(t)</td><td>e(t)</td></tr><tr><td>1</td><td>8</td><td>0</td><td>9.00</td><td>-0.99</td></tr><tr><td>2</td><td>10</td><td>0</td><td>9.35</td><td>0.66</td></tr><tr><td>3</td><td>38</td><td>0.4</td><td>29.68</td><td>8.32</td></tr><tr><td>4</td><td>22</td><td>0.2</td><td>20.04</td><td>1.96</td></tr><tr><td>5</td><td>11</td><td>0</td><td>10.40</td><td>0.61</td></tr><tr><td>6</td><td>10</td><td>0</td><td>10.75</td><td>-0.74</td></tr><tr><td>7</td><td>10</td><td>0</td><td>11.10</td><td>-1.10</td></tr><tr><td>8</td><td>32</td><td>0.5</td><td>36.43</td><td>-4.43</td></tr><tr><td>9</td><td>15</td><td>0</td><td>11.80</td><td>3.21</td></tr><tr><td>10</td><td>10</td><td>0</td><td>12.15</td><td>-2.15</td></tr><tr><td>11</td><td>26</td><td>0</td><td>12.50</td><td>13.51</td></tr><tr><td>12</td><td>16</td><td>0</td><td>12.85</td><td>3.16</td></tr></table>

Using the matrix solution results, the coefficients are the following:

$$
\begin{array}{l} \mathrm {a} (1 2) = \left(\mathrm {a} ^ {\prime} + 1 2 \mathrm {b} ^ {\prime}\right) = (8. 6 4 5 + 1 2 \times 0. 3 5 0) = 1 2. 8 4 5 \\ \mathrm {b} (1 2) = \mathrm {b} ^ {\prime} = 0. 3 5 0 \\ \mathrm {c} (1 2) = \mathrm {c} ^ {\prime} = 4 9. 9 6 7 \\ \end{array}
$$

The fitted values for months $t = 1$ to 12 are obtained by the relation below:

$$
f (t) = 8. 6 4 5 + 0. 3 5 0 t + 4 9. 9 6 7 p (t) \quad t = 1 \text {t o} 1 2
$$

The associated residual errors, $\mathrm{e(t) = x(t) - f(t)}$ , can now be calculated for each of the history months. Table 6.5 is a list of the 12 history months, along with their demands, promotions, fitted values and residual errors.

The sum of squares of the $N = 12$ residuals errors is tallied and becomes,

$$
\sum \mathrm {e} (\mathrm {t}) ^ {2} = 3 0 3. 3 8 6
$$

This sum is needed to compute the estimate of the standard deviation, $s$ , of the residual errors. The result is below:

$$
s = \sqrt {3 0 3 . 3 8 6 / 9} = 5. 8 0 6
$$

So now, the coefficient of variation is calculated as follows:

$$
\operatorname {c o v} = \mathrm {s} / \mathrm {a} (1 2) = 5. 8 0 6 / 1 2. 8 5 = 0. 4 5 2
$$

Figure 6.3 gives a comparison of the demands, $\mathbf{x}(t)$ , and the fitted values, $f(t)$ , for the history months, $t = 1$ to 13.

![](images/6af47e076fc78712df3c4f692b37e8057a91839cb329c0c633f9b039218f303f.jpg)  
Fig. 6.3 Plot of history months $t = 1$ to 12, demands $x(t)$ , and fit $f(t)$

# 6.11 Revision Stage

The second stage of the promotion trend model is run beyond the initial 12 history months. This is when new demand and promotion data become available. With each new month of data, smoothing is used to revise the forecast coefficients, a, b and c. To apply this method, a smoothing parameter, $\alpha$ , is needed. At current month t, the data available to revise the coefficients are listed below:

$\mathbf{t} =$ current month

$\mathbf{x}(t) =$ demand at month t

$a(t - 1) =$ estimate of the level at prior month $t - 1$

$b(t - 1) =$ estimate of the slope at prior month t-1

$c(t - 1) =$ estimate of the promo coefficient at month t-1

$\alpha =$ smooth parameter

Using the above data, smoothing is used as shown below:

$$
\mathrm {a} (t) = \alpha [ \mathrm {x} (t) - \mathrm {c} (t - 1) \mathrm {p} (t) ] + (1 - \alpha) [ \mathrm {a} (t - 1) + \mathrm {b} (t - 1) ]
$$

$$
\mathrm {b} (t) = \alpha [ \mathrm {a} (t) - \mathrm {a} (t - 1) ] + (1 - \alpha) \mathrm {b} (t - 1)
$$

$$
i f \mathrm {p} (t) = 0, \mathrm {c} (t) = \mathrm {c} (t - 1), \text {e l s e},
$$

$$
c (t) = \alpha [ (x (t) - a (t)) / p (t) ] + (1 - \alpha) c (t - 1)
$$

# 6.12 Unbiased Estimates

The expected values of the three coefficients, $a(t)$ , $b(t)$ and $c(t)$ are obtained below.

$$
\operatorname {E} [ \mathrm {a} (t) ] = \alpha [ \mathrm {a} + \mathrm {c} \times \mathrm {p} (t) - \mathrm {c} \times \mathrm {p} (t) ] + (1 - \alpha) [ \mathrm {a} - \mathrm {b} + \mathrm {b} ] = \mathrm {a}
$$

$$
\operatorname {E} [ \mathrm {b} (\mathrm {t}) ] = \alpha [ \mathrm {a} - (\mathrm {a} - \mathrm {b}) ] + (1 - \alpha) \mathrm {b} = \mathrm {b}
$$

$$
\mathrm {E} [ \mathrm {c} (\mathrm {t}) ] = \alpha [ (\mathrm {a} + \mathrm {c} \times \mathrm {p} (\mathrm {t}) - \mathrm {a}) / \mathrm {p} (\mathrm {t}) ] + (1 - \alpha) \mathrm {c} = \mathrm {c}
$$

# 6.12 Unbiased Estimates

Note where the expected value of $\mathrm{a(t)}$ is a, (the true level), $\mathrm{b(t)} = \mathrm{b}$ , (the true slope), and for $\mathrm{c(t)}$ , it is c (the true promo coefficient). This verifies that the revise equations yield unbiased estimators. The revised coefficient estimates are then used to project unbiased forecasts of future monthly demands.

Continuing with the Example 6.4, at $t = 12$ , the coefficients are the following:

$$
\mathrm {a} (1 2) = 1 2. 8 4 5
$$

$$
b (1 2) = 0. 3 5 0
$$

$$
\mathrm {c} (1 2) = 4 9. 9 6 7
$$

Example 6.5 Suppose at month $t = 13$ , the demand is $x(13) = 30$ and there is no promotion, $p(13) = 0$ . With this new data, the revise computations are below:

$$
\mathrm {a} (1 3) = 0. 1 \left[ 3 0 - 0 \times 4 9. 9 6 7 9 \right] + 0. 9 \left[ 1 2. 8 4 5 + 0. 3 5 0 \right] = 1 4. 8 7 8
$$

$$
b (1 3) = 0. 1 (1 4. 8 7 8 - 1 2. 8 4 5) + 0. 9 (0. 3 5 0) = 0. 5 1 8
$$

$$
\mathrm {c} (1 3) = 4 9. 9 6 7
$$

$$
f (1 3) = 1 4. 8 7 8 + 0 = 1 4. 8 7 8
$$

The associated residual error, estimate of the standard deviation and the coefficient of variation are computed as follows:

$$
\begin{array}{l} e (1 3) = [ x (1 3) ] - f ^ {\prime} (1 3) ] \\ = [ 3 0 - 1 4. 8 7 8 ] = 1 5. 1 2 2 \\ \end{array}
$$

$$
\begin{array}{l} s (1 3) = [ \alpha \times e (1 3) ^ {2} + (1 - \alpha) \times s (1 2) ^ {2} ] ^ {0. 5} \\ = \left[ 0. 1 (1 5. 1 2 2) ^ {2} + 0. 9 (5. 8 0 6 ^ {2}) \right] ^ {0. 5} = 6. 1 8 1 \\ \end{array}
$$

$$
\operatorname {c o v} (1 3) = \mathrm {s} (1 3) / \mathrm {a} (1 3) = 6. 1 8 / 1 4. 8 7 8 = 0. 4 1 5
$$

Continuing with the example, suppose at month $t = 14$ , the demand is $x(14) = 77$ , and a full promotion takes place, whereby $p(14) = 1.00$ . The revise computations for the coefficients are the following:

$$
\mathrm {a} (1 4) = 0. 1 [ 7 7 - 1. 0 0 \times 4 9. 9 6 8 ] + 0. 9 \times [ 1 4. 8 3 5 ] = 1 6. 5 5
$$

$$
\mathrm {b (t) = 0 . 1 [ 1 6 . 5 5 - 1 4 . 8 3 ] + 0 . 9 \times [ 0 . 5 1 4 ] = 0 . 6 3}
$$

$$
c (1 4) = 0. 1 [ (7 7 - 1 6. 5 5 0) / 1. 0 0 ] + 0. 9 \times [ 4 9. 9 6 7 ] = 5 1. 0 1
$$

Table 6.6 Worksheet showing the months $t = {13}$ to 24,the demands $x\left( t\right)$ ,promotion $p\left( t\right)$ ,and estimates of the level a(t),slope b(t), promo coefficient c(t), and the fit f(t)   

<table><tr><td>t</td><td>x(t)</td><td>p(t)</td><td>a(t)</td><td>b(t)</td><td>c(t)</td><td>f(t)</td></tr><tr><td>13</td><td>30</td><td>0</td><td>14.875</td><td>0.52</td><td>49.97</td><td>14.88</td></tr><tr><td>14</td><td>77</td><td>1</td><td>16.557</td><td>0.63</td><td>51.01</td><td>66.52</td></tr><tr><td>15</td><td>26</td><td>0</td><td>18.072</td><td>0.72</td><td>51.01</td><td>18.07</td></tr><tr><td>16</td><td>12</td><td>0</td><td>18.115</td><td>0.65</td><td>51.01</td><td>18.12</td></tr><tr><td>17</td><td>28</td><td>0</td><td>19.693</td><td>0.75</td><td>51.01</td><td>19.69</td></tr><tr><td>18</td><td>31</td><td>0</td><td>21.496</td><td>0.85</td><td>51.01</td><td>21.50</td></tr><tr><td>19</td><td>21</td><td>0</td><td>22.213</td><td>0.84</td><td>51.01</td><td>22.21</td></tr><tr><td>20</td><td>32</td><td>0</td><td>23.947</td><td>0.93</td><td>51.01</td><td>23.95</td></tr><tr><td>21</td><td>24</td><td>0</td><td>24.788</td><td>0.92</td><td>51.01</td><td>24.79</td></tr><tr><td>22</td><td>34</td><td>0</td><td>26.537</td><td>1.00</td><td>51.01</td><td>26.54</td></tr><tr><td>23</td><td>23</td><td>0</td><td>27.085</td><td>0.96</td><td>51.01</td><td>27.09</td></tr><tr><td>24</td><td>32</td><td>0</td><td>28.438</td><td>1.00</td><td>51.01</td><td>28.44</td></tr></table>

![](images/83748f339e8498f4d7d90f34a1d0e0cdeabf856db1ee68dbf4635aa33879d6fd.jpg)  
Fig. 6.4 Depiction of the history demands $\mathrm{x(t)}$ , and their fit $\mathrm{f(t)}$ , for history months 1 to 12 on the left, and for months 13 to 24 on the right

Table 6.6 is a list of the demands, $\mathrm{x(t)}$ , and promotions, $\mathrm{p(t)}$ , that are assumed for months $t = 13$ to 24. The table also gives the associated estimates of the coefficients, (a, b, c), and the fitted value, $\mathrm{f(t)}$ , for each month $t$ .

Note, during the revise months, the only promotion occurs at $t = 14$ which is for a full month and thereby, $p(14) = 1.00$ .

Figure 6.4 depicts the demands, $\mathrm{x(t)}$ , for the initial stage ( $t = 1$ to 12), and for revision stage ( $t = 13$ to 24), and also shows the corresponding fitted values, $f(t)$ for each of the months.

# Summary

Two promotion forecast models are described: the promotion horizontal model and the promotion trend model. Both have two stages; the initial stage and the revision stage. The initial stage uses N prior months of demand and promotion activities to estimate the coefficients of the model. The revision stage is for the months after the initial stage and uses the current demand and promotion data to update the forecast coefficients. Regression is used in the initial stage, and smoothing in the revision stage. In both situations, the standard deviation estimate and the coefficient of variation are computed.

# Chapter 7 Multi-SKU Forecasts

# 7.1 Introduction

An sku is an abbreviation for the term stock-keeping-unit that identifies an item being in the inventory at a stocking location. Could be a part number, a product number, a style number, so forth. Should a model of a certain tool be in stock at a dealer, it is an sku at that dealer. If the same model is in stock in 1000 dealers, it is an sku in each of the 1000 dealers. It is also an sku at each distribution center that stocks the model. A truck parts dealer typically has 15,000 skus and a truck distribution center may have 100,000 skus. A shoe store in the mall may have 2000 skus in shoes alone, since each style by size and width is a separate sku. Forecasts are needed for each sku (usually monthly) to use in the inventory stocking computations.

When a part is stocked as a service part in an inventory system with five distribution centers (DC), the part is an sku in each of the DC's. Forecasts are needed for each part by location to arrange for the proper stock at each location. A forecast is also needed for the aggregate demands of the part in all locations so economic replenishments of the part from the supplier can be determined.

Consider a style shoe with 36 size and width combinations. Each size and width for the style shoe is an sku. Forecasts are needed for each size and width to be used in the inventory decisions at the distribution centers and at each store. The forecast is typically generated for the style itself, and this forecast is apportioned down to each of the size and width combinations. The same scenario also occurs in clothing, like men's shirts, with different size and widths, and so forth.

This chapter describes two common ways to forecast when multiple skus are of concern in an inventory system, the top-down method and the bottom-up method. Top-down is when the aggregate demand history is used to forecast the demands over the future months. The aggregate forecast is then allocated down to each sku using an sku percent representing its portion of the total demand. This way, the forecasts for the total and for each sku are generated in a systematic manner. The

Table 7.1 Location j demands $\mathrm{x}\left( {\mathrm{j},\mathrm{t}}\right)$ ,and total demand $\mathrm{x}\left( \mathrm{t}\right)$ ,at month t   

<table><tr><td>t</td><td>x(1,t)</td><td>x(2,t)</td><td>x(3,t)</td><td>x(t)</td></tr><tr><td>1</td><td>1</td><td>1</td><td>5</td><td>7</td></tr><tr><td>2</td><td>4</td><td>3</td><td>3</td><td>10</td></tr><tr><td>3</td><td>0</td><td>3</td><td>7</td><td>10</td></tr><tr><td>4</td><td>1</td><td>3</td><td>3</td><td>7</td></tr><tr><td>5</td><td>4</td><td>6</td><td>3</td><td>13</td></tr><tr><td>6</td><td>1</td><td>2</td><td>9</td><td>12</td></tr><tr><td>7</td><td>0</td><td>3</td><td>13</td><td>16</td></tr><tr><td>8</td><td>2</td><td>3</td><td>10</td><td>15</td></tr><tr><td>9</td><td>5</td><td>7</td><td>1</td><td>13</td></tr><tr><td>10</td><td>3</td><td>6</td><td>5</td><td>14</td></tr><tr><td>11</td><td>1</td><td>3</td><td>11</td><td>15</td></tr><tr><td>12</td><td>0</td><td>8</td><td>8</td><td>16</td></tr><tr><td>13</td><td>4</td><td>7</td><td>3</td><td>14</td></tr><tr><td>14</td><td>2</td><td>6</td><td>10</td><td>18</td></tr><tr><td>15</td><td>3</td><td>8</td><td>6</td><td>17</td></tr></table>

bottom-up method is in use when a forecast is generated for each sku and the sum of the sku forecasts is used to determine the forecast for the total.

In both methods, the standard deviation of each forecast is of need for subsequent use in inventory decisions. Methods are shown on how to compute the standard deviations for each sku and for the total when the top-down and bottom-up methods are in use.

Example 7.1 Consider an inventory system with $M = 3$ locations, denoted as: $j = 1, 2, 3$ , where they could represent three distribution centers, or three stores. Assume an item in stock has month 1 demands of one piece each for locations $j = 1$ and $j = 2$ , and five pieces for location $j = 3$ . The notation for demands at location $j$ in month $t$ is denoted as $x(j,t)$ , and the total demand for all three locations is noted as $x(t)$ . Hence, the location demands in month 1 become: $x(1,1) = 1$ , $x(2,1) = 1$ , $x(3,1) = 5$ , and the total demand is $x(1) = 7$ . Table 7.1 lists the location and total demand for each of the first 15 months of history.

# 7.2 SKU Mean and Standard Deviation

In this chapter, the demands of an item at each location $j$ are tallied separately and summed to yield the total demand as described in Example 7.1. In some of the forecasting methods, the known values for an item are the forecast of the total demand, $F$ , the associated standard deviation, $s$ , and also the percent of the total demand, $p$ , that occurs at a particular sku. Of concern here is to use this information to estimate

the forecast and standard deviation for an individual sku. A mathematical derivation of this situation follows.

Below shows how to compute the mean and an estimate of the standard deviation for an individual sku when the known values are the total mean, $\mu$ , and standard deviation, $\sigma$ , for all skus combined. For convenience here, the demand for all skus is denoted as $n$ and the demand for a selected sku is $x$ . Further, $p$ is the probability an arbitrary demand is for the selected sku. This way, with the parameters, $n$ and $p$ , $x$ is almost distributed by the binomial distribution. But in this scenario, $n$ is a random variable itself with mean $\mu$ and variance $\sigma^2$ , and thereby, the binomial does not exactly apply. Below shows how to derive the mean and variance for the sku demand, $x$ , when the data, $(\mu, \sigma, p)$ , is provided.

# 7.3 Derivation of Binomial When $n$ is a Random Variable

Suppose $\mathbf{x}$ is binomial with probability $p$ , and $n$ trials where, the number of trials, is a random variable with mean and variance as below:

$$
\mathrm {E} (\mathrm {n}) = \mu
$$

$$
V (n) = \sigma^ {2}
$$

The mean and variance of $\mathbf{X}$ , labeled as $\mathrm{E}(\mathbf{x})$ and $\mathrm{V}(\mathbf{x})$ are obtained as below. Using conditional probability notation:

$$
\mathrm {E} (\mathrm {x} \mid \mathrm {n}) = \mathrm {n p}
$$

$$
\mathrm {E} (\mathrm {x}) = \mathrm {E} (\mathrm {n}) \mathrm {p} = \mu \mathrm {p}
$$

$$
V (x \mid n) = E \left(x ^ {2} \mid n\right) - E (x \mid n) ^ {2} = n p (1 - p)
$$

$$
\begin{array}{l} \mathrm {E} \left(\mathrm {x} ^ {2} \mid \mathrm {n}\right) = \mathrm {V} (\mathrm {x} \mid \mathrm {n}) + \mathrm {E} (\mathrm {x} \mid \mathrm {n}) ^ {2} = \mathrm {p} (1 - \mathrm {p}) \mathrm {n} + \mathrm {p} ^ {2} \mathrm {n} ^ {2} \\ \mathrm {E} \left(\mathrm {x} ^ {2}\right) = \mathrm {p} (1 - \mathrm {p}) \mathrm {E} (\mathrm {n}) + \mathrm {p} ^ {2} \mathrm {E} \left(\mathrm {n} ^ {2}\right) \\ = p (1 - p) \mu + p ^ {2} \left(\mu^ {2} + \sigma^ {2}\right) \\ \end{array}
$$

$$
V (x) = E \left(x ^ {2}\right) - E (x) ^ {2} = p (1 - p) \mu + p ^ {2} \sigma^ {2}
$$

In summary,

$$
\begin{array}{l} \mathrm {E} (\mathrm {x}) = \mathrm {p} \mu \\ V (x) = p (1 - p) \mu + p ^ {2} \sigma^ {2} \\ \end{array}
$$

# 7.4 Top-Down Forecasting Method

Top-down forecasting involves the following seven steps:

1. Gather N months of demand history for each sku,

$$
\mathrm {x} (\mathrm {j}, \mathrm {t}) \quad \mathrm {j} = 1 \text {t o M a n d} \mathrm {t} = 1 \text {t o N}.
$$

2. Sum the sku demands by month to yield the total monthly demands,

$$
\mathrm {x} (t) = \Sigma \mathrm {x} (\mathrm {j}, t) \qquad \mathrm {j} = 1 \text {t o} \mathrm {M}, t = 1 \text {t o} \mathrm {N}.
$$

3. Using the total monthly demands, generate the forecasts for the future months,

$$
\begin{array}{l l} \mathrm {f} (\tau) & \tau = 1, 2, \end{array}
$$

4. Compute an estimate of the standard deviation of the 1 month ahead forecast error, s.

5. Measure the portion of total demand that applies to sku j,

$$
p (j) = \Sigma x (j, t) / \Sigma x (t) \quad j = 1 \text {t o} M
$$

6. Allocate the total monthly forecasts to each sku,

$$
f (j, \tau) = p (j) f (\tau) \qquad j = 1 \text {t o} M, \tau = 1, 2,
$$

7. Calculate an estimate of the standard deviation for each $\mathbf{su}$

$$
s (j) = [ a \times p (j) (1 - p (j)) + (p (j) \times s) ^ {2} ] ^ {0. 5} \quad j = 1 t o M
$$

where $a$ is the level and $s$ is an estimate of the standard deviation for the total forecast.

# 7.5 Total Demand Forecasts

Continuing with Example 7.1, the first step is to forecast the total demands one month at a time. When the part is new and has only one month of demand history, the trend smoothing model is applied with parameter values $\beta = 0.05$ for the slope, and the smoothing parameter, $\alpha$ , value for the level is as follows:

$$
\alpha = \max  (0. 1 0, 1 / t) \quad t = 1, 2, \dots
$$

Month-1 Forecast In month $t = 1$ , the computations are the following. Note, the prior values of the level and slope, at $t = 0$ , are $a(0) = b(0) = 0.00$ , since the part is new. The total demand for the part is $x(1) = 7$ , and the parameters are $a = \max(0.10, 1/1) = 1.00$ and $\beta = 0.05$ . Thereby, the smoothed values of the level and the slope become:

$$
\begin{array}{l} \mathrm {a} (1) = \alpha \mathrm {x} (1) + (1 - \alpha) [ \mathrm {a} (0) + \mathrm {b} (0) ] \\ = 1. 0 0 \times 7 + (1 - 1. 0 0) \times 0 = 7. 0 0 \\ \end{array}
$$

$$
\begin{array}{l} \mathrm {b} (1) = \beta [ \mathrm {a} (1) - \mathrm {a} (0) ] + (1 - \beta) \mathrm {b} (0) \\ = 0. 0 5 (7. 0 0 - 0. 0 0) + 0. 9 5 \times 0. 0 0 = 0. 3 5 \\ \end{array}
$$

The 1-month ahead forecast becomes:

$$
\begin{array}{l} f (1) = a (1) + b (1) \times 1 \\ = 7. 0 0 + 0. 3 5 \times 1 = 7. 3 5 \\ \end{array}
$$

Since the part is new, the prior standard deviation estimate is $s(0) = 0.00$ and the revised standard deviation becomes,

$$
\begin{array}{l} \mathrm {s} (1) = \left\{\alpha [ \mathrm {x} (1) - \mathrm {a} (0) ] ^ {2} + (1 - \alpha) \mathrm {s} (0) ^ {2} \right\} ^ {0. 5} \\ = \left\{1. 0 0 [ 7. 0 0 - 0. 0 0 ] ^ {2} + 0. 0 0 \times 0 \right\} ^ {0. 5} = 7. 0 0 \\ \end{array}
$$

The coefficient of variation is below:

$$
\begin{array}{l} \operatorname {c o v} (1) = \mathrm {s} (1) / \mathrm {a} (1) \\ = 7. 0 0 / 7. 0 0 = 1. 0 0 \\ \end{array}
$$

These are the values listed in Table 7.1 for the first month $(t = 1)$ of demand history.

Month-2 Forecast Continuing with Example 7,1, the corresponding computations for month $t = 2$ , become: $\alpha = \max(0.10, \frac{1}{2}) = 0.50$ , $\beta = 0.05$ , $x(2) = 10$ , $a(1) = 8.68$ , $b(2) = 0.42$ , $f = 9.09$ , $s(2) = 5.29$ and $\operatorname{cov}(2) = 0.61$ . These values are in Table 7.2 when $t = 2$ .

Month-t Forecast Table 7.2 is a listing of the forecasting results for the total demand for each of the months $t = 1$ to 15.

# 7.6 Location Portion of Demand

Consider month $t = 1$ again where the demands are 1, 1 and 5 for locations 1, 2 and 3, respectively. The portion of demand for each location becomes:

$$
\mathrm {p} (1) = 1 / 7 = 0. 1 4 2
$$

Table 7.2 Worksheet for total forecasts with months t, monthly demands x(t), level a(t), slope b(t), 1 month ahead forecast f(t), standard deviation s(t), and coefficient of variation cov(t)   

<table><tr><td>t</td><td>x(t)</td><td>a(t)</td><td>b(t)</td><td>f(t)</td><td>s(t)</td><td>cov(t)</td></tr><tr><td>1</td><td>7</td><td>7.00</td><td>0.35</td><td>7.35</td><td>7.00</td><td>1.00</td></tr><tr><td>2</td><td>10</td><td>8.68</td><td>0.42</td><td>9.09</td><td>5.29</td><td>0.61</td></tr><tr><td>3</td><td>10</td><td>9.39</td><td>0.43</td><td>9.83</td><td>4.35</td><td>0.46</td></tr><tr><td>4</td><td>7</td><td>9.12</td><td>0.40</td><td>9.52</td><td>4.03</td><td>0.44</td></tr><tr><td>5</td><td>13</td><td>10.21</td><td>0.43</td><td>10.64</td><td>3.92</td><td>0.38</td></tr><tr><td>6</td><td>12</td><td>10.87</td><td>0.44</td><td>11.31</td><td>3.62</td><td>0.33</td></tr><tr><td>7</td><td>16</td><td>11.98</td><td>0.48</td><td>12.46</td><td>3.79</td><td>0.32</td></tr><tr><td>8</td><td>15</td><td>12.77</td><td>0.49</td><td>13.27</td><td>3.66</td><td>0.29</td></tr><tr><td>9</td><td>13</td><td>13.24</td><td>0.49</td><td>13.73</td><td>3.45</td><td>0.26</td></tr><tr><td>10</td><td>14</td><td>13.75</td><td>0.49</td><td>14.25</td><td>3.28</td><td>0.24</td></tr><tr><td>11</td><td>15</td><td>14.32</td><td>0.50</td><td>14.82</td><td>3.12</td><td>0.22</td></tr><tr><td>12</td><td>16</td><td>14.93</td><td>0.50</td><td>15.44</td><td>2.98</td><td>0.20</td></tr><tr><td>13</td><td>14</td><td>15.29</td><td>0.49</td><td>15.79</td><td>2.87</td><td>0.19</td></tr><tr><td>14</td><td>18</td><td>16.01</td><td>0.51</td><td>16.51</td><td>2.81</td><td>0.18</td></tr><tr><td>15</td><td>17</td><td>16.56</td><td>0.51</td><td>17.07</td><td>2.67</td><td>0.16</td></tr></table>

$$
\mathrm {p} (2) = 1 / 7 = 0. 1 4 2
$$

$$
\mathrm {p} (3) = 5 / 7 = 0. 7 1 4
$$

At month $t = 2$ , the cumulative demand for each of the three locations are: 5, 4 and 8 at $j = 1, 2, 3$ , respectively. The cumulative total demand is 17. Hence, the portion of demands for each location becomes:

$$
\mathrm {p} (1) = 5 / 1 7 = 0. 2 9 4
$$

$$
\mathrm {p} (2) = 4 / 1 7 = 0. 2 3 5
$$

$$
\mathrm {p} (2) = 8 / 1 7 = 0. 4 7 1
$$

These are the values at $t = 2$ .

In the same way, the location portion of the total demand by month is calculated as each month passes by. The values for months 1-15 are shown in the Table 7.3.

# 7.7 The Level by Location and Total

The level for the total demand at month $t$ is denoted as $a(t)$ , and the level for location $j$ at $t$ is $a(j, t)$ . In the example, at month $t = 1$ , the level for the total monthly demand was reported as $a(1) = 7.00$ , and the corresponding level for each location $j$ becomes:

Table 7.3 Monthly portion of demand p(j), by location j   

<table><tr><td>t</td><td>p(1)</td><td>p(2)</td><td>p(3)</td></tr><tr><td>1</td><td>0.14</td><td>0.14</td><td>0.71</td></tr><tr><td>2</td><td>0.29</td><td>0.24</td><td>0.47</td></tr><tr><td>3</td><td>0.19</td><td>0.26</td><td>0.56</td></tr><tr><td>4</td><td>0.18</td><td>0.29</td><td>0.53</td></tr><tr><td>5</td><td>0.21</td><td>0.34</td><td>0.45</td></tr><tr><td>6</td><td>0.19</td><td>0.31</td><td>0.51</td></tr><tr><td>7</td><td>0.15</td><td>0.28</td><td>0.57</td></tr><tr><td>8</td><td>0.14</td><td>0.27</td><td>0.59</td></tr><tr><td>9</td><td>0.17</td><td>0.30</td><td>0.52</td></tr><tr><td>10</td><td>0.18</td><td>0.32</td><td>0.50</td></tr><tr><td>11</td><td>0.17</td><td>0.30</td><td>0.53</td></tr><tr><td>12</td><td>0.15</td><td>0.32</td><td>0.53</td></tr><tr><td>13</td><td>0.16</td><td>0.34</td><td>0.50</td></tr><tr><td>14</td><td>0.16</td><td>0.34</td><td>0.51</td></tr><tr><td>15</td><td>0.16</td><td>0.35</td><td>0.49</td></tr></table>

$$
\begin{array}{l} \mathrm {a} (1, 1) = \mathrm {p} (1) \mathrm {a} (1) = 0. 1 4 2 \times 7 = 1. 0 0 \\ \mathrm {a} (2, 1) = \mathrm {p} (2) \mathrm {a} (1) = 0. 1 4 2 \times 7 = 1. 0 0 \\ \mathrm {a} (3, 1) = \mathrm {p} (3) \mathrm {a} (1) = 0. 7 4 1 \times 7 = 5. 0 0 \\ \end{array}
$$

Table 7.4 lists the level for the total and for each location for every month $t = 1$ to 15.

# 7.8 Standard Deviation by Location and Total

The estimate of the standard deviation for the total demand at month $t$ is denoted as $s(t)$ , and the same value for location $j$ is $s(j, t)$ . The location standard deviations are calculated as shown earlier. At month $t = 1$ , $s(1) = 7.00$ and for $j = 1$ ,

$$
\mathrm {s} (1, 1) = \left[ 7. 0 0 \left\{0. 1 4 2 (1 - 0. 1 4 2) \right\} + (0. 1 4 2 \times 7. 0 0) ^ {2} \right] ^ {0. 5} = 1. 3 6
$$

In the same way, the standard deviation estimates for locations $j = 2$ and 3 are $s(2,1) = 0.136$ and $s(3,1) = 5.14$ . Table 7.5 lists the standard deviations for month $t = 1$ to 15 for the total demand and for each of the three locations.

Table 7.4 Monthly estimates of total level a(t), and location j level a(j,t)   

<table><tr><td>t</td><td>a(t)</td><td>a(1,t)</td><td>a(2,t)</td><td>a(3,t)</td></tr><tr><td>1</td><td>7.00</td><td>1.00</td><td>1.00</td><td>5.00</td></tr><tr><td>2</td><td>8.68</td><td>2.55</td><td>2.04</td><td>4.08</td></tr><tr><td>3</td><td>9.39</td><td>1.74</td><td>2.44</td><td>5.22</td></tr><tr><td>4</td><td>9.12</td><td>1.61</td><td>2.68</td><td>4.83</td></tr><tr><td>5</td><td>10.21</td><td>2.17</td><td>3.48</td><td>4.56</td></tr><tr><td>6</td><td>10.87</td><td>2.03</td><td>3.32</td><td>5.53</td></tr><tr><td>7</td><td>11.98</td><td>1.76</td><td>3.35</td><td>6.87</td></tr><tr><td>8</td><td>12.77</td><td>1.85</td><td>3.41</td><td>7.52</td></tr><tr><td>9</td><td>13.24</td><td>2.31</td><td>3.98</td><td>6.94</td></tr><tr><td>10</td><td>13.75</td><td>2.47</td><td>4.35</td><td>6.94</td></tr><tr><td>11</td><td>14.32</td><td>2.39</td><td>4.34</td><td>7.59</td></tr><tr><td>12</td><td>14.93</td><td>2.22</td><td>4.84</td><td>7.87</td></tr><tr><td>13</td><td>15.29</td><td>2.45</td><td>5.19</td><td>7.65</td></tr><tr><td>14</td><td>16.01</td><td>2.49</td><td>5.42</td><td>8.09</td></tr><tr><td>15</td><td>16.56</td><td>2.61</td><td>5.80</td><td>8.15</td></tr></table>

Table 7.5 Monthly estimates of the total standard deviation $\mathrm{s}\left( \mathrm{t}\right)$ ,and location $\mathrm{j}$ standard deviation $\mathrm{s}\left( {\mathrm{j},\mathrm{t}}\right)$   

<table><tr><td>t</td><td>s(t)</td><td>s(1,t)</td><td>s(2,t)</td><td>s(3,t)</td></tr><tr><td>1</td><td>7.00</td><td>1.36</td><td>1.36</td><td>5.14</td></tr><tr><td>2</td><td>5.29</td><td>2.06</td><td>1.76</td><td>2.89</td></tr><tr><td>3</td><td>4.35</td><td>1.44</td><td>1.75</td><td>2.86</td></tr><tr><td>4</td><td>4.03</td><td>1.35</td><td>1.82</td><td>2.61</td></tr><tr><td>5</td><td>3.92</td><td>1.55</td><td>2.02</td><td>2.37</td></tr><tr><td>6</td><td>3.62</td><td>1.45</td><td>1.88</td><td>2.47</td></tr><tr><td>7</td><td>3.79</td><td>1.35</td><td>1.88</td><td>2.77</td></tr><tr><td>8</td><td>3.66</td><td>1.36</td><td>1.86</td><td>2.78</td></tr><tr><td>9</td><td>3.45</td><td>1.51</td><td>1.97</td><td>2.57</td></tr><tr><td>10</td><td>3.28</td><td>1.54</td><td>2.01</td><td>2.48</td></tr><tr><td>11</td><td>3.12</td><td>1.50</td><td>1.98</td><td>2.51</td></tr><tr><td>12</td><td>2.98</td><td>1.44</td><td>2.05</td><td>2.49</td></tr><tr><td>13</td><td>2.87</td><td>1.51</td><td>2.09</td><td>2.42</td></tr><tr><td>14</td><td>2.81</td><td>1.51</td><td>2.12</td><td>2.45</td></tr><tr><td>15</td><td>2.67</td><td>1.54</td><td>2.15</td><td>2.42</td></tr></table>

# 7.9 Cov by Location and Total

The coefficient of variation for the total demand at month $t$ is denoted as $\operatorname{cov}(t)$ , and for location $j$ it is $\operatorname{cov}(j, t)$ . At month $t = 1$ ,

$$
\operatorname {c o v} (1) = \mathrm {s} (1) / \mathrm {a} (1) = 7 / 7 = 1. 0 0
$$

$$
\operatorname {c o v} (1, 1) = 1. 3 6 / 1. 0 0 = 1. 3 6
$$

$$
\operatorname {c o v} (2, 1) = 1. 3 6 / 1. 0 0 = 1. 3 6
$$

$$
\operatorname {c o v} (3, 1) = 5. 1 4 / 5. 0 0 = 1. 0 3
$$

In the same way, the cov's are computed as each month $t$ passes by. Table 7.6 gives the progress of the cvs for the total and for each location for months $t = 1$ to 15.

# 7.10 Bottom-Up Forecasting Method

Bottom-up forecasting requires the following five steps.

1. Gather the N most recent history demands by sku j.

$$
\mathrm {x} (\mathrm {j}, \mathrm {t}) = 1 \text {t o M a n d} \mathrm {t} = 1 \text {t o N}
$$

2. Generate the forecast for each sku j for future months $\tau$ .

$$
f (j, \tau) j = 1 t o M a n d \tau = 1, 2, \dots
$$

3. Compute the standard deviation estimate for each sku j as of the current time t.

$$
\begin{array}{l} \mathrm {s (j , t)} \qquad \mathrm {j = 1 t o M} \end{array}
$$

4. Sum all the sku forecasts to yield the total forecast.

$$
f (\tau) = \Sigma f (j, \tau) \quad j = 1 \text {t o} M \text {a n d} \tau = 1, 2, \dots .
$$

5. Compute the standard deviation estimate for the total demand, s.

Table 7.6 Monthly measures of the coefficient of variation for the total, cov(t), and for location j, cov(j,t)   

<table><tr><td>t</td><td>cov(t)</td><td>cov(1,t)</td><td>cov(2,t)</td><td>cov(3,t)</td></tr><tr><td>1</td><td>1.00</td><td>1.36</td><td>1.36</td><td>1.03</td></tr><tr><td>2</td><td>0.61</td><td>0.81</td><td>0.86</td><td>0.71</td></tr><tr><td>3</td><td>0.46</td><td>0.83</td><td>0.72</td><td>0.55</td></tr><tr><td>4</td><td>0.44</td><td>0.84</td><td>0.68</td><td>0.54</td></tr><tr><td>5</td><td>0.38</td><td>0.71</td><td>0.58</td><td>0.52</td></tr><tr><td>6</td><td>0.33</td><td>0.72</td><td>0.57</td><td>0.45</td></tr><tr><td>7</td><td>0.32</td><td>0.77</td><td>0.56</td><td>0.40</td></tr><tr><td>8</td><td>0.29</td><td>0.74</td><td>0.55</td><td>0.37</td></tr><tr><td>9</td><td>0.26</td><td>0.65</td><td>0.49</td><td>0.37</td></tr><tr><td>10</td><td>0.24</td><td>0.62</td><td>0.46</td><td>0.36</td></tr><tr><td>11</td><td>0.22</td><td>0.63</td><td>0.46</td><td>0.33</td></tr><tr><td>12</td><td>0.20</td><td>0.65</td><td>0.42</td><td>0.32</td></tr><tr><td>13</td><td>0.19</td><td>0.61</td><td>0.40</td><td>0.32</td></tr><tr><td>14</td><td>0.18</td><td>0.61</td><td>0.39</td><td>0.30</td></tr><tr><td>15</td><td>0.16</td><td>0.59</td><td>0.37</td><td>0.30</td></tr></table>

# 7.11 Location j Forecasts

Example 7.2 Forecasts are required for each location $j$ , using the most current demands and the associated parameters. Assume for this example, the trend smoothing model will be used with parameters, $\alpha = \max(0.10, 1/t)$ where $t$ is the number of months of history, and the slope parameter is $\beta = 0.05$ . Recall, the revised forecasts for any month $t$ are obtained as follows:

$$
\mathrm {a} (\mathrm {j}, \mathrm {t}) = \alpha \mathrm {x} (\mathrm {j}, \mathrm {t}) + (1 - \alpha) [ \mathrm {a} (\mathrm {j}, \mathrm {t} - 1) + \mathrm {b} (\mathrm {j}, \mathrm {t} - 1) ]
$$

$$
\mathrm {b} (\mathrm {j}, \mathrm {t}) = \beta [ \mathrm {a} (\mathrm {j}, \mathrm {t}) - \mathrm {a} (\mathrm {j}, \mathrm {t} - 1) ] + (1 - \beta) \mathrm {b} (\mathrm {j}, \mathrm {t} - 1)
$$

and

$$
f (j, \tau) = a (j, t) + b (j, t) \tau \quad \tau = 1, 2, \dots
$$

The standard deviation estimate for $\mathrm{sku}j$ and current month $t$ , is revised in the following way:

$$
\mathrm {s} (\mathrm {j}, \mathrm {t}) = \left\{\alpha \mathrm {e} (\mathrm {j}, \mathrm {t}) ^ {2} + (1 - \alpha) \mathrm {s} (\mathrm {j}, \mathrm {t} - 1) ^ {2} \right\} ^ {0. 5}
$$

# 7.12 Bottom-Up Total Forecast

where $\mathrm{e}(\mathrm{j},\mathrm{t}) = \mathrm{x}(\mathrm{j},\mathrm{t}) - \mathrm{f}(\mathrm{j},\mathrm{t} - 1)$ is the 1 month ahead forecast error at month t. The coefficient of variation for sku j and month t becomes,

$$
\operatorname {c o v} (\mathrm {j}, \mathrm {t}) = \mathrm {s} (\mathrm {j}, \mathrm {t}) / \mathrm {a} (\mathrm {j}, \mathrm {t})
$$

Forecasts at Location $\mathbf{j} = 1$ At month $t = 1$ , when the item is new, the demand for sku $j$ is denoted as $x(j,1)$ . The prior estimates of the level and slope, at $t = 0$ , are $a(j,0) = 0$ and $b(j,0) = 0$ , respectively. The smoothed values of the level and the slope become,

$$
a (1, 1) = 1. 0 0
$$

$$
\mathrm {b} (1, 1) = 0. 0 5
$$

and the $\tau$ -month ahead forecast becomes:

$$
f (1, \tau) = 1. 0 0 + 0. 0 5 \tau \quad \tau = 1, 2, \dots
$$

The standard deviation estimate becomes:

$$
\mathrm {s} (1, 1) = 1. 0 0
$$

and the cov is

$$
\operatorname {c o v} (1, 1) = 1. 0 0
$$

These are the values listed in Table 7.7 for the first month $(t = 1)$ of demand history. The table also lists the forecast results for the months $t = 1$ to 15. Table 7.8 lists the corresponding results for location $j = 2$ , and Table 7.9 gives the same for location $j = 3$ .

# 7.12 Bottom-Up Total Forecast

The total forecast, at month $t$ , using the bottom-up method is computed in the following way for a trend forecast model. First, the levels for each of the sku's are summed to give the level for the total demand as shown below:

$$
\mathrm {a} (t) = \sum_ {j = 1} ^ {M} a (j, t)
$$

In the same way, the slopes from each sku $j$ , are summed to yield the slope for the total demand,

$$
b (t) = \sum_ {j = 1} ^ {M} b (j, t)
$$

Table 7.7 Forecast worksheet for location 1 with months t, level a(1,t), slope b(1,t), forecast f(1,t), standard deviation s(1,t) and coefficient of variation cov(1,t)   

<table><tr><td>t</td><td>x(1,t)</td><td>a(1,t)</td><td>b(1,t)</td><td>f(1,t)</td><td>s(1,t)</td><td>cov(1,t)</td></tr><tr><td>1</td><td>1</td><td>1.00</td><td>0.05</td><td>1.05</td><td>1.00</td><td>1.00</td></tr><tr><td>2</td><td>4</td><td>2.53</td><td>0.12</td><td>2.65</td><td>2.20</td><td>0.87</td></tr><tr><td>3</td><td>0</td><td>1.77</td><td>0.08</td><td>1.85</td><td>2.36</td><td>1.34</td></tr><tr><td>4</td><td>1</td><td>1.63</td><td>0.07</td><td>1.70</td><td>2.09</td><td>1.28</td></tr><tr><td>5</td><td>4</td><td>2.16</td><td>0.09</td><td>2.25</td><td>2.13</td><td>0.99</td></tr><tr><td>6</td><td>1</td><td>2.05</td><td>0.08</td><td>2.13</td><td>2.01</td><td>0.98</td></tr><tr><td>7</td><td>0</td><td>1.82</td><td>0.07</td><td>1.89</td><td>2.03</td><td>1.11</td></tr><tr><td>8</td><td>2</td><td>1.90</td><td>0.07</td><td>1.97</td><td>1.90</td><td>1.00</td></tr><tr><td>9</td><td>5</td><td>2.31</td><td>0.08</td><td>2.39</td><td>2.05</td><td>0.89</td></tr><tr><td>10</td><td>3</td><td>2.45</td><td>0.09</td><td>2.54</td><td>1.96</td><td>0.80</td></tr><tr><td>11</td><td>1</td><td>2.38</td><td>0.08</td><td>2.46</td><td>1.92</td><td>0.81</td></tr><tr><td>12</td><td>0</td><td>2.22</td><td>0.07</td><td>2.28</td><td>1.98</td><td>0.89</td></tr><tr><td>13</td><td>4</td><td>2.46</td><td>0.08</td><td>2.53</td><td>1.96</td><td>0.80</td></tr><tr><td>14</td><td>2</td><td>2.48</td><td>0.07</td><td>2.55</td><td>1.86</td><td>0.75</td></tr><tr><td>15</td><td>3</td><td>2.60</td><td>0.08</td><td>2.67</td><td>1.77</td><td>0.68</td></tr></table>

Table 7.8 Forecast worksheet for location 2 with months t, level a(2,t), slope b(2,t), forecast f(2,t), standard deviation s(2,t) and coefficient of variation cov(2,t)   

<table><tr><td>t</td><td>x(2,t)</td><td>a(2,t)</td><td>b(2,t)</td><td>f(2,t)</td><td>s(2,t)</td><td>cov(2,t)</td></tr><tr><td>1</td><td>1</td><td>1.00</td><td>0.05</td><td>1.05</td><td>1.00</td><td>1.00</td></tr><tr><td>2</td><td>3</td><td>2.03</td><td>0.10</td><td>2.12</td><td>1.55</td><td>0.76</td></tr><tr><td>3</td><td>3</td><td>2.42</td><td>0.11</td><td>2.53</td><td>1.36</td><td>0.56</td></tr><tr><td>4</td><td>3</td><td>2.65</td><td>0.12</td><td>2.77</td><td>1.20</td><td>0.45</td></tr><tr><td>5</td><td>6</td><td>3.41</td><td>0.15</td><td>3.56</td><td>1.80</td><td>0.53</td></tr><tr><td>6</td><td>2</td><td>3.30</td><td>0.14</td><td>3.44</td><td>1.77</td><td>0.53</td></tr><tr><td>7</td><td>3</td><td>3.38</td><td>0.14</td><td>3.51</td><td>1.64</td><td>0.49</td></tr><tr><td>8</td><td>3</td><td>3.45</td><td>0.13</td><td>3.58</td><td>1.55</td><td>0.45</td></tr><tr><td>9</td><td>7</td><td>3.96</td><td>0.15</td><td>4.11</td><td>1.85</td><td>0.47</td></tr><tr><td>10</td><td>6</td><td>4.30</td><td>0.16</td><td>4.46</td><td>1.85</td><td>0.43</td></tr><tr><td>11</td><td>3</td><td>4.32</td><td>0.15</td><td>4.47</td><td>1.82</td><td>0.42</td></tr><tr><td>12</td><td>8</td><td>4.82</td><td>0.17</td><td>4.99</td><td>2.06</td><td>0.43</td></tr><tr><td>13</td><td>7</td><td>5.19</td><td>0.18</td><td>5.38</td><td>2.05</td><td>0.39</td></tr><tr><td>14</td><td>6</td><td>5.44</td><td>0.18</td><td>5.62</td><td>1.96</td><td>0.36</td></tr><tr><td>15</td><td>8</td><td>5.86</td><td>0.20</td><td>6.06</td><td>2.00</td><td>0.34</td></tr></table>

So now, the forecast for the $\tau$ -th future month for the total demand as of the current month $t$ is the following:

$$
f (\tau) = a (t) + b (t) \tau \quad \tau = 1, 2, \dots
$$

Table 7.9 Forecast worksheet for location 3 with months t, level a(3,t), slope b(3,t), forecast f(3,t), standard deviation s(3,t) and coefficient of variation cov(3,t)   

<table><tr><td>t</td><td>x(3,t)</td><td>a(3,t)</td><td>b(3,t)</td><td>f(3,t)</td><td>s(3,t)</td><td>cov(3,t)</td></tr><tr><td>1</td><td>5</td><td>5.00</td><td>0.25</td><td>5.25</td><td>5.00</td><td>1.00</td></tr><tr><td>2</td><td>3</td><td>4.13</td><td>0.19</td><td>4.32</td><td>3.88</td><td>0.94</td></tr><tr><td>3</td><td>7</td><td>5.21</td><td>0.24</td><td>5.45</td><td>3.52</td><td>0.68</td></tr><tr><td>4</td><td>3</td><td>4.84</td><td>0.21</td><td>5.05</td><td>3.29</td><td>0.68</td></tr><tr><td>5</td><td>3</td><td>4.64</td><td>0.19</td><td>4.82</td><td>3.08</td><td>0.66</td></tr><tr><td>6</td><td>9</td><td>5.52</td><td>0.22</td><td>5.74</td><td>3.29</td><td>0.60</td></tr><tr><td>7</td><td>13</td><td>6.78</td><td>0.27</td><td>7.05</td><td>4.10</td><td>0.60</td></tr><tr><td>8</td><td>10</td><td>7.42</td><td>0.29</td><td>7.71</td><td>3.97</td><td>0.54</td></tr><tr><td>9</td><td>1</td><td>6.97</td><td>0.26</td><td>7.22</td><td>4.36</td><td>0.63</td></tr><tr><td>10</td><td>5</td><td>7.00</td><td>0.24</td><td>7.24</td><td>4.20</td><td>0.60</td></tr><tr><td>11</td><td>11</td><td>7.62</td><td>0.26</td><td>7.88</td><td>4.16</td><td>0.55</td></tr><tr><td>12</td><td>8</td><td>7.89</td><td>0.26</td><td>8.16</td><td>3.94</td><td>0.50</td></tr><tr><td>13</td><td>3</td><td>7.64</td><td>0.24</td><td>7.88</td><td>4.08</td><td>0.53</td></tr><tr><td>14</td><td>10</td><td>8.09</td><td>0.25</td><td>8.34</td><td>3.93</td><td>0.49</td></tr><tr><td>15</td><td>6</td><td>8.11</td><td>0.24</td><td>8.34</td><td>3.80</td><td>0.47</td></tr></table>

The 1 month ahead forecast error is

$$
e (t) = x (t) - f (t - 1)
$$

and the revised standard deviation estimate becomes

$$
\mathrm {s} (t) = \sqrt {\alpha e (t) ^ {2} + (1 - \alpha) s (t - 1) ^ {2}}
$$

Finally, the coefficient of variation is

$$
\operatorname {c o v} (t) = s (t) / a (t)
$$

# 7.13 Total Forecast at Month 1

At month $t = 1$ , the level and slope are obtained from the same values for the three locations as follows:

$$
\mathrm {a} (1) = 1. 0 0 + 1. 0 0 + 5. 0 0 = 7. 0 0
$$

$$
\mathrm {b} (1) = 0. 0 5 + 0. 0 5 + 0. 1 5 = 0. 2 5
$$

Hence, the forecast of the total demand for future month $\tau$ is

$$
f (\tau) = 7. 0 0 + 0. 2 5 \tau \quad \tau = 1, 2, \dots \dots
$$

Table 7.10 Forecast worksheet for the total with months t, level a(t), slope b(t), forecast f(t), standard deviation s(t), and coefficient of variation cov(t)   

<table><tr><td>t</td><td>x(t)</td><td>a(t)</td><td>b(t)</td><td>f(t)</td><td>s(t)</td><td>cov(t)</td></tr><tr><td>1</td><td>7</td><td>7.00</td><td>0.35</td><td>7.35</td><td>7.00</td><td>1.00</td></tr><tr><td>2</td><td>10</td><td>8.68</td><td>0.42</td><td>9.09</td><td>5.29</td><td>0.61</td></tr><tr><td>3</td><td>10</td><td>9.39</td><td>0.43</td><td>9.83</td><td>4.35</td><td>0.46</td></tr><tr><td>4</td><td>7</td><td>9.12</td><td>0.40</td><td>9.52</td><td>4.03</td><td>0.44</td></tr><tr><td>5</td><td>13</td><td>10.21</td><td>0.43</td><td>10.64</td><td>3.92</td><td>0.38</td></tr><tr><td>6</td><td>12</td><td>10.87</td><td>0.44</td><td>11.31</td><td>3.62</td><td>0.33</td></tr><tr><td>7</td><td>16</td><td>11.98</td><td>0.48</td><td>12.46</td><td>3.79</td><td>0.32</td></tr><tr><td>8</td><td>15</td><td>12.77</td><td>0.49</td><td>13.27</td><td>3.66</td><td>0.29</td></tr><tr><td>9</td><td>13</td><td>13.24</td><td>0.49</td><td>13.73</td><td>3.45</td><td>0.26</td></tr><tr><td>10</td><td>14</td><td>13.75</td><td>0.49</td><td>14.25</td><td>3.28</td><td>0.24</td></tr><tr><td>11</td><td>15</td><td>14.32</td><td>0.50</td><td>14.82</td><td>3.12</td><td>0.22</td></tr><tr><td>12</td><td>16</td><td>14.93</td><td>0.50</td><td>15.44</td><td>2.98</td><td>0.20</td></tr><tr><td>13</td><td>14</td><td>15.29</td><td>0.49</td><td>15.79</td><td>2.87</td><td>0.19</td></tr><tr><td>14</td><td>18</td><td>16.01</td><td>0.51</td><td>16.51</td><td>2.81</td><td>0.18</td></tr><tr><td>15</td><td>17</td><td>16.56</td><td>0.51</td><td>17.07</td><td>2.67</td><td>0.16</td></tr></table>

The forecast error for month $t = 1$ is $e(1) = 7.00 - 0.00 = 7.00$ and so, the standard deviation estimate is:

$$
\mathrm {s} (1) = \left[ 1. 0 0 \times \left(7 ^ {2}\right) + 0 \times 0 \right] ^ {0. 5} = 7. 0 0
$$

Finally, the cov becomes,

$$
\operatorname {c o v} (1) = 7. 0 0 / 7. 0 0 = 1. 0 0
$$

The values are listed in Table 7.10 at $t = 1$ .

In the same way, the corresponding forecasts and related measures are calculated and listed in the table for months $t = 1$ to 15.

# 7.14 Horizontal SKU Forecasts

Sometimes there are many sku's where forecasts are needed on the future demands. This happens often in consumer items where many sizes and or colors of styles are stocked in the inventory in the distribution centers or in stores where replenishment decisions are needed on each sku. In these situations, the demands over the short run are often of the horizontal type and the forecasts are generated on a top-down basis.

Table 7.11 Portion of demand by size, s, and width, w, p(s,w)   

<table><tr><td>s/w</td><td>N</td><td>M</td><td>W</td></tr><tr><td>7</td><td>0.0094</td><td>0.0188</td><td>0.0102</td></tr><tr><td>8</td><td>0.0129</td><td>0.0259</td><td>0.0184</td></tr><tr><td>8.5</td><td>0.0165</td><td>0.0329</td><td>0.0267</td></tr><tr><td>9</td><td>0.0200</td><td>0.0400</td><td>0.0349</td></tr><tr><td>9.5</td><td>0.0235</td><td>0.0470</td><td>0.0431</td></tr><tr><td>10</td><td>0.0270</td><td>0.0541</td><td>0.0513</td></tr><tr><td>10.5</td><td>0.0055</td><td>0.0500</td><td>0.0550</td></tr><tr><td>11</td><td>0.0052</td><td>0.0470</td><td>0.0517</td></tr><tr><td>11.5</td><td>0.0049</td><td>0.0441</td><td>0.0485</td></tr><tr><td>12</td><td>0.0045</td><td>0.0412</td><td>0.0453</td></tr><tr><td>13</td><td>0.0042</td><td>0.0382</td><td>0.0420</td></tr></table>

In this section, the example to illustrate the method is taken from the shoe industry where a style shoe is under review and the style has many combinations by size and width. In a top-down manner, the demand history of the style is used to forecast the style forecasts for the future months. The style forecast is then allocated to each size and width combination via a measure of the prior demand for each sku.

In the shoe industry, the portion of demand by sku is called a profile and the profile is often the same for a whole class of styles. Caution however, the profile of men's work shoes may be different than the profile of men's dress shoes. The profile could also change by location of the country where, for casual shoes, the profile in Florida may be different than the profile in Minnesota, say. The profile may even be different by store location in a city where the store is in an ethnic neighborhood. Some ethnic men may be larger in general than other ethnic men.

Example 7.3 Assume a style shoe has 33 sku's as identified in Table 7.11. The sizes range from 7.0 to 13.0 and the widths are narrow (N), medium (M) and wide (W). For the style of interest, the portion of total demand by sku is also listed in the table. The sum over all of the sku portions, $\mathrm{p}(\mathrm{s},\mathrm{w})$ , is 1.000.

# 7.15 SKU Forecasts at the Distribution Center

Forecasts are needed at the distribution center and at each store. The forecasts at the DC is used to determine the replenish needs for each size and width. When new stock is needed, the DC places an order by sku with the plant that serves as the source supplier. The example assumes the monthly forecast for the style is $\mathrm{F} = 500$ pair. Using the style forecast, F, the associated sku forecast for the DC is generated by,

$$
\mathrm {f (s , w) = p (s , w) \times F}
$$

Table 7.12 Raw forecast for total demand $\mathrm{f}\left( {\mathrm{s},\mathrm{w}}\right)$ by size s,and width w,when $\mathrm{F} = {500}$ per month at the distribution center   

<table><tr><td>s/w</td><td>N</td><td>M</td><td>W</td></tr><tr><td>7</td><td>4.70</td><td>9.41</td><td>5.10</td></tr><tr><td>8</td><td>6.47</td><td>12.94</td><td>9.21</td></tr><tr><td>8.5</td><td>8.23</td><td>16.46</td><td>13.33</td></tr><tr><td>9</td><td>10.00</td><td>19.99</td><td>17.44</td></tr><tr><td>9.5</td><td>11.76</td><td>23.52</td><td>21.56</td></tr><tr><td>10</td><td>13.52</td><td>27.05</td><td>25.67</td></tr><tr><td>10.5</td><td>2.75</td><td>24.99</td><td>27.49</td></tr><tr><td>11</td><td>2.59</td><td>23.52</td><td>25.87</td></tr><tr><td>11.5</td><td>2.43</td><td>22.05</td><td>24.25</td></tr><tr><td>12</td><td>2.26</td><td>20.58</td><td>22.64</td></tr><tr><td>13</td><td>2.10</td><td>19.11</td><td>21.02</td></tr></table>

Table 7.13 Integer forecast $\mathrm{x}\left( {\mathrm{s},\mathrm{w}}\right)$ by size s,and width w,of $\mathrm{F} = {500}$ at the distribution center   

<table><tr><td>s/w</td><td>N</td><td>M</td><td>W</td></tr><tr><td>7</td><td>5</td><td>9</td><td>5</td></tr><tr><td>8</td><td>6</td><td>13</td><td>9</td></tr><tr><td>8.5</td><td>8</td><td>16</td><td>13</td></tr><tr><td>9</td><td>10</td><td>20</td><td>17</td></tr><tr><td>9.5</td><td>12</td><td>24</td><td>22</td></tr><tr><td>10</td><td>14</td><td>27</td><td>26</td></tr><tr><td>10.5</td><td>3</td><td>25</td><td>27</td></tr><tr><td>11</td><td>3</td><td>24</td><td>26</td></tr><tr><td>11.5</td><td>2</td><td>22</td><td>24</td></tr><tr><td>12</td><td>2</td><td>21</td><td>23</td></tr><tr><td>13</td><td>2</td><td>19</td><td>21</td></tr></table>

The raw forecasts are rounded to integers. Because of rounding, the sum of the raw forecasts will not always equal the corresponding sum of the integer forecasts.

Consider $\mathrm{skus} = 10$ and $\mathrm{w} = \mathrm{M}$ , where $\mathrm{p}(10,\mathrm{M}) = 0.0541$ , the raw forecast for this $\mathrm{ski}$ is,

$$
\mathrm {f} (1 0, \mathrm {M}) = 0. 0 5 4 1 \times 5 0 0 = 2 7. 0 5
$$

The raw forecasts are listed in Table 7.12 and the corresponding integer forecasts are in Table 7.13. The raw forecast for size $s = 7$ and width $w = N$ , say, becomes,

$\mathrm{f}(7,\mathrm{N}) = \mathrm{p}(7,\mathrm{N})\times \mathrm{F} = 0.0094\times 500 = 4.7.$ The corresponding integer forecast is $\mathrm{f}(7,\mathrm{N}) = 5$ pair.

Table 7.14 Integer forecast $\mathrm{x}\left( {\mathrm{s},\mathrm{w}}\right)$ by size s,and width w,when $\mathrm{F} = {10}$ at a store location   

<table><tr><td>s/w</td><td>N</td><td>M</td><td>W</td></tr><tr><td>7</td><td>0</td><td>0</td><td>0</td></tr><tr><td>8</td><td>0</td><td>0</td><td>0</td></tr><tr><td>8.5</td><td>0</td><td>0</td><td>0</td></tr><tr><td>9</td><td>0</td><td>0</td><td>0</td></tr><tr><td>9.5</td><td>0</td><td>0</td><td>0</td></tr><tr><td>10</td><td>0</td><td>1</td><td>1</td></tr><tr><td>10.5</td><td>0</td><td>0</td><td>1</td></tr><tr><td>11</td><td>0</td><td>0</td><td>1</td></tr><tr><td>11.5</td><td>0</td><td>0</td><td>0</td></tr><tr><td>12</td><td>0</td><td>0</td><td>0</td></tr><tr><td>13</td><td>0</td><td>0</td><td>0</td></tr></table>

Table 7.15 Integer forecast $\mathrm{x}\left( {\mathrm{s},\mathrm{w}}\right)$ by size s,and width w,when $\mathrm{F} = {20}$ at a store location   

<table><tr><td>s/w</td><td>N</td><td>M</td><td>W</td></tr><tr><td>7</td><td>0</td><td>0</td><td>0</td></tr><tr><td>8</td><td>0</td><td>1</td><td>0</td></tr><tr><td>8.5</td><td>0</td><td>1</td><td>1</td></tr><tr><td>9</td><td>0</td><td>1</td><td>1</td></tr><tr><td>9.5</td><td>0</td><td>1</td><td>1</td></tr><tr><td>10</td><td>1</td><td>1</td><td>1</td></tr><tr><td>10.5</td><td>0</td><td>1</td><td>1</td></tr><tr><td>11</td><td>0</td><td>1</td><td>1</td></tr><tr><td>11.5</td><td>0</td><td>1</td><td>1</td></tr><tr><td>12</td><td>0</td><td>1</td><td>1</td></tr><tr><td>13</td><td>0</td><td>1</td><td>1</td></tr></table>

# 7.16 SKU Forecasts at the Stores

Suppose the forecast for a store is ten pair a month, $\mathrm{F} = 10$ , for the style. The associated integer forecasts for the style size and width at the store become those listed in Table 7.14. Although the raw forecasts for this store sums to ten pair,

$$
\Sigma \Sigma f (s, w) = 1 0
$$

the corresponding integer forecasts sum to only four pair.

Table 7.15 lists the integer forecasts for a store when the monthly style forecast is $\mathrm{F} = {20}$ pair. In this scenario,both the raw and the integer forecasts sum to 20 pair.

Table 7.16 Integer forecast $\mathrm{x}\left( {\mathrm{s},\mathrm{w}}\right)$ by size s,and width w,when $\mathrm{F} = {30}$ at a store location   
Table 7.16 lists the forecasts when the style forecast is $\mathrm{F} = {30}$ pair. In this situation,the sum of the raw forecasts is 30,but the sum of the integer forecasts is 28 pair.   

<table><tr><td>s/w</td><td>N</td><td>M</td><td>W</td></tr><tr><td>7</td><td>0</td><td>1</td><td>0</td></tr><tr><td>8</td><td>0</td><td>1</td><td>1</td></tr><tr><td>8.5</td><td>0</td><td>1</td><td>1</td></tr><tr><td>9</td><td>1</td><td>1</td><td>1</td></tr><tr><td>9.5</td><td>1</td><td>1</td><td>1</td></tr><tr><td>10</td><td>1</td><td>2</td><td>2</td></tr><tr><td>10.5</td><td>0</td><td>1</td><td>2</td></tr><tr><td>11</td><td>0</td><td>1</td><td>2</td></tr><tr><td>11.5</td><td>0</td><td>1</td><td>1</td></tr><tr><td>12</td><td>0</td><td>1</td><td>1</td></tr><tr><td>13</td><td>0</td><td>1</td><td>1</td></tr></table>

# Summary

The top-down and bottom-up forecasting methods are used when multiple skus are related in some manner, like the same part is stocked in various locations, or when a retail item is available in a variety of sizes, colors or models. Could be when a part (or product) is stocked in multiple locations, and forecasts at each location is needed as well as a forecast for the total. A common use is for retail items, shoes, shirts, sweaters, so forth, where forecasts are needed by each size and for the total. The top-down method first generates forecasts of the total demand, and second, this forecast is apportioned down to each sku. The bottom-up method applies when a forecast for each sku is generated and the sum of the forecasts is used for the total. The individual sku forecasts are needed for subsequent inventory computation decisions, and the total forecast is needed to arrange with the supplier the replenish needs for the total inventory system. In all situations, measures of the forecast error are needed for subsequent inventory decisions.

# Chapter 8 Forecast Sensitivity

# 8.1 Introduction

Along the supply chain, in distribution centers, stores, dealers, so forth, forecasts are in continual need for inventory decisions to project the flow of demands over the future months for each item stocked. The more accurate the forecasts, the better the inventory decisions and the more profitable the entity. A $10\%$ decrease in the measure of the forecast error will result in approximately a $10+$ percent decrease in the amount of safety stock needed. This reduced stock is very helpful to the profit margin on the inventory system.

In this chapter, a series of simulation runs are developed to appraise the forecaster on how some elements in forecasting affect the accuracy of the forecasts. For this purpose, the forecast accuracy is measured by the coefficient of variation, cov, of the 1-month ahead forecast error. A first series of tests concern the number of months of demand history to use in developing the forecasts. The cov is measured as the history of demands range from 6 to 48 months and the forecasts are for the horizontal and trend demand patterns. A second series of tests are aimed at measuring how forecast accuracy depends on the choice of parameters and forecast model selected. Three separate simulations are run; one for the horizontal demand pattern, another for the trend demand pattern, and yet another for the seasonal demand pattern. A third series of tests demonstrate how damaging outlier demands are to the forecasts and the forecast accuracy. Two examples are given, one for a horizontal demand pattern and another for a trend demand pattern.

# 8.2 Cov by NMH when Horizontal Demands and Forecasts

A simulation is run to determine how the accuracy of the forecast is affected as the number of months of history (NMH) varies when the demand pattern is horizontal and a horizontal forecast model is applied. In this simulation, the NMH of demand

Table 8.1 Average cov from 25 samples by number of months history, NMH, using the horizontal moving average forecast model   

<table><tr><td>NMH</td><td>Cov</td></tr><tr><td>6</td><td>0.362</td></tr><tr><td>12</td><td>0.346</td></tr><tr><td>18</td><td>0.297</td></tr><tr><td>24</td><td>0.292</td></tr><tr><td>30</td><td>0.303</td></tr><tr><td>36</td><td>0.316</td></tr><tr><td>42</td><td>0.320</td></tr><tr><td>48</td><td>0.318</td></tr></table>

history is randomly generated from a horizontal demand pattern where the individual monthly demands are normally distributed with a mean of $\mu$ and a standard deviation of $\sigma = \mathrm{cov} \times \mu$ with $\mathrm{cov} = 0.30$ . The demands are denoted as, $\mathrm{x}(1), \dots, \mathrm{x}(N)$ , where $\mathrm{N} = \mathrm{NMH}$ , and the average demand is computed by the sample average,

$$
\mathrm {a} ^ {\prime} = \left[ \mathrm {x} (1) + \dots + \mathrm {x} (\mathrm {N}) \right] / \mathrm {N}
$$

The forecast errors of the 12 future months are calculated by: $\mathrm{e}(t) = (\mathrm{x}(t) - \mathrm{a}^{\prime}) \quad t = N + 1$ to $N + 12$ , and the standard deviation estimate is computed as,

$$
s = \sqrt {\sum e (t) ^ {2} / (N - 1)}
$$

So now, the coefficient of variation for this simulated sample is:

$$
\operatorname {c o v} = \mathrm {s} / \mathrm {a} ^ {\prime}
$$

The simulation is carried out 25 times and the average cov for the stated NMH is computed.

Table 8.1 lists the average cov for each of the NMH's (6-48) selected in this simulation. Note, the cov reaches equilibrium when 18 months of history is used to estimate the average demand.

# 8.3 Cov by NMH when Trend Demands and Forecasts

A simulation is run to determine how the accuracy of the forecast changes when the number months of demand history varies for a trend demand pattern and a trend forecast model is in use. In this situation, NMH months of demand history is randomly generated from a trend demand pattern where the monthly demands are slowly ramping upwards. Each demand is normally distributed with a mean $\mu (\tau) = (a + bt)$ and the standard deviation is $\sigma (\tau)$ , where $\sigma (\tau) = \mathrm{cov}\times \mu (t)$ , and

Table 8.2 Average cov from 25 samples by number of month history, NMH, using the trend regression forecast model   

<table><tr><td>NMH</td><td>Cov</td></tr><tr><td>6</td><td>0.690</td></tr><tr><td>12</td><td>0.393</td></tr><tr><td>18</td><td>0.334</td></tr><tr><td>24</td><td>0.293</td></tr><tr><td>30</td><td>0.302</td></tr><tr><td>36</td><td>0.330</td></tr><tr><td>42</td><td>0.318</td></tr><tr><td>48</td><td>0.314</td></tr></table>

$\mathrm{cov} = 0.30$ . Because the mean of each month is slowly ramping up in this simulation, the associated standard deviation is also becoming larger with each month. The randomly generated demands are denoted as, $\mathrm{x}(1),\dots,\mathrm{x}(\mathrm{N})$ , where $\mathrm{N = NMH}$ .

The fit of the demands has two coefficients, (a, b), and these are estimated as follows:

$$
\begin{array}{l} \mathrm {b} ^ {*} = \left[ \sum \mathrm {x} \sum \mathrm {t} - \mathrm {N} \sum \mathrm {x t} \right] / \left[ \left(\sum \mathrm {t}\right) ^ {2} - \mathrm {N} \sum \mathrm {t} ^ {2} \right] \\ a ^ {\prime} = \left[ \sum x - b \sum t \right] / N \\ \end{array}
$$

Where the summations range from $t = 1$ to $N$ , and for brevity, the summation notations are: $\sum x = \sum x(t)$ and $\sum xt = \sum x(t)t$

The forecast values for the 12 future months are computed by,

$$
\mathrm {f (t) = a ^ {\prime} + b ^ {\prime} t \quad t = N + 1 t o N + 1 2}
$$

The average value of the forecast is here denoted as $f^{\prime}$ . The forecast errors of the 12 future months is obtained, $e(t) = (x(t) - f(t))$ $t = N + 1$ to $N + 12$ , and the standard deviation estimate is computed as,

$$
s = \sqrt {\sum e (t) ^ {2} / (N - 1)}
$$

So now, the coefficient of variation for this simulated sample is

$$
\operatorname {c o v} = \mathrm {s} / \mathrm {f} ^ {\prime}
$$

The simulation is carried out 25 times and the average cov for the stated NMH is computed.

Table 8.2 lists the average cov for each of the NMH's (6-48) selected in this simulation. Note, the cov reaches equilibrium when $N = 24$ months of history are used to generate the forecasts. This result is influenced because the demands are created from a trend demand pattern and the associated forecasts are also generated from a trend forecast model.

Table 8.3 Average cov from 25 samples by discount forecast models, horizontal and trend, and parameter $\beta$ when true demand pattern is horizontal   

<table><tr><td>β</td><td>Cov(H)</td><td>Cov(T)</td></tr><tr><td>0.95</td><td>0.333</td><td>0.438</td></tr><tr><td>0.90</td><td>0.334</td><td>0.445</td></tr><tr><td>0.85</td><td>0.336</td><td>0.457</td></tr><tr><td>0.80</td><td>0.338</td><td>0.474</td></tr><tr><td>0.75</td><td>0.341</td><td>0.499</td></tr><tr><td>0.70</td><td>0.345</td><td>0.531</td></tr></table>

# 8.4 Cov by Parameter and Forecast Model when Horizontal Demands

In this simulation, the accuracy of the forecast is measured when the demands are from a horizontal demand pattern and the forecasts are from the discount forecast models of horizontal and trend and the discount parameters vary. For this purpose, 24 months of demand history are randomly generated from a horizontal demand pattern where the individual monthly demands are normally distributed with a mean of $\mu$ and a standard error of $\sigma = \mathrm{cov} \times \mu$ with $\mathrm{cov} = 0.300$ . The demands are denoted as, $\mathrm{x}(1), \ldots, \mathrm{x}(24)$ .

The forecasts are generated by the horizontal discount model and also by the trend discount model. The models use one parameter denoted as $\beta$ . The values of $\beta$ are: (0.95, 0.90, 0.85, 0.80, 0.75, 0.70). The forecasts are generated using the first 12 months of demands, $[\mathbf{x}(1),\dots,\mathbf{x}(12)]$ . The level, a, for the horizontal discount model is computed by,

$$
a ^ {\prime} = \sum x w / \sum w
$$

where, $\sum x w = \sum x(\tau)w(t),\sum w = \sum w(t)$ , and the history discount weights are $w(t) = \beta^{N - t}$

The coefficients, a, b, for the trend discount model are obtained by the following:

$$
b ^ {\prime} = \left[ \sum x w \sum t w - \sum w \sum x t w \right] / \left[ \left(\sum t w\right) ^ {2} - \sum w \sum t ^ {2} w \right]
$$

$$
a ^ {\prime} = \left[ \sum x w - b \sum t w \right] / \sum w
$$

where the summations range from $t = 1$ to 12. For brevity, the summation notations are: $\sum \mathrm{tw} = \sum \mathrm{tw}(t), \sum \mathrm{t}^2\mathrm{w} = \sum \mathrm{t}^2\mathrm{w}(t)$ , and $\sum \mathrm{xtw} = \sum \mathrm{x(t)}\mathrm{tw(t)}$

The cov of the forecast error is measured when the forecast is projected over the next 12 months of demand, $[x(13),\dots,x(24)]$ . For simplicity, the cov for the horizontal forecast model is denoted as $\mathrm{cov}(\mathrm{H})$ , and for the trend forecast model it is $\mathrm{cov}(\mathrm{T})$ .

The samples are run 25 times and the average cvs are listed in Table 8.3. Note from the table, the cov is best when the horizontal forecast model is applied, and

also, the cov for the horizontal model gives more accurate results when the discount parameter, $\beta$ , is near 0.95.

# 8.5 Cov by Parameter and Forecast Model when Trend Demands

This simulation is run to determine how the accuracy of the forecasts are affected for a trend demand pattern when the discount forecast models of horizontal and trend are in use and as the discount parameter varies. In this scenario, 24 months of demand history are randomly generated from a trend demand pattern where the monthly demands are slowly ramping upwards. Each demand is normally distributed with a mean $\mu (\tau) = (a + b\tau)$ and the standard deviation is $\sigma (\tau)$ , where $\sigma (\tau) = \mathrm{cov}\times \mu (\tau)$ , and $\mathrm{cov} = 0.30$ . Because the mean of each month is slowly ramping up in this simulation, the associated standard deviation is also becoming larger with each month. The randomly generated demands are denoted as, $\mathbf{x}(1),\ldots ,\mathbf{x}(24)$ .

The forecasts are generated by the horizontal discount model and also by the trend discount model. The models use one parameter denoted as $\beta$ . The values of $\beta$ are: (0.95, 0.90, 0.85, 0.80, 0.75, 0.70). The forecasts are generated using the first 12 months of demands, $[\mathrm{x}(1),\dots,\mathrm{x}(12)]$ . The level, a, for the horizontal discount model is computed by,

$$
a ^ {\prime} = \sum x w / \sum w
$$

where, $\sum \mathrm{xw} = \sum \mathrm{x}(\tau)\mathrm{w(t)},\sum \mathrm{w} = \sum \mathrm{w(t)}$ and the history discount weights are $\mathrm{w(t) = \beta^{N - t}}$

The coefficients, a, b, for the trend discount model are obtained by the following:

$$
b ^ {\prime} = \left[ \sum x w \sum t w - \sum w \sum x t w \right] / \left[ \left(\sum t w\right) ^ {2} - \sum w \sum t ^ {2} w \right]
$$

$$
a ^ {\prime} = \left[ \sum x w - b \sum t w \right] / \sum w
$$

Where the summations range from $t = 1$ to 12 and for notation brevity, $\sum \mathrm{tw} = \sum \mathrm{tw}(t), \sum \mathrm{t}^2\mathrm{w} = \sum \mathrm{t}^2\mathrm{w}(t)$ , and $\sum \mathrm{xtw} = \sum \mathrm{x}(t)\mathrm{tw}(t)$ .

The cov of the forecast error is measured when the forecast is projected over the next 12 months of demand, $[x(13),\dots,x(24)]$ . For simplicity, the cov for the horizontal forecast model is denoted as $\mathrm{cov}(\mathrm{H})$ , and for the trend forecast model it is $\mathrm{cov}(\mathrm{T})$ .

The samples are run 25 times and the average cvs are listed in Table 8.4. Note from the table results, the cov is best when the trend forecast model is applied, and also when the discount parameter, $\beta$ , is near 0.95.

Table 8.4 Average cov from 25 samples by discount forecast model, horizontal and trend, and parameter $\beta$ when true demand pattern is trend   

<table><tr><td>β</td><td>Cov(H)</td><td>Cov(T)</td></tr><tr><td>0.95</td><td>0.676</td><td>0.341</td></tr><tr><td>0.90</td><td>0.646</td><td>0.344</td></tr><tr><td>0.85</td><td>0.619</td><td>0.350</td></tr><tr><td>0.80</td><td>0.596</td><td>0.362</td></tr><tr><td>0.75</td><td>0.576</td><td>0.386</td></tr><tr><td>0.70</td><td>0.560</td><td>0.438</td></tr></table>

# 8.6 Cov by Parameter and Forecast Model when Seasonal Demands

In this scenario, 36 months of demand history are randomly generated from a seasonal demand pattern where the monthly demands are slowly ramping upwards and have a seasonal cycle. This is the same seasonal data that is used in the Chap. 6 example. Each demand is normally distributed with a mean $\mu (\tau) = (a + bt)r(t)$ where $a$ is the level, $b$ is the slope and $r(t)$ is the seasonal ratio for month $t$ . The standard deviation is $\sigma (\tau)$ , where $\sigma (\tau) = \mathrm{cov}\times \mu (\tau)$ , and $\mathrm{cov} = 0.30$ . Because the mean of each month is cycling up and down, the associated standard deviation is also changing with each month. The randomly generated demands are denoted as, $\mathrm{x}(1),\dots,\mathrm{x}(36)$ .

The seasonal smoothing multiplicative forecast model is used to generate the forecasts. The first 24 months of history demands are used to initialize the forecasts. The following three parameters, $(\alpha, \beta, \gamma)$ , are needed where $\alpha$ is used to smooth the level, $\beta$ is used to smooth the slope, and $\gamma$ is used to smooth the seasonal ratios. The algorithm is the same as described in Chap. 6, and for brevity, it is not repeated here.

Since month $t = 24$ is the final history month, the forecasts for 12 subsequent months are projected in the following way:

$$
\mathrm {f} (\tau) = \left[ \mathrm {a} (2 4) + \mathrm {b} (2 4) \tau \right] \mathrm {r} (2 4 + \tau) \quad \tau = 1, \dots , 1 2
$$

where the coefficients, $a(24)$ and $b(24)$ , are the level and slope at month $t = 24$ , and $r(24 + \tau)$ is the seasonal ratio for the $\tau$ -th future month. The cov for the model is based on the forecast error of the 12 future months, $t = 25$ to 36. Eight combinations of the three parameters are tried as listed in Table 8.6. For each combination, the cov is listed as $\mathrm{cov}(\mathrm{S})$ . Note from the table, the best results are when the three parameters are set close to 0.10.

The trend smoothing forecast model is also applied with the same data, and uses only the parameter $\alpha$ and $\beta$ . The cov is computed for future months $t = 25$ to 36 and the results, $\operatorname{cov}(\mathrm{T})$ , are listed in Table 8.5 for four combination of parameter settings.

The horizontal smoothing forecast model is also applied with the same data and requires the parameter $\alpha$ . Two combinations of the parameter are tried and the cov is computed using the data of $t = 25$ to 36. The cov for these two combinations are listed in Table 8.5 under $\mathrm{cov}(\mathrm{H})$ .

Table 8.5 Cov from seasonal smoothing forecast model, S, the trend smoothing forecast model, T, the horizontal smoothing model, H, and parameters $\alpha$ , $\beta$ , $\gamma$ , when true demand pattern is seasonal   

<table><tr><td>α</td><td>β</td><td>γ</td><td>Cov(S)</td></tr><tr><td>0.10</td><td>0.10</td><td>0.10</td><td>0.332</td></tr><tr><td>0.10</td><td>0.10</td><td>0.20</td><td>0.342</td></tr><tr><td>0.10</td><td>0.20</td><td>0.10</td><td>0.335</td></tr><tr><td>0.20</td><td>0.10</td><td>0.10</td><td>0.351</td></tr><tr><td>0.10</td><td>0.20</td><td>0.20</td><td>0.346</td></tr><tr><td>0.20</td><td>0.10</td><td>0.20</td><td>0.365</td></tr><tr><td>0.20</td><td>0.20</td><td>0.10</td><td>0.398</td></tr><tr><td>0.20</td><td>0.20</td><td>0.20</td><td>0.417</td></tr><tr><td>α</td><td>β</td><td></td><td>Cov(T)</td></tr><tr><td>0.10</td><td>0.10</td><td></td><td>0.475</td></tr><tr><td>0.10</td><td>0.20</td><td></td><td>0.478</td></tr><tr><td>0.20</td><td>0.10</td><td></td><td>0.508</td></tr><tr><td>0.20</td><td>0.20</td><td></td><td>0.530</td></tr><tr><td>α</td><td></td><td></td><td>Cov(H)</td></tr><tr><td>0.10</td><td></td><td></td><td>0.558</td></tr><tr><td>0.20</td><td></td><td></td><td>0.563</td></tr></table>

Table 8.6 Twelve months of demand history, $\mathrm{x}\left( \mathrm{t}\right)$ ,with one outlier demand and horizontal fit, f(t); and demand history with the outlier removed, ${\mathrm{x}}^{\prime }\left( \mathrm{t}\right)$ ,and resulting fit, ${\mathrm{f}}^{\prime }\left( \mathrm{t}\right)$   

<table><tr><td colspan="3">Outlier</td><td colspan="2">No outlier</td></tr><tr><td>t</td><td>x(t)</td><td>f(t)</td><td>x&#x27;(t)</td><td>f&#x27;(t)</td></tr><tr><td>1</td><td>13</td><td>10.67</td><td>13</td><td>8.83</td></tr><tr><td>2</td><td>7</td><td>10.67</td><td>7</td><td>8.83</td></tr><tr><td>3</td><td>6</td><td>10.67</td><td>6</td><td>8.83</td></tr><tr><td>4</td><td>33</td><td>10.67</td><td>11</td><td>8.83</td></tr><tr><td>5</td><td>4</td><td>10.67</td><td>4</td><td>8.83</td></tr><tr><td>6</td><td>9</td><td>10.67</td><td>9</td><td>8.83</td></tr><tr><td>7</td><td>8</td><td>10.67</td><td>8</td><td>8.83</td></tr><tr><td>8</td><td>3</td><td>10.67</td><td>3</td><td>8.83</td></tr><tr><td>9</td><td>11</td><td>10.67</td><td>11</td><td>8.83</td></tr><tr><td>10</td><td>9</td><td>10.67</td><td>9</td><td>8.83</td></tr><tr><td>11</td><td>13</td><td>10.67</td><td>13</td><td>8.83</td></tr><tr><td>12</td><td>12</td><td>10.67</td><td>12</td><td>8.83</td></tr></table>

# 8.7 Cov when Horizontal Demands with an Outlier

The purpose of this simulation is to demonstrate how damaging an outlier demand is to the forecast results when an outlier is in the demand history. For this situation, $N = 12$ months of demand history are randomly generated from a horizontal demand pattern where the individual monthly demands are normally distributed with a mean of $\mu$ and a standard deviation of $\sigma = \mathrm{cov} \times \mu$ with $\mathrm{cov} = 0.30$ . The demands are

![](images/46d62ce24154ac855a282f5a48f662df70b596a3d3101b3f2258f9fe8dc3409a.jpg)  
Fig. 8.1 Forecasts by horizontal model from horizontal demand pattern with one outlier

denoted as, $\mathrm{x}(1),\ldots ,\mathrm{x}(\mathrm{N})$ , where $N = 12$ . The demand in month $t = 4$ is an outlier, with $\mathrm{x}(4) = 33$ . The average demand is computed by,

$$
a ^ {\prime} = \left[ x (1) + \dots + x (1 2) \right] / 1 2
$$

The residual errors of the history months is obtained, $\mathrm{e(t) = (x(t) - a^{\prime})t = 1}$ to 12, and the standard deviation estimate is computed as,

$$
s = \sqrt {\sum e (t) ^ {2} / (1 2 - 1)}
$$

So now, the coefficient of variation for this simulated sample is

$$
\operatorname {c o v} = \mathrm {s} / \mathrm {a} ^ {\prime}
$$

Table 8.6 lists the 12 monthly demands, $\mathrm{x(t)}$ for $t = 1$ to 12. The average demand is $a^{\prime} = 10.67$ and the associated standard deviation is $s = 7.76$ . Thereby, the $\mathrm{cov} = 7.76 / 10.67 = 0.727$ . These are the statistics when the outlier is not removed from the demand history. The table also lists the same demands when the outlier demand is removed, $x^{\prime}(t)$ , and is adjusted to $x^{\prime}(4) = 11$ , say. The average demand in this situation is $a^{\prime} = 8.83$ and the standard deviation is $s = 3.36$ , whereby, the cov is $3.36 / 8.83 = 0.380$ .

Figure 8.1 shows a plot of the demands with the outlier and the projected forecast for the next 12 months. Figure 8.2 depicts the same demands when the outlier is removed and adjusted, and projects the forecast for 12 future months.

Should the outlier not be adjusted, the forecast would call for $\mathrm{f} = 10.67$ pieces per month, and in inventory control, the related standard deviation would be $\mathrm{s} = 7.76$ causing a need for much safety stock. Without the outlier, the forecast would be $\mathrm{f} = 8.83$ pieces per month and the standard deviation would be 3.36. The results show how outliers cause a large and unnecessary increase in the inventory needs. Chapter 9 describes a way to detect and modify outliers in the demand history.

![](images/299bb2c78a8e9f0437a54617fd1183f883022878f6eed6b9da48e4ee7a4858f1.jpg)  
Fig. 8.2 Forecasts by horizontal regression model from horizontal demand pattern with the outlier adjusted

# 8.8 Cov when Trend Demands with an Outlier

The purpose of this simulation is to demonstrate how damaging an undetected outlier in the demand history is to the forecasts when the demand pattern is a trend. In this situation, 24 months of demand history is randomly generated from a trend demand pattern where the monthly demands are slowly ramping upwards. Each demand is normally distributed with a mean $\mu (\tau) = (a + b\tau)$ and the standard deviation is $\sigma (\tau)$ , where $\sigma (\tau) = \mathrm{cov}\times \mu (\mathrm{t})$ , and $\mathrm{cov} = 0.30$ . Because the mean of each month is slowly ramping up in this simulation, the associated standard deviation is also becoming larger with each month. The randomly generated demands are denoted as, $\mathrm{x}(1),\ldots ,\mathrm{x}(24)$ .

Assume $N = 12$ history months, $[x(1),\dots ,X(12)]$ , are available to generate the forecasts, and the next 12 demands, $[X(13),\dots ,X(24)]$ , are used to estimate the accuracy of the forecast. The fit of the demands has two coefficients, (a, b), and these are estimated as follows:

$$
b ^ {\prime} = \left[ \sum x \sum t - N \sum x t \right] / \left[ \left(\sum t\right) ^ {2} - N \sum t ^ {2} \right]
$$

$$
a ^ {\prime} = \left[ \sum x - b \sum t \right] / N
$$

Where the summations range from $t = 1$ to 12 and for brevity, the summations are:

$$
\sum x = \sum x (t) a n d \sum x t = \sum x (t) t.
$$

The fitted values for the history months are computed by,

$$
f (t) = a ^ {\prime} + b ^ {\prime} t \quad t = 1 \text {t o N}
$$

The level at $t = N$ becomes:

$$
a (1 2) = \left(a ^ {\prime} + 1 2 b ^ {\prime}\right)
$$

Table 8.7 Twelve months of demand history, $\mathrm{x}\left( \mathrm{t}\right)$ ,with one outlier demand and trend fit, f(t), and demand history with outlier removed, ${\mathrm{x}}^{\prime }\left( \mathrm{t}\right)$ , and resulting fit, ${\mathrm{f}}^{ * }\left( \mathrm{t}\right)$   

<table><tr><td colspan="3">Outlier</td><td colspan="2">No outlier</td></tr><tr><td>t</td><td>x(t)</td><td>f(t)</td><td>x(t)</td><td>f(t)</td></tr><tr><td>1</td><td>27</td><td>18.55</td><td>27</td><td>16.05</td></tr><tr><td>2</td><td>15</td><td>19.03</td><td>15</td><td>16.39</td></tr><tr><td>3</td><td>12</td><td>19.50</td><td>12</td><td>16.73</td></tr><tr><td>4</td><td>22</td><td>19.98</td><td>22</td><td>17.07</td></tr><tr><td>5</td><td>9</td><td>20.45</td><td>9</td><td>17.41</td></tr><tr><td>6</td><td>17</td><td>20.93</td><td>17</td><td>17.75</td></tr><tr><td>7</td><td>56</td><td>21.40</td><td>17</td><td>18.09</td></tr><tr><td>8</td><td>6</td><td>21.88</td><td>6</td><td>18.43</td></tr><tr><td>9</td><td>22</td><td>22.36</td><td>22</td><td>18.76</td></tr><tr><td>10</td><td>18</td><td>22.83</td><td>18</td><td>19.10</td></tr><tr><td>11</td><td>27</td><td>23.31</td><td>27</td><td>19.44</td></tr><tr><td>12</td><td>23</td><td>23.78</td><td>23</td><td>19.78</td></tr></table>

and so, the forecasts for the $\tau$ -th future month is,

$$
f (\tau) = a (1 2) + b \tau \quad \tau = 1 t o 1 2
$$

The forecast error is measured for each of the future 12 months by,

$$
\mathrm {e} (\tau) = \left(\mathrm {x} (\tau) - \mathrm {f} (\tau)\right) \quad \tau = 1 \text {t o} 1 2
$$

and the standard deviation is measured as follows,

$$
s = \sqrt {\sum e (t) ^ {2} / (1 2 - 1)}
$$

Because the projected average forecast for the future 12 months, $t = 13$ to 24, is $[a(12) + 6.5b]$ , the coefficient of variation is measured as below:

$$
\operatorname {c o v} = \mathrm {s} / \left[ \mathrm {a} (1 2) + 6. 5 \mathrm {b} ^ {\prime} \right]
$$

The 12 history demands, $[x(1),\dots,x(12)]$ , that includes an outlier, are listed in the 2nd column of Table 8.7 as $x(t)$ , and their associated fitted values, $f(t)$ , are in the 3rd column. The outlier is in month $t = 7$ where $x(7) = 56$ . The level and slope at $t = 12$ become: $a'(12) = 23.78$ and $b' = 0.47$ . The forecasts for the future 12 months are generated and the coefficient of variation becomes, $\mathrm{cov} = 0.501$ .

When the outlier is removed and adjusted to $x(7) = 17$ , say, the estimates of the level and slope at $t = 12$ become: $a^{\prime}(12) = 19.78$ and $b^{\prime} = 0.34$ . The forecasts are projected for the 12 future months and the coefficient of variation becomes, $\mathrm{cov} = 0.316$ .

![](images/ebb27cfa2e12cd69c1a7f44e56d50a3bcee84091ac9a74026f640e251620f90f.jpg)  
Fig. 8.3 Forecasts by trend regression model from trend demand pattern with an outlier

![](images/8df51231d91ae93eed82a4142898793b5facb10338e25ce891a25ad69a560bd6.jpg)  
Fig. 8.4 Forecasts by trend regression model from trend demand pattern with the outlier adjusted   
Figure 8.3 is a plot of the demands with the outlier and the projected forecast for the next 12 months. Figure 8.4 depicts the same demands when the outlier is removed and adjusted prior to forecasting, and projects the forecast for 12 future months.

# Summary

The more accurate the forecasts, the better the inventory decisions on when and how much stock to carry for each item in a stocking location. These decisions are vital to the profitability of the entity at all of its inventory locations. The coefficient of variation of the 1 month ahead forecast error is used to measure the forecast accuracy. A series of simulations are run to determine how the number of months of demand history affects the cov when the demand history is from a horizontal demand pattern and from a trend demand pattern. Another series of simulations are aimed at measuring the forecast accuracy depending on the parameters and the forecast model chosen for an item when the demand pattern is horizontal, trend or seasonal. Another series of simulations are run to measure how an outlier demand in the demand history influences the accuracy of the forecast.

# Chapter 9 Filtering Outliers

# 9.1 Introduction

A primary goal of forecasting is to measure the flow of demands from the history months and project to the future months with a minimum forecast error. A way to enhance this goal is by filtering the history demands to seek out any outlier demands and adjust accordingly. As demonstrated in the prior chapter, outlier demands cause much damage to the forecasts and increase the forecast error. Filtering of the demand history is not an easy process, but is important to yield forecasts with minimal forecast error. Reducing the forecast error will reduce the amount of safety stock needed to run the inventory operation. This chapter shows a way to seek out and adjust any outlier demands from the history months when the demand patterns are of the horizontal, trend or seasonal type. The filtering process takes place just prior to generating the forecasts.

Another way to minimize outlier demands is by filtering the line demands that occur in the order entry phase of the inventory stocking location. This is when the customers send in the purchase orders and list on each line of the order, a part number and a quantity. This part number request is a line demand and can be filtered to seek if it is an outlier. If an outlier is detected here, the line demand is sent back to the customer seeking verification on the quantity.

# 9.2 Horizontal Filtering

Suppose the horizontal demand pattern where $N$ history demand entries, $x(1), \ldots, x(N)$ , are to be used to generate a horizontal forecast. Prior to forecasting, the demands are filtered seeking if any outlier demands, and if so, the outlier is adjusted accordingly. A way to do this is described in the following seven steps.

# 9.2.1 Horizontal Filtering Algorithm (HFA)

1. For each $\mathrm{x(t)}$ , find the absolute average difference, called the difference measure and denoted as $\mathrm{d(t)}$ , from its closest neighbors as follows:

$$
\left. \mathrm {d} (t) = \left| \mathrm {x} (t) - 0. 5 \left[ \mathrm {x} (t - 1) + \mathrm {x} (t + 1) \right] \right| \text {f o r} t = 2 \text {t o N} - 1 \right.
$$

$$
\mathrm {d} (1) = | \mathrm {x} (1) - \mathrm {x} (2) | \quad \text {f o r} \mathrm {t} = 1
$$

$$
\mathrm {d} (\mathrm {N}) = | \mathrm {x} (\mathrm {N}) - \mathrm {x} (\mathrm {N} - 1) | \quad \text {f o r} \mathrm {t} = \mathrm {N}
$$

2. Locate the maximum $\mathrm{d(t)}$ , denoted as $\mathrm{dmx}$ , and call the month tmx where the associated demand is $\mathrm{x(tmx)}$ .

3. For month tmx, get the adjusted demand as the average of its closest neighbors as below:

$$
x ^ {\prime} (t m x) = [ x (t m x - 1) + x (t m x + 1) ] / 2 \quad i f t m x = 2 \text {t o N - 1}
$$

$$
x ^ {\prime} (t m x) = x (2) \quad i f t m x = 1
$$

$$
x ^ {\prime} (t m x) = x (N - 1) \quad i f t m x = N
$$

Let $\mathrm{x}^{\prime}(\mathrm{t}) = \mathrm{x}(\mathrm{t})$ for all months other than $\mathrm{t} = \mathrm{tmx}$ .

4. Using the N demands, $\mathrm{x}^{\prime}(\mathrm{t})$ , compute the fitted value $\mathrm{f(t)}$ using the horizontal model. For the horizontal forecast model, the fitted values for each history month is $\mathrm{f(t)} = \overline{x}$ , the average value.

5. Compute the residual errors, $\mathrm{e(t) = x^{\prime}(t) - f(t)}$ , for all months $t = 1$ to N.

6. Using the N residual errors, calculate the standard deviation estimate as,

$$
s = \sqrt {\sum e (t) ^ {2} / (N - 1)}
$$

7. Now compute a t-ratio as,

$$
\mathrm {T} = \left[ \mathrm {x} (\mathrm {t m x}) - \mathrm {f} (\mathrm {t m x}) \right] / \mathrm {s}
$$

8. Choose a limit $\mathrm{U}$ , say $\mathrm{U} = 3$ , to be compared to the absolute value of $\mathrm{T}$ to determine if the demand, $\mathrm{x(tmx)}$ is an outlier.

If $|\mathrm{T}| > \mathrm{U}$ , then $\mathbf{x}(\mathrm{tmx})$ is an outlier.

9. If $\mathrm{x}(\mathrm{tmx})$ is an outlier, repeat the steps, (1-8) for a limited number of cycles, Nc, per part number, perhaps two cycles. If $\mathrm{x}(\mathrm{tmx})$ is not an outlier, use the original series, $\mathrm{x}(t)t = 1$ to N, to generate the forecasts; else, use the adjusted series, $\mathrm{x}'(t)t = 1$ to N.

Example 9.1 Consider the $N = 12$ demand entries, as shown in Table 9.1 where the horizontal forecast model is to be applied. Assume the filtering parameters are $U = 3$ and $Nc = 1$ . This is an example where the history demands have no outliers. Below is a summary of the filtering algorithm for this example:

Table 9.1 Horizontal filtering worksheet, history months, t, demand history, x(t), difference measures, d(t), adjusted demands, x'(t), and fitted demands, f(t)   

<table><tr><td>t</td><td>x(t)</td><td>d(t)</td><td>x^t(t)</td><td>f(t)</td></tr><tr><td>1</td><td>29</td><td>20</td><td>29</td><td>16.33</td></tr><tr><td>2</td><td>9</td><td>8</td><td>9</td><td>16.33</td></tr><tr><td>3</td><td>5</td><td>11</td><td>5</td><td>16.33</td></tr><tr><td>4</td><td>23</td><td>6</td><td>23</td><td>16.33</td></tr><tr><td>5</td><td>29</td><td>17</td><td>29</td><td>16.33</td></tr><tr><td>6</td><td>1</td><td>26</td><td>27</td><td>16.33</td></tr><tr><td>7</td><td>25</td><td>23</td><td>25</td><td>16.33</td></tr><tr><td>8</td><td>3</td><td>16</td><td>3</td><td>16.33</td></tr><tr><td>9</td><td>13</td><td>6.5</td><td>13</td><td>16.33</td></tr><tr><td>10</td><td>10</td><td>1</td><td>10</td><td>16.33</td></tr><tr><td>11</td><td>5</td><td>9</td><td>5</td><td>16.33</td></tr><tr><td>12</td><td>18</td><td>13</td><td>18</td><td>16.33</td></tr></table>

1. Get $\mathrm{d}(\mathrm{t}) = 1$ to 12   
2. $\mathrm{dmx} = \max [\mathrm{d(t)}] = 26$

$$
\begin{array}{l} \mathrm {t m x} = 6 \\ \mathrm {x} (6) = 1 \\ \end{array}
$$

3. $x^{\prime}(t) = x(t)$ t=1 to 12,but not for $\mathfrak{t} = 6$

$$
x ^ {\prime} (6) = 0. 5 [ x (5) + x (7) ] = 0. 5 (2 9 + 2 5) = 2 7
$$

4. $\bar{x} = 16.33$

$$
f (t) = 1 6. 3 3 \quad t = 1 \text {t o} 1 2
$$

5. Get $e(t) = [x'(t) - f(t)]$ $t = 1$ to 12   
6. $s = 10.47$   
7. $\mathrm{T} = [\mathrm{x}(6) - \mathrm{f}(6)] / \mathrm{s} = [1 - 16.33] / 10.47 = -1.47$   
8. Since $|T| < U = 3$ , $x(6) = 1$ is not an outlier.   
9. Use $\mathrm{x(t)}$ $t = 1$ to 12 in forecasting.

Example 9.2 Consider the $N = 12$ demand entries, as shown in Table 9.2 where the horizontal forecast model is to be applied. The filtering parameters are $\mathrm{U} = 3$ and $\mathrm{Nc} = 1$ . This also is an example where the filtering process finds no outliers. Below is a summary of the filtering algorithm for this example:

1. Get $d(t)$ $t = 1$ to 12   
2. $\mathrm{dmx} = \max [\mathrm{d}(t)] = 24$

$$
\begin{array}{l} \mathrm {t m x} = 1 \\ \mathrm {x} (1) = 2 4 \\ \end{array}
$$

$$
\mathrm {x} ^ {\prime} (1) = \mathrm {x} (2) = 0
$$

$$
f (t) = 4. 1 7 \quad t = 1 \text {t o} 1 2
$$

3. $\mathrm{x}^{\prime}(\mathrm{t}) = \mathrm{x}(\mathrm{t})\quad \mathrm{t} = 1$ to 12, but not $t = 1$   
4. $\bar{x} = 4.17$   
5. Get $e(t) = [x^{\prime}(t) - f(t)]$ $t = 1$ to 12   
6. $s = 8.03$   
7. $\mathrm{T} = [\mathrm{x}(1) - \mathrm{f}(1)] / \mathrm{s} = [24 - 4.17] / 8.03 = 2.47$   
8. Since $|T| < U = 3$ , $x(1) = 24$ is not an outlier.   
9. Use $\mathrm{x(t)}$ $t = 1$ to 12 in forecasting.

Table 9.2 Horizontal filtering worksheet, history months, t, demand history, x(t), difference measure, d(t), adjusted demands, x'(t), fitted demands, f(t)   

<table><tr><td>t</td><td>x(t)</td><td>d(t)</td><td>x^t(t)</td><td>f(t)</td></tr><tr><td>1</td><td>24</td><td>24</td><td>0</td><td>4.17</td></tr><tr><td>2</td><td>0</td><td>12</td><td>0</td><td>4.17</td></tr><tr><td>3</td><td>0</td><td>6</td><td>0</td><td>4.17</td></tr><tr><td>4</td><td>12</td><td>1</td><td>12</td><td>4.17</td></tr><tr><td>5</td><td>22</td><td>16</td><td>22</td><td>4.17</td></tr><tr><td>6</td><td>0</td><td>18.5</td><td>0</td><td>4.17</td></tr><tr><td>7</td><td>15</td><td>15</td><td>15</td><td>4.17</td></tr><tr><td>8</td><td>0</td><td>7.5</td><td>0</td><td>4.17</td></tr><tr><td>9</td><td>0</td><td>0</td><td>0</td><td>4.17</td></tr><tr><td>10</td><td>0</td><td>0</td><td>0</td><td>4.17</td></tr><tr><td>11</td><td>0</td><td>0.5</td><td>0</td><td>4.17</td></tr><tr><td>12</td><td>1</td><td>1</td><td>1</td><td>4.17</td></tr></table>

Example 9.3 Consider the $N = 12$ demand entries, as shown in Table 9.3 where the horizontal forecast model is applied. The filtering parameters are the following: upper limit on $T$ is $U = 3.0$ and number of filter cycles is $Nc = 1$ . In this example, the filtering process finds one outlier at $t = 5$ . Below is a summary of the filtering algorithm for this example:

1. Get $\mathrm{d}(\mathrm{t})$ $\mathrm{t} = 1$ to 12   
2. $\mathrm{d}\mathbf{m}\mathbf{x} = \max [\mathrm{d}(t)] = 51.5$

$$
\begin{array}{l} \mathrm {t m x} = 5 \\ x (5) = 5 5 \\ \end{array}
$$

3. $\mathrm{x}^{\prime}(\mathrm{t}) = \mathrm{x}(\mathrm{t})\quad \mathrm{t} = 1$ to 12, but not for $t = 5$

$$
\mathrm {x} ^ {\prime} (5) = [ \mathrm {x} (4) + \mathrm {x} (6) ] / 2 = 3. 5
$$

4. $\bar{x} = 3.71$

$$
f (t) = 3. 7 1 \quad t = 1 \text {t o} 1 2
$$

5. Get $e(t) = [x^{\prime}(t) - f(t)]$ $t = 1$ to 12   
6. $s = 2.01$   
7. $\mathrm{T} = [\mathrm{x}(5) - \mathrm{f}(5)] / \mathrm{s} = [55 - 3.71] / 2.01 = 25.57$   
8. Since $|T| > U = 3$ , $x(5) = 55$ is an outlier.   
9. Because $\mathrm{Nc} = 1$ , the filtering process ends and use $\mathrm{x}^{\prime}(\mathrm{t})$ in forecasting.

Example 9.4 Consider the $N = 24$ demand entries, as shown in Table 9.4 where the horizontal forecast model is to be applied. The filtering parameters are the following: upper limit on T is $\mathrm{U} = 3.0$ and number of filter cycles is $\mathrm{Nc} = 2$ . Below is a summary of the filtering algorithm for this example. For this part's demand history, two outliers are detected. Table 9.4 is a worksheet for the first filtering cycle and Table 9.5 is the worksheet for second filtering cycle.

Table 9.3 Horizontal filtering worksheet, history months, t, demand history, x(t), difference measure, d(t), adjusted demands, x'(t), fitted demands, f(t)   

<table><tr><td>t</td><td>x(t)</td><td>d(t)</td><td>x^t(t)</td><td>f(t)</td></tr><tr><td>1</td><td>7</td><td>4</td><td>7</td><td>3.71</td></tr><tr><td>2</td><td>3</td><td>1.5</td><td>3</td><td>3.71</td></tr><tr><td>3</td><td>2</td><td>2.5</td><td>2</td><td>3.71</td></tr><tr><td>4</td><td>6</td><td>22.5</td><td>6</td><td>3.71</td></tr><tr><td>5</td><td>55</td><td>51.5</td><td>3.5</td><td>3.71</td></tr><tr><td>6</td><td>1</td><td>29.5</td><td>1</td><td>3.71</td></tr><tr><td>7</td><td>6</td><td>4.5</td><td>6</td><td>3.71</td></tr><tr><td>8</td><td>2</td><td>3</td><td>2</td><td>3.71</td></tr><tr><td>9</td><td>4</td><td>1.5</td><td>4</td><td>3.71</td></tr><tr><td>10</td><td>3</td><td>0</td><td>3</td><td>3.71</td></tr><tr><td>11</td><td>2</td><td>2</td><td>2</td><td>3.71</td></tr><tr><td>12</td><td>5</td><td>3</td><td>5</td><td>3.71</td></tr></table>

Table 9.4 Horizontal filtering worksheet of cycle 1 for Example 9.4, history months, t, demand history, x(t), difference measure, d(t), adjusted demands, x'(t), fitted demands, f(t)   

<table><tr><td>t</td><td>x(t)</td><td>d(t)</td><td>x^t(t)</td><td>f(t)</td></tr><tr><td>1</td><td>17</td><td>10</td><td>17</td><td>13.71</td></tr><tr><td>2</td><td>7</td><td>4</td><td>7</td><td>13.71</td></tr><tr><td>3</td><td>5</td><td>5.5</td><td>5</td><td>13.71</td></tr><tr><td>4</td><td>14</td><td>3.5</td><td>14</td><td>13.71</td></tr><tr><td>5</td><td>16</td><td>31</td><td>16</td><td>13.71</td></tr><tr><td>6</td><td>80</td><td>65</td><td>80</td><td>13.71</td></tr><tr><td>7</td><td>14</td><td>28</td><td>14</td><td>13.71</td></tr><tr><td>8</td><td>4</td><td>7.5</td><td>4</td><td>13.71</td></tr><tr><td>9</td><td>9</td><td>3.5</td><td>9</td><td>13.71</td></tr><tr><td>10</td><td>7</td><td>0</td><td>7</td><td>13.71</td></tr><tr><td>11</td><td>5</td><td>4</td><td>5</td><td>13.71</td></tr><tr><td>12</td><td>11</td><td>4</td><td>11</td><td>13.71</td></tr><tr><td>13</td><td>9</td><td>6.5</td><td>9</td><td>13.71</td></tr><tr><td>14</td><td>20</td><td>10</td><td>20</td><td>13.71</td></tr><tr><td>15</td><td>11</td><td>4.5</td><td>11</td><td>13.71</td></tr><tr><td>16</td><td>11</td><td>46.5</td><td>11</td><td>13.71</td></tr><tr><td>17</td><td>104</td><td>96</td><td>8.0</td><td>13.71</td></tr><tr><td>18</td><td>5</td><td>54</td><td>5</td><td>13.71</td></tr><tr><td>19</td><td>14</td><td>6</td><td>14</td><td>13.71</td></tr><tr><td>20</td><td>11</td><td>0.5</td><td>11</td><td>13.71</td></tr><tr><td>21</td><td>9</td><td>4.5</td><td>9</td><td>13.71</td></tr><tr><td>22</td><td>16</td><td>4.5</td><td>16</td><td>13.71</td></tr><tr><td>23</td><td>14</td><td>0</td><td>14</td><td>13.71</td></tr><tr><td>24</td><td>12</td><td>2</td><td>12</td><td>13.71</td></tr></table>

Table 9.5 Horizontal filtering worksheet of cycle 2 for Example 9.4, history months, t, demand history, x(t), difference measure, d(t), adjusted demands, x'(t), fitted demands, f(t)   

<table><tr><td>t</td><td>x(t)</td><td>d(t)</td><td>x^t(t)</td><td>f(t)</td></tr><tr><td>1</td><td>17</td><td>10</td><td>17</td><td>11.00</td></tr><tr><td>2</td><td>7</td><td>4</td><td>7</td><td>11.00</td></tr><tr><td>3</td><td>5</td><td>5.5</td><td>5</td><td>11.00</td></tr><tr><td>4</td><td>14</td><td>3.5</td><td>14</td><td>11.00</td></tr><tr><td>5</td><td>16</td><td>31</td><td>16</td><td>11.00</td></tr><tr><td>6</td><td>80</td><td>65</td><td>15.0</td><td>11.00</td></tr><tr><td>7</td><td>14</td><td>28</td><td>14</td><td>11.00</td></tr><tr><td>8</td><td>4</td><td>7.5</td><td>4</td><td>11.00</td></tr><tr><td>9</td><td>9</td><td>3.5</td><td>9</td><td>11.00</td></tr><tr><td>10</td><td>7</td><td>0</td><td>7</td><td>11.00</td></tr><tr><td>11</td><td>5</td><td>4</td><td>5</td><td>11.00</td></tr><tr><td>12</td><td>11</td><td>4</td><td>11</td><td>11.00</td></tr><tr><td>13</td><td>9</td><td>6.5</td><td>9</td><td>11.00</td></tr><tr><td>14</td><td>20</td><td>10</td><td>20</td><td>11.00</td></tr><tr><td>15</td><td>11</td><td>4.5</td><td>11</td><td>11.00</td></tr><tr><td>16</td><td>11</td><td>1.5</td><td>11</td><td>11.00</td></tr><tr><td>17</td><td>8</td><td>0</td><td>8</td><td>11.00</td></tr><tr><td>18</td><td>5</td><td>6</td><td>5</td><td>11.00</td></tr><tr><td>19</td><td>14</td><td>6</td><td>14</td><td>11.00</td></tr><tr><td>20</td><td>11</td><td>0.5</td><td>11</td><td>11.00</td></tr><tr><td>21</td><td>9</td><td>4.5</td><td>9</td><td>11.00</td></tr><tr><td>22</td><td>16</td><td>4.5</td><td>16</td><td>11.00</td></tr><tr><td>23</td><td>14</td><td>0</td><td>14</td><td>11.00</td></tr><tr><td>24</td><td>12</td><td>2</td><td>12</td><td>11.00</td></tr></table>

The nine filter steps of cycle 1 of Example 9.4 are below. The worksheet is Table 9.4.

1. Get $\mathrm{d}(\mathrm{t})$ $\mathrm{t} = 1$ to 24   
2. $\mathrm{d}\mathbf{m}\mathbf{x} = \max [\mathbf{d}(\mathbf{t})] = 96$

$$
\mathrm {t m x} = 1 7
$$

$$
\mathrm {x} (1 7) = 1 0 4
$$

$$
x ^ {\prime} (1 7) = [ x (1 6) + x (1 8) ] / 2 = 8. 0
$$

$$
f (t) = 1 3. 7 1 \quad t = 1 \text {t o} 2 4
$$

3. $\mathrm{x}^{\prime}(\mathrm{t}) = \mathrm{x}(\mathrm{t})\quad \mathrm{t} = 1$ to 24, but not $t = 17$   
4. $\bar{x} = 13.71$   
5. Get $e(t) = [x^{\prime}(t) - f(t)]$ $t = 1$ to 24   
6. $s = 15.07$   
7. $\mathrm{T} = [\mathrm{x}(17) - \mathrm{f}(17)] / \mathrm{s} = [104 - 13.71] / 15.07 = 5.99$   
8. Since $|T| > U = 3$ , $x(17) = 104$ is an outlier.   
9. Because $\mathrm{Nc} = 2$ , perform another filter cycle.

Below is a summary of the filtering cycle 2 for the part in Example 9.4. Note Table 9.5 where an outlier is detected in history month $t = 6$ .

The filter steps of cycle 2 of Example 9.4 are below. The worksheet is Table 9.5.

1. Set $\mathrm{x(t) = x^{\prime}(t)}$ from filter cycle 1 and get $\mathrm{d(t)}$ $\mathrm{t} = 1$ to 24   
2. $\mathrm{dmx} = \max [\mathrm{d(t)}] = 65$

$$
\mathrm {t m x} = 6
$$

$$
\mathrm {x} (6) = 8 0
$$

$$
x ^ {\prime} (6) = [ x (5) + x (7) ] / 2 = 1 5. 0
$$

$$
f (t) = 1 1. 0 0 \quad t = 1 \text {t o} 2 4
$$

3. $\mathrm{x}^{\prime}(\mathrm{t}) = \mathrm{x}(\mathrm{t})$ $\mathrm{t} = 1$ to 24, but not for $\mathrm{t} = 6$   
4. $\bar{x} = 11.00$   
5. Get $e(t) = [x^{\prime}(t) - f(t)]$ $t = 1$ to 24   
6. $s = 4,42$   
7. $\mathrm{T} = [\mathrm{x}(6) - \mathrm{f}(6)] / \mathrm{s} = [80 - 11.0] / 4.42 = 15.60$   
8. Since $|\mathrm{T}| > \mathrm{U} = 3$ , $\mathrm{x}(6) = 80$ is an outlier.   
9. Because $\mathrm{Nc} = 2$ , stop filtering and use $\mathrm{x}^{\prime}(\mathrm{t})$ in forecasting.

# 9.3 Trend Filtering

When the trend forecast model is to be applied for a part, the trend filtering algorithm (TFA) is applied to the demand history seeking and adjusting any outliers. The only difference between TFA and HFA is the method of generating the fitted values for the history months. The fitted values for HFA is simply the average value of the adjusted demand history, and for TFA, the fitted values is a trend flow over the history months. The trend filter algorithm is summarized below.

# 9.3.1 Trend Filtering Algorithm (TFA)

1. For each $\mathrm{x(t)}$ , find the absolute average difference, called the difference measure and denoted as $\mathrm{d(t)}$ , from its closest neighbors as follows:

$$
\mathrm {d} (t) = | \mathrm {x} (t) - 0. 5 [ \mathrm {x} (t - 1) + \mathrm {x} (t + 1) ] | \quad \text {f o r} t = 2 \text {t o N} - 1
$$

$$
\mathrm {d} (1) = | \mathrm {x} (1) - \mathrm {x} (2) | \quad \text {f o r} \mathrm {t} = 1
$$

$$
\mathrm {d} (\mathrm {N}) = | \mathrm {x} (\mathrm {N}) - \mathrm {x} (\mathrm {N} - 1) | \quad \text {f o r} \mathrm {t} = \mathrm {N}
$$

2. Locate the maximum $\mathrm{d(t)}$ , denoted as $\mathrm{dmx}$ , and call the month tmx where the associated demand is $\mathrm{x(tmx)}$ .

3. For month tmx, get the adjusted demand from the average of its closest neighbors as below:

$$
x ^ {\prime} (t m x) = [ x (t m x - 1) + x (t m x + 1) ] / 2 \quad i f t m x = 2 \text {t o N} - 1
$$

$$
x ^ {\prime} (t m x) = x (2) \quad i f t m x = 1
$$

$$
x ^ {\prime} (t m x) = x (N - 1) \quad i f t m x = N
$$

Let $\mathrm{x}^{\prime}(\mathrm{t}) = \mathrm{x}(\mathrm{t})$ for all months other than $\mathrm{t} = \mathrm{tmx}$ .

4. For the N demands, $\mathrm{x}^{\prime}(\mathrm{t})$ , compute the fitted value $\mathrm{f(t)}$ using the trend forecast model. For the trend forecast model, the fitted values for each history month is $\mathrm{f(t)} = (\mathrm{a}^{\prime} + \mathrm{b}^{\prime}\mathrm{t})$ , where a' and b' are estimates of the level and slope, respectively. One way to compute the level and slope is by way of the trend regression model as follows:

$$
\mathrm {b ^ {\prime} = \left[ \sum x \sum t - N \sum x t \right] / \left[ \left(\sum t\right) ^ {2} - N \sum t ^ {2} \right]}
$$

$$
\mathrm {a} ^ {\prime} = \left[ \sum \mathrm {x} - \mathrm {b} \sum \mathrm {t} \right] / \mathrm {N}
$$

where $\sum x = \sum x(t)$ and $\sum xt = \sum x(t)t$ and all the sums are for $t = 1$ to $N$ .

5. Compute the residual errors, $\mathrm{e(t) = x^{\prime}(t) - f(t)}$ , for all months $t = 1$ to N.

6. Using the N residual errors, calculate the standard deviation estimate as,

$$
s = \sqrt {\sum e (t) ^ {2} / (N - 2)}
$$

7. Now compute t-ratio as,

$$
\mathrm {T} = [ \mathrm {x (t m x)} - \mathrm {f (t m x)} ] / \mathrm {s}
$$

8. Choose a limit $\mathrm{U}$ , say $\mathrm{U} = 3$ , to be compared to $\mathrm{T}$ to determine if the demand, $\mathrm{x(tmx)}$ is an outlier.

If $|\mathrm{T}| > \mathrm{U}, \mathrm{x}(\mathrm{tmx})$ is an outlier.

9. If $\mathrm{x}(\mathrm{tmx})$ is an outlier, repeat the steps, (1-8) for a limited number of cycles, Nc, per part number, perhaps two cycles. If $\mathrm{x}(\mathrm{tmx})$ is not an outlier, use the original series, $\mathrm{x(t)} \mathrm{t} = 1$ to $\mathbf{N}$ to generate the forecasts; else, use the adjusted series, $\mathrm{x^{\prime}(t)}$ $\mathrm{t} = 1$ to $\mathbf{N}$ .

Example 9.5 Consider the $N = 24$ demand entries, as shown in Table 9.6 where the trend forecast model is under review. The filtering parameters are the following: upper limit on $T$ is $U = 3.0$ , and number of filter cycles is $Nc = 1$ . Below is a summary of the filtering algorithm for this example. For this part's demand history, no outlier is detected. The table is a worksheet for the filtering cycle.

Table 9.6 Trend filtering worksheet for Example 9.5, history months, t, demand history, x(t), difference measure, d(t), adjusted demands, x'(t), fitted demands, f(t)   

<table><tr><td>t</td><td>x(t)</td><td>d(t)</td><td>x^t(t)</td><td>f(t)</td></tr><tr><td>1</td><td>14</td><td>8.00</td><td>14</td><td>8.47</td></tr><tr><td>2</td><td>6</td><td>3.50</td><td>6</td><td>9.06</td></tr><tr><td>3</td><td>5</td><td>5.00</td><td>5</td><td>9.66</td></tr><tr><td>4</td><td>14</td><td>3.00</td><td>14</td><td>10.25</td></tr><tr><td>5</td><td>17</td><td>8.50</td><td>17</td><td>10.84</td></tr><tr><td>6</td><td>3</td><td>13.50</td><td>16.5</td><td>11.42</td></tr><tr><td>7</td><td>16</td><td>12.50</td><td>16</td><td>12.02</td></tr><tr><td>8</td><td>4</td><td>9.50</td><td>4</td><td>12.61</td></tr><tr><td>9</td><td>11</td><td>4.50</td><td>11</td><td>13.20</td></tr><tr><td>10</td><td>9</td><td>0.50</td><td>9</td><td>13.79</td></tr><tr><td>11</td><td>6</td><td>6.00</td><td>6</td><td>14.38</td></tr><tr><td>12</td><td>15</td><td>6.00</td><td>15</td><td>14.98</td></tr><tr><td>13</td><td>12</td><td>9.50</td><td>12</td><td>15.57</td></tr><tr><td>14</td><td>28</td><td>13.50</td><td>28</td><td>16.16</td></tr><tr><td>15</td><td>17</td><td>5.00</td><td>17</td><td>16.75</td></tr><tr><td>16</td><td>16</td><td>2.00</td><td>16</td><td>17.34</td></tr><tr><td>17</td><td>19</td><td>7.00</td><td>19</td><td>17.93</td></tr><tr><td>18</td><td>8</td><td>12.50</td><td>8</td><td>18.52</td></tr><tr><td>19</td><td>22</td><td>8.50</td><td>22</td><td>19.11</td></tr><tr><td>20</td><td>19</td><td>0.00</td><td>19</td><td>19.70</td></tr><tr><td>21</td><td>16</td><td>8.00</td><td>16</td><td>20.30</td></tr><tr><td>22</td><td>29</td><td>8.50</td><td>29</td><td>20.89</td></tr><tr><td>23</td><td>25</td><td>0.50</td><td>25</td><td>21.48</td></tr><tr><td>24</td><td>22</td><td>3.00</td><td>22</td><td>22.07</td></tr></table>

The filter steps of Example 9.5 are listed below. The worksheet is Table 9.6

1. Get $\mathrm{d}(t)$ $t = 1$ to 24   
2. $\mathrm{d}\mathbf{m}\mathbf{x} = \max [\mathrm{d}(t)] = 13.5$

$$
\mathrm {t m x} = 6
$$

$$
\mathrm {x} (6) = 3
$$

3. $\mathrm{x}^{\prime}(\mathrm{t}) = \mathrm{x}(\mathrm{t})\quad \mathrm{t} = 1$ to 24, but not for $t = 6$

$$
\mathrm {x} ^ {\prime} (6) = [ \mathrm {x} (5) + \mathrm {x} (7) ] / 2 = 1 6. 5
$$

4. $a^{\prime} = 7.88$

$$
b ^ {\prime} = 0. 5 9
$$

$$
f (t) = 7. 8 8 + 0. 5 9 t \quad f o r t = 1 t o 2 4
$$

$$
f (6) = 1 1. 4 2
$$

5. Get $e(t) = [x^{\prime}(t) - f(t)]$ $t = 1$ to 24   
6. $s = 5.64$   
7. $\mathrm{T} = [\mathrm{x}(6) - \mathrm{f}(6)] / \mathrm{s} = [3 - 11.42] / 5.64 = 1.49$   
8. Since $|\mathrm{T}| < \mathrm{U} = 3$ , $\mathrm{x}(6) = 3$ is not an outlier.   
9. Use $\mathbf{x}(t)$ in forecasting.

Table 9.7 Trend filtering worksheet for Example 9.6, history months, t, demand history, x(t), difference measure, d(t), adjusted demands, x'(t), fitted demands, f(t)   

<table><tr><td>t</td><td>x(t)</td><td>d(t)</td><td>x^t(t)</td><td>f(t)</td></tr><tr><td>1</td><td>14</td><td>8</td><td>14</td><td>11.42</td></tr><tr><td>2</td><td>6</td><td>3.5</td><td>6</td><td>11.36</td></tr><tr><td>3</td><td>5</td><td>5</td><td>5</td><td>11.31</td></tr><tr><td>4</td><td>14</td><td>3</td><td>14</td><td>11.26</td></tr><tr><td>5</td><td>17</td><td>29</td><td>17</td><td>11.20</td></tr><tr><td>6</td><td>78</td><td>61.5</td><td>16.5</td><td>11.15</td></tr><tr><td>7</td><td>16</td><td>25</td><td>16</td><td>11.09</td></tr><tr><td>8</td><td>4</td><td>9.5</td><td>4</td><td>11.04</td></tr><tr><td>9</td><td>11</td><td>4.5</td><td>11</td><td>10.98</td></tr><tr><td>10</td><td>9</td><td>0.5</td><td>9</td><td>10.93</td></tr><tr><td>11</td><td>6</td><td>6</td><td>6</td><td>10.88</td></tr><tr><td>12</td><td>15</td><td>9</td><td>15</td><td>10.82</td></tr></table>

Example 9.6 Consider the $N = 12$ demand entries, as shown in Table 9.7 where the trend forecast model is under review. The filtering parameters are the following: upper limit on $T$ is $U = 3.0$ and number of filter cycles is $Nc = 1$ . Below is a summary of the filtering algorithm for this example. For this part's demand history, an outlier is detected. The table is a worksheet for the filtering cycle.

Filter cycle 1 of Example 9.5:

1. Get d(t) $t = 1$ to 12   
2. $\mathrm{dmx} = \max [\mathrm{d(t)}] = 61.5$

$$
\mathrm {t m x} = 6
$$

$$
\mathrm {x} (6) = 7 8
$$

$$
\mathrm {x} ^ {\prime} (6) = [ \mathrm {x} (5) + \mathrm {x} (7) ] / 2 = 1 6. 5
$$

$$
b ^ {\prime} = - 0. 0 6
$$

$$
f (t) = (1 1. 4 8 - 0. 0 6 \times t) \quad f o r t = 1 \text {t o} 1 2
$$

$$
f (6) = 1 1. 1 5
$$

3. $\mathrm{x}^{\prime}(\mathrm{t}) = \mathrm{x}(\mathrm{t})\quad \mathrm{t} = 1$ to 12, but not for $t = 6$   
4. $a^{\prime} = 11.48$   
5. Get $e(t) = [x^{\prime}(t) - f(t)]$ $t = 1$ to 12   
6. $s = 5.13$   
7. $\mathrm{T} = [\mathrm{x}(6) - \mathrm{f}(6)] / \mathrm{s} = [78 - 11.15] / 5.13 = 13.02$   
8. Since $|T| > U = 3$ , $x(6) = 78$ is an outlier.   
9. Because $\mathrm{Nc} = 1$ , stop filtering and use $\mathrm{x}'(\mathrm{t})$ in forecasting.

# 9.4 Seasonal Filtering

# 9.4 Seasonal Filtering

When the seasonal multiplicative forecast model is to be applied for a part, the seasonal filtering algorithm (SFA) is run to the demand history for which it is seeking and adjusting any outliers. The only difference between SFA and the prior filtering algorithms (TFA, HFA) is the method of generating the fitted values for the history months. The fitted value for HFA is the average value of the adjusted demand history, and for TFA, the fitted value is the trend flow over the history months. For SFA, the fitted values require a seasonal flow where the coefficients for the level, a', slope, b', and 12 seasonal ratios, $\mathrm{r(j)}$ $j = 1$ to 12, are needed. For a review, the seasonal filter algorithm is summarized below.

# 9.4.1 Seasonal Filtering Algorithm (SFA)

1. For each $\mathrm{x(t)}$ , find the absolute average difference, called the difference measure and denoted as $\mathrm{d(t)}$ , from its closest neighbors as follows:

$$
\mathrm {d} (t) = | \mathrm {x} (t) - 0. 5 [ \mathrm {x} (t - 1) + \mathrm {x} (t + 1) ] | \quad \text {f o r} t = 2 \text {t o N} - 1
$$

$$
\mathrm {d} (1) = | \mathrm {x} (1) - \mathrm {x} (2) | \quad \text {f o r} \mathrm {t} = 1
$$

$$
\mathrm {d} (\mathrm {N}) = | \mathrm {x} (\mathrm {N}) - \mathrm {x} (\mathrm {N} - 1) | \quad \text {f o r} \mathrm {t} = \mathrm {N}
$$

2. Locate the maximum $\mathrm{d(t)}$ , denoted as $\mathrm{dmx}$ , and call the month tmx where the associated demand is $\mathrm{x(tmx)}$ .

3. For month tmx, get the adjusted demand as the average of its closest neighbors as below:

$$
x ^ {\prime} (t m x) = [ x (t m x - 1) + x (t m x + 1) ] / 2 \quad i f t m x = 2 \text {t o N} - 1
$$

$$
x ^ {\prime} (t m x) = x (2) \quad i f t m x = 1
$$

$$
x ^ {\prime} (t m s) = x (N - 1) \quad i f t m x = N
$$

Let $\mathbf{x}^{\prime}(t) = \mathbf{x}(t)$ for all months other than $t = t\mathrm{mx}$

4. For the N demands, $\mathrm{x}^{\prime}(\mathrm{t})$ , compute the fitted value $\mathrm{f(t)}$ . For the seasonal forecast model, the fitted values for each history month is $\mathrm{f(t) = (a^{\prime} + b^{\prime}t)r(t)}$ , where a' and b' are estimates of the level and slope, respectively, and $\mathrm{r(t)}$ is the seasonal ratio for month t. A way to compute the level and slope is by way of the seasonal model described in Chapter 5. A quick review is below:

At the start, the seasonal smoothing parameters $(\alpha, \beta, \gamma)$ are selected for the model. The nine stages to initialize the seasonal forecast model are listed below when the months of history is $N = 24$ :

1. $\mathrm{X}1 = [\mathrm{x}(1) + \dots +\mathrm{x}(12)] / 12$   
2. $\mathrm{X}2 = [\mathrm{x}(13) + \dots +\mathrm{x}(24)] / 12$   
3. $\mathrm{b}^{\backprime}(0) = [\mathrm{X}2 - \mathrm{X}1] / 12$   
4. $a^{\prime}(0) = X1 - 6.5b(0)$   
5. $a^{\prime}(t) = a^{\prime}(0) + b^{\prime}(0)t\quad t = 1$ to 24   
6. $\mathrm{r}^{\prime}(\mathrm{t}) = \mathrm{x}(\mathrm{t}) / \mathrm{a}^{\prime}(\mathrm{t})$ t=1 to 24   
7. $\mathrm{r(t) = [r^{\prime}(t) + r^{\prime}(t + 12)] / 2} \quad t = 1$ to 12   
8. $a(0) = a^{\prime}(0)$ and $b(0) = b^{\prime}(0)$   
9. Do the following for $t = 1$ to 24

$$
\begin{array}{l} a (t) = \alpha [ x (t) / r (t) ] + (1 - \alpha) [ a (t - 1) + b (t - 1) ] \\ b (t) = \beta [ a (t) - a (t - 1) ] + (1 - \beta) [ b (t - 1) ] \\ \mathrm {r} (t + 1 2) = \gamma [ \mathrm {x} (t) / \mathrm {a} (t) ] + (1 - \gamma) [ \mathrm {r} (t) ] \\ f (t) = a (t) r (1 2 + t) \\ \end{array}
$$

In this example,

5. Compute the residual errors, $\mathrm{e(t) = [x(t) - f(t)]}$ , for all months $t = 1$ to N.   
6. The standard deviation estimate is revised each history month, $t$ , as follows:

$$
\mathrm {s} (t) = \sqrt {\alpha e (t) ^ {2} + (1 - \alpha) s (t - 1) ^ {2}}
$$

7. The final standard deviation, $\mathrm{s(N)}$ , is used to compute T-ratio as below:

$$
\mathrm {T} = [ \mathrm {x (t m x)} - \mathrm {f (t m x)} ] / \mathrm {s (N)}
$$

8. Choose a limit $\mathrm{U}$ , say $\mathrm{U} = 3$ , to be compared to $\mathrm{T}$ to determine if the demand, $\mathrm{x(tmx)}$ is an outlier.

If $|\mathrm{T}| > \mathrm{U},\mathrm{x}(\mathrm{tmx})$ is an outlier.

9. If $\mathrm{x}(\mathrm{tmx})$ is an outlier, repeat the steps, (1-8) for a limited number of cycles, Nc, per part number, perhaps two cycles. If $\mathrm{x}(\mathrm{tmx})$ is not an outlier, use the original series, $\mathrm{x(t)} \mathrm{t} = 1$ to $\mathrm{N}$ to generate the forecasts; else, use the adjusted series, $\mathrm{x}'(\mathrm{t}) \mathrm{t} = 1$ to $\mathrm{N}$ .

Example 9.7 Consider the $N = 24$ demand entries, as shown in Table 9.8 where the seasonal forecast model is under review. The filtering parameters are the following: upper limit on T is $\mathrm{U} = 3.0$ , and number of filter cycles is $\mathrm{Nc} = 1$ . Below is a summary of the filtering algorithm for this example. For this part's demand history, an outlier is detected. The table is a worksheet for the filtering cycle.

# 9.4 Seasonal Filtering

Table 9.8 Seasonal filtering worksheet for Example 9.7, history months, t, demand history, x(t), difference measure, d(t), adjusted demands, x'(t), fitted demands, f(t)   

<table><tr><td>t</td><td>x(t)</td><td>d(t)</td><td>x^t(t)</td><td>f(t)</td></tr><tr><td>1</td><td>15</td><td>4</td><td>15</td><td>8.99</td></tr><tr><td>2</td><td>11</td><td>2</td><td>11</td><td>13.41</td></tr><tr><td>3</td><td>11</td><td>7.5</td><td>11</td><td>12.03</td></tr><tr><td>4</td><td>26</td><td>2.5</td><td>26</td><td>19.03</td></tr><tr><td>5</td><td>36</td><td>15.5</td><td>36</td><td>26.42</td></tr><tr><td>6</td><td>15</td><td>20.5</td><td>15</td><td>14.05</td></tr><tr><td>7</td><td>35</td><td>21</td><td>35</td><td>28.74</td></tr><tr><td>8</td><td>13</td><td>14</td><td>13</td><td>17.17</td></tr><tr><td>9</td><td>19</td><td>37.5</td><td>19</td><td>16.87</td></tr><tr><td>10</td><td>100</td><td>86</td><td>14.0</td><td>17.10</td></tr><tr><td>11</td><td>9</td><td>47</td><td>9</td><td>12.60</td></tr><tr><td>12</td><td>12</td><td>1.5</td><td>12</td><td>11.14</td></tr><tr><td>13</td><td>12</td><td>10</td><td>12</td><td>17.69</td></tr><tr><td>14</td><td>32</td><td>13</td><td>32</td><td>25.41</td></tr><tr><td>15</td><td>26</td><td>4</td><td>26</td><td>22.06</td></tr><tr><td>16</td><td>28</td><td>3.5</td><td>28</td><td>33.85</td></tr><tr><td>17</td><td>37</td><td>11</td><td>37</td><td>45.75</td></tr><tr><td>18</td><td>24</td><td>15.5</td><td>24</td><td>23.73</td></tr><tr><td>19</td><td>42</td><td>13</td><td>42</td><td>47.49</td></tr><tr><td>20</td><td>34</td><td>0.5</td><td>34</td><td>27.78</td></tr><tr><td>21</td><td>25</td><td>7.5</td><td>25</td><td>26.79</td></tr><tr><td>22</td><td>31</td><td>6.5</td><td>31</td><td>26.69</td></tr><tr><td>23</td><td>24</td><td>0.5</td><td>24</td><td>19.36</td></tr><tr><td>24</td><td>16</td><td>8</td><td>16</td><td>16.85</td></tr></table>

Filter cycle 1 of Example 9.7:

1. Get $d(t)$ $t = 1$ to 24   
2. $\mathrm{dmx} = \max [\mathrm{d(t)}] = 86$

$$
\mathrm {t m x} = 1 0
$$

$$
\mathrm {x} (1 0) = 1 0 0
$$

3. $\mathrm{x}^{\prime}(\mathrm{t}) = \mathrm{x}(\mathrm{t})\quad \mathrm{t} = 1$ to 24, but not for $t = 10$

$$
x ^ {\prime} (1 0) = [ x (9) + x (1 1) ] / 2 = 1 4. 0
$$

4. Run the initial stage of the seasonal forecast model for $t = 1$ to 24.

$$
\text {T h e f i t a t} = 1 0 \text {i s} f (1 0) = 1 7. 1 0.
$$

5. Get $\mathrm{e(t) = [x^{\prime}(t) - f(t)]}$ t=1 to 24   
6. $s = s(24) = 5.15$   
7. $\mathrm{T} = [\mathrm{x}(10) - \mathrm{f}(10)] / \mathrm{s} = [100 - 17.10] / 5.15 = 16.10$   
8. Since $|T| > U = 3$ , $x(10) = 100$ is an outlier.   
9. Because $\mathrm{Nc} = 1$ , stop filtering and use $\mathrm{x^{\prime}(t)}$ in forecasting.

![](images/482cda7fdffe6d5104bf9843beb9aeba8352f65a1410f7e9e6f9cbb7962a51ac.jpg)  
Fig. 9.1 Example 9.7 filtered demand history, $\mathrm{x}^{\prime}(\mathrm{t})$ , and fit, $\mathrm{f(t)}$ , for seasonal model   
Figure 9.1 is a depiction of the data from Example 9.7 with $N = 24$ months of demand history. The plot compares the adjusted demand entries, $\mathrm{x(t)}$ , and the fitted demands, $\mathrm{f(t)}$ , for each history month.

# 9.5 Filtering Line Demands in Order Entry

Another way to prevent outliers from occurring in the demand history is to filter the line demands at the order entry level stage early on, when the customers send in their orders. In order entry, the customer order is received with one or more line items. Each line is for a different part, and the line identifies the part and the quantity of the purchase. The quantity is here called the line demand and labeled as d. For month t, the number of lines for a part is denoted as n(t), and the total demands for the part is x(t). The i-th demand for the part in month t is denoted as $\mathrm{d}_{(\mathrm{i},\mathrm{t})}$ . For month t,

$$
\mathrm {x} (t) = \sum_ {i = 1} ^ {n (t)} d _ {(i, t)}
$$

It is impractical for most companies to save history on all the line demands, $\mathrm{d}_{(\mathrm{i},\mathrm{t})}$ , for each part in the inventory. Instead, most companies may save the history of monthly number of lines, $\mathrm{n(t)}$ , and the corresponding monthly demands, $\mathrm{x(t)}$ , for the prior N months of history.

With this history, it is possible to compute the average and standard deviation of the line demand, $\mathrm{d}$ . These are labeled as $\overline{d}$ for the average and $\mathrm{s_d}$ for the standard deviation. With these, the management can select a safety factor, $\mathbf{k}$ , (typically $\mathrm{k} = 3$ or 4), and compute lower and upper limits for each part number as follows:

$$
\mathrm {L L} = \bar {d} - \mathrm {k s} _ {\mathrm {d}}
$$

$$
\mathrm {U L} = \bar {d} + \mathrm {k s} _ {\mathrm {d}}
$$

The limits are then used in the order entry system to filter each incoming line demand, d, of the part in the following way:

$$
\mathrm {I f} \quad \mathrm {L L} \leq \mathsf {d} \leq \mathrm {U L}
$$

accept d

Table 9.9 Demand history for $N = 12$ months, where $\mathrm{t} =$ history months, $\mathrm{n(t)} =$ number lines in t, $\mathrm{x(t)} =$ demand in t, and $\mathrm{d}_{\mathrm{(i,t)}} =$ individual line demands in t   

<table><tr><td>t</td><td>n(t)</td><td>x(t)</td><td colspan="5">d(i,t)</td></tr><tr><td>1</td><td>4</td><td>6</td><td>2</td><td>2</td><td>1</td><td>1</td><td></td></tr><tr><td>2</td><td>4</td><td>7</td><td>1</td><td>2</td><td>2</td><td>2</td><td></td></tr><tr><td>3</td><td>0</td><td>0</td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>4</td><td>2</td><td>5</td><td>3</td><td>2</td><td></td><td></td><td></td></tr><tr><td>5</td><td>2</td><td>6</td><td>3</td><td>3</td><td></td><td></td><td></td></tr><tr><td>6</td><td>0</td><td>0</td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>7</td><td>5</td><td>8</td><td>1</td><td>2</td><td>2</td><td>1</td><td>2</td></tr><tr><td>8</td><td>2</td><td>3</td><td>1</td><td>2</td><td></td><td></td><td></td></tr><tr><td>9</td><td>3</td><td>4</td><td>1</td><td>1</td><td>2</td><td></td><td></td></tr><tr><td>10</td><td>4</td><td>9</td><td>2</td><td>3</td><td>3</td><td>1</td><td></td></tr><tr><td>11</td><td>3</td><td>6</td><td>3</td><td>1</td><td>2</td><td></td><td></td></tr><tr><td>12</td><td>1</td><td>3</td><td>3</td><td></td><td></td><td></td><td></td></tr></table>

if $\mathrm{d} < \mathrm{LL}$

verify d

if $d > UL$

verify d

Oftentimes, the lower limit is negative, whereby, only the line demands greater than the upper limit are filtered.

For notational convenience in the following developments, the number of lines over the N months of demand history is labeled as L where:

$$
\mathrm {L} = \sum_ {t = 1} ^ {N} n (t)
$$

The average and standard deviation of the line demands are computed as below:

$$
\bar {d} = \sum_ {t = 1} ^ {N} x (t) / \sum_ {t = 1} ^ {N} n (t)
$$

$$
s = \left\{\sum_ {t = 1} ^ {N} \left[ x (t) - n (t) \bar {d} \right] ^ {2} L / \left[ L ^ {2} - \sum_ {t = 1} ^ {N} n (t) ^ {2} \right] \right\} ^ {0. 5}
$$

The mathematical verification of this result is provided subsequently in this chapter.

Example 9.8 Consider a part with $N = 12$ months of demand history as shown in Table 9.9. The table lists the months of history, $t$ , the number of lines in the month, $n(t)$ , the demand in the month, $x(t)$ , and the individual line demands per month as $d_{(i,t)}$ for $i = 1$ to $n(t)$ . The management wants to establish lower and upper limits on future incoming line demands, $d$ . For this example, assume the safety factor

is set to $k = 3.0$ . The computations are below where the summations range from $t = 1$ to $N$ .

$$
\sum \mathrm {n} (t) = 3 0
$$

$$
\sum \mathrm {x} (t) = 5 7
$$

$$
\sum \mathrm {n} (\mathrm {t}) ^ {2} = 1 0 4
$$

$$
\bar {d} = \sum \mathrm {x (t)} / \sum \mathrm {n (t)} = 1. 9 0
$$

$$
\mathrm {S} _ {\mathrm {d}} = \left\{\sum \left[ \mathrm {x (t)} - \mathrm {n (t)} \bar {d} \right] ^ {2} \mathrm {L} / \left[ \mathrm {L} ^ {2} - \sum \mathrm {n (t)} ^ {2} \right] \right\} ^ {0. 5} = 0. 8 3
$$

$$
\mathrm {L L} = \overline {{d}} - \mathrm {k s} _ {\mathrm {d}} = - 0. 5 9
$$

$$
\mathrm {U L} = \bar {d} + \mathrm {k s} _ {\mathrm {d}} = 4. 3 9
$$

Since the lower limit, LL, is negative, the lower limit is reset to $\mathrm{LL} = 0$ . Also, because, the upper limit is not an integer, it is set to the next higher integer, $\mathrm{UL} = 5$ . So, the order entry system for this part would filter each line demand, d, in the following way:

If $d \leq 5$ , the line demand is accepted.

If $\mathrm{d} > 5$ , the line is returned to the customer for verification.

# 9.6 Derivation of Mean and Standard Deviation of Line Demands

In the following verification, the notation for the true mean and variance of the line demand, $\mathrm{d}$ , are denoted as $\mu$ and $\sigma^2$ , respectively. The corresponding estimates are labeled as: $\overline{d}$ and $s_d^2$ . The goal here is to find unbiased estimates of the true mean and variance using only the demand history data listed below:

$\mathrm{x(t)} =$ demands in month t for $\mathrm{t} = 1$ to N

$\mathrm{n(t)} =$ number of lines in month t for $\mathrm{t} = 1$ to N

For each month $t$ , the demands consist of the sum of all line demands in the month as follows:

$$
\mathrm {x} (t) = \left[ d _ {(1, t)} + \dots + d _ {(n (t), t)} \right] \quad f o r t = 1 \text {t o N}
$$

The line demands, $\mathrm{d}_{(\mathrm{i},\mathrm{t})}$ are not known and only the quantities, $\mathrm{n(t)}$ and $\mathrm{x(t)}$ are known.

The average of the line demands is computed as follows:

$$
\bar {d} = \sum_ {t = 1} ^ {N} x (t) / \sum_ {t = 1} ^ {N} n (t)
$$

The expected value of $\overline{d}$ is obtained below.

$$
\mathrm {E} (\bar {d}) = \mathrm {E} \left[ \sum_ {t = 1} ^ {N} x (t) / \sum_ {t = 1} ^ {N} n (t) \right] = \sum_ {t = 1} ^ {N} n (t) \mu / \sum_ {t = 1} ^ {N} n (t) = \mu
$$

Thereby, the average, $\overline{d}$ , is an unbiased estimator of the true mean, $\mu$ .

For notational ease, let $\mathrm{L}$ represent the total number of lines in the $\mathrm{N}$ months of history, whereby,

$$
\mathrm {L} = \sum_ {t = 1} ^ {N} n (t)
$$

Note, the expected value of $\mathrm{x(t)}$ is below.

$$
\operatorname {E} [ \mathrm {x} (t) ] = \mathrm {n} (t) \mu ,
$$

The square of the residual error, $\left[\mathrm{x(t) - n(t)\overline{d}}\right]^2$ , is listed below.

$$
[ \mathrm {x} (t) - \mathrm {n} (t) \bar {d} ] ^ {2} = [ \mathrm {x} (t) ^ {2} ] + [ (\mathrm {n} (t) \bar {d}) ^ {2} ] - 2 [ \mathrm {x} (t) \mathrm {n} (t) \bar {d} ]
$$

From the above expression, the expected values of the three components on the right-hand-side are listed below.

$$
\mathrm {E} [ \mathrm {x} (\mathrm {t}) ^ {2} ] = \mathrm {n} (\mathrm {t}) [ \mathrm {n} (\mathrm {t}) \mu^ {2} + \sigma^ {2} ]
$$

$$
\mathrm {E} \left[ (\mathrm {n} (\mathrm {t}) \bar {d}) ^ {2} \right] = \mathrm {n} (\mathrm {t}) ^ {2} \left[ \mu^ {2} + \sigma^ {2} / \mathrm {L} \right]
$$

$$
\operatorname {E} [ \mathrm {x} (t) \mathrm {n} (t) \bar {d} ] = \mathrm {n} (t) ^ {2} \left[ \mu^ {2} + \sigma^ {2} / \mathrm {L} \right]
$$

Thereby,

$$
\mathrm {E} \left(\left[ \mathrm {x} (\mathrm {t}) - \mathrm {n} (\mathrm {t}) \bar {d} \right] ^ {2}\right) = \sigma^ {2} \left[ \mathrm {L} ^ {2} - \sum \mathrm {n} (\mathrm {t}) ^ {2} \right] / \mathrm {L}
$$

Replacing $\sigma^2$ with $\mathrm{s_d}^2$ , the estimate of the variance becomes:

$$
\mathrm {s} _ {\mathrm {d}} ^ {2} = \sum_ {t = 1} ^ {N} \left[ \mathrm {x} (\mathrm {t}) - \mathrm {n} (\mathrm {t}) \bar {d} \right] ^ {2} \mathrm {L} / \left[ \mathrm {L} ^ {2} - \sum_ {t = 1} ^ {N} n (\mathrm {t}) ^ {2} \right]
$$

since the expected value is unbiased as shown below.

$$
\mathrm {E} \left[ \mathrm {S} _ {\mathrm {d}} ^ {2} \right] = \mathrm {E} \left\{\sum_ {t = 1} ^ {N} \left[ x (t) - \mathrm {n} (\mathrm {t}) \bar {d} \right] ^ {2} \mathrm {L} / \left[ \mathrm {L} ^ {2} - \sum_ {t = 1} ^ {N} n (t) ^ {2} \right] \right\} = \sigma^ {2}
$$

# Summary

Prior to forecasting, the history of monthly demands are filtered seeking out any outlier demands, and if found, the outliers are adjusted accordingly. Filtering is not easy, but is important to generate forecasts with minimal forecast error. The filtering methods described here are developed when the demands follow a horizontal demand pattern, a trend demand pattern and a seasonal demand pattern. Another phase of filtering the demands, occurs in the order entry of the inventory location. This is when the orders come in from customers and the purchase order states a part number and quantity. The quantity is verified to be statistically consistent with those from the part's history of demands. Any line demand detected as an outlier is sent back to the customer for verification.

# Chapter 10 Standard Normal and Truncated Normal Distributions

# 10.1 Introduction

The normal distribution is perhaps the most commonly used probability distribution in materials management as well as in many other scientific developments. This chapter shows how the variable $\mathbf{X}$ , from the normal, is related to the standard normal distribution with variable $\mathbf{Z}$ . A portion of the standard normal contains all values of $(z > k)$ where $k$ is a specific value of $z$ . Of particular interest in subsequent use is the partial mean and partial standard deviation of the measure $(z - k)$ from this portion of the standard normal. Another useful distribution is the truncated normal that also is defined with a parameter $k$ . This distribution has many shapes and a measure of interest is the coefficient of variation, cov, that helps to identify the shape of the distribution. The two distributions, standard normal and truncated normal, have applications in inventory control and examples on how they are used appears in Chaps. 11 and 12.

# 10.2 Normal Distribution

A variable $x$ with a normal distribution has a mean $\mu$ , standard deviation $\sigma$ , and is labeled as: $x \sim N(\mu, \sigma^2)$ . The distribution appears as bell shaped as depicted in Fig. 10.1. The range of $x$ is almost always from $(\mu - 3\sigma)$ to $(\mu + 3\sigma)$ and the most likely value is $\mu$ .

![](images/d3cd87ae15649f004f6ec4e3f8a4c9f89145a0dcd0b84ca6e87d36062f34d3d4.jpg)  
Fig. 10.1 The normal distribution of $\mathrm{x}\sim \mathrm{N}(\mu ,\sigma^2)$

# 10.3 Standard Normal Distribution

A companion distribution is the standard normal distribution with variable $z$ that has a mean of zero, standard deviation of one, and thereby is denoted as: $z \sim N(0, 1)$ . The variable $z$ is related to $x$ in the following way:

$$
z = (x - \mu) / \sigma
$$

and

$$
\mathrm {x} = \mu + z \sigma
$$

# 10.3.1 Probability Density

If $k$ is a particular value of $z$ , the probability density at $z = k$ , denoted as $f(k)$ , is

$$
f (k) = 1 / \sqrt {2 \pi} e ^ {- k ^ {2} / 2}
$$

# 10.3.2 Cumulative Distribution Function

The cumulative probability distribution at $z = k$ is the following;

$$
\mathrm {F} (\mathrm {k}) = \int_ {- \infty} ^ {k} f (z) d z
$$

This is the probability that $z$ is less or equal to $k$ .

The complement of $\mathrm{F}(\mathrm{k})$ is noted as $\mathrm{H}(\mathrm{k})$ , the probability of $\mathrm{z}$ larger than $\mathrm{k}$ , and is obtained as follows:

$$
\begin{array}{l} \mathrm {H} (k) = \int_ {k} ^ {\infty} f (z) d z \\ = 1 - F (k) \\ \end{array}
$$

Figure 10.2 shows the relation of $z, k, f(k), F(k)$ and $H(k)$ .

# 10.4 Partial Measures

![](images/45c2bb1dad94cd31adaf0af46e0678fbbcceb8e914f3a6372677c4004681e182.jpg)  
Fig. 10.2 Some measures from the standard normal distribution

# 10.4 Partial Measures

The partial measures of the standard normal depend on a parameter $k$ , a particular value of the random variable $z$ . Of importance is the portion of the standard normal that is larger than $k$ , whereby the variable is denoted as $(z > k)$ . Of particular interest is the mean and standard deviation of $(z > k)$ . These are denoted as $\mu_{\mathrm{p}}(k)$ and $\sigma_{\mathrm{p}}(k)$ , respectively. The mean is commonly referred as the partial expectation and labeled as $\operatorname{E}(z > k)$ for which, $\mu_{\mathrm{p}}(k) = \operatorname{E}(z > k)$ , and the standard deviation is called the partial standard deviation. These measures are used in inventory control applications as described in Chaps. 11 and 12.

# 10.4.1 Partial Expectation

The partial expectation of $z$ -greater-than- $k$ is here denoted at $\operatorname{E}(z > k)$ . This measures is derived as follows:

$$
\mathrm {E} (z > k) = \int_ {k} ^ {\infty} (z - k) f (z) d z
$$

For notational ease, the mean of the partial normal is labeled here as $\mu_{\mathrm{p}}(\mathbf{k})$ , where,

$$
\mu_ {p} (k) = E (z > k)
$$

# 10.4.2 Partial Standard Deviation

The partial variance with parameter $k$ is also a useful measure in subsequent analysis. This is computed by,

$$
\sigma_ {p} (k) ^ {2} = E \left[ (z > k) ^ {2} \right] - \left[ E (z > k) \right] ^ {2}
$$

where,

$$
\mathrm {E} \left[ (\mathrm {z} > \mathrm {k}) ^ {2} \right] = \int_ {k} ^ {\infty} (z - k) ^ {2} f (z) d z
$$

The partial standard deviation is simply $\sigma_{\mathrm{p}}(\mathbf{k})$

# 10.4.3 Partial When $(x > x_{o})$

In the event $\mathbf{x}$ is normally distributed with $\mathrm{x} \sim N(\mu, \sigma^2)$ , and a partial measure of $(\mathrm{x} > \mathrm{x}_0)$ is of interest, the partial expectation, variance and standard deviation of $(\mathrm{x} > \mathrm{x}_0)$ are obtained as below. First note that $\mathrm{k} = \left[ \mathrm{x}_0 - \mu \right] / \sigma$ .

$$
\mathrm {E} (\mathrm {x} > \mathrm {x} _ {\mathrm {o}}) = \mathrm {E} (\mathrm {z} > \mathrm {k}) \sigma
$$

$$
V (x > x _ {0}) = V (z > k) \sigma^ {2}
$$

and,

$$
\sigma_ {\left(x > x _ {0}\right)} = \sigma_ {P} (k) \sigma
$$

# 10.4.4 Table Measures

Table 10.1 lists selected values from the standard normal distribution $[k, F(k), H(k), f(k)]$ , and related partial measures $\left[\mu_{P}(k), \sigma_{P}(k)\right]$ . The final three columns list values from the truncated normal distribution, $\left[\mu_{T}(k), \sigma_{T}(k), c_{T}(k)\right]$ , which are described subsequently.

# 10.5 Truncated Normal Distribution

Consider the truncated standard normal distribution with $k$ a location parameter where only the values of $z$ greater than $k$ are included. Another variable, $t$ , is defined where $t = z - k$ and $t > 0$ . The probability density of $t$ with parameter $k$ is here denoted as $g_k(t)$ where,

$$
\mathrm {g} _ {\mathrm {k}} (\mathrm {t}) = \mathrm {f} (\mathrm {z}) / \mathrm {H} (\mathrm {k}) \quad \mathrm {t} > 0 \text {a n d} \mathrm {t} = \mathrm {z} - \mathrm {k}
$$

For a particular value of $t$ , say $t_1$ , the corresponding value of $z$ is $z_1 = t_1 + k$ . The cumulative probability of $t_1$ , denoted as $G_k(t_1)$ , is obtained from,

$$
\mathrm {G} _ {\mathrm {k}} \left(\mathrm {t} _ {1}\right) = \int_ {0} ^ {t 1} \mathrm {g} _ {k} (t) d t
$$

The truncated expectancies, $\mathrm{E(t)}$ and $\mathrm{E}(t^2)$ , are obtained as below:

$$
\mathrm {E} (t) = \int_ {0} ^ {\infty} t g _ {k} (t) d t
$$

$$
\mathrm {E} \left(t ^ {2}\right) = \int_ {0} ^ {\infty} t ^ {2} g _ {k} (t) d t
$$

Table 10.1 Some statistics from the Standard Normal Distribution, $\left[\mathrm{F}(\mathrm{k}),\mathrm{H}(\mathrm{k}),\mathrm{f}(\mathrm{k})\right]$ , Partial Measures, $[\mu_{\mathrm{p}}(\mathrm{k}),\sigma_{\mathrm{p}}(\mathrm{k})]$ , and from the Truncated Normal Distribution $[\mu_{\mathrm{T}}(\mathrm{k}),\sigma_{\mathrm{T}}(\mathrm{k}),\mathrm{c}_{\mathrm{T}}(\mathrm{k})]$   

<table><tr><td>K</td><td>F(k)</td><td>H(k)</td><td>f(k)</td><td>μp(k)</td><td>σp(k)</td><td>μT(k)</td><td>σT(k)</td><td>ct(k)</td></tr><tr><td>-3.0</td><td>0.001</td><td>0.999</td><td>0.004</td><td>3.000</td><td>0.999</td><td>3.004</td><td>0.993</td><td>0.331</td></tr><tr><td>-2.9</td><td>0.002</td><td>0.998</td><td>0.006</td><td>2.901</td><td>0.998</td><td>2.906</td><td>0.991</td><td>0.341</td></tr><tr><td>-2.8</td><td>0.003</td><td>0.997</td><td>0.008</td><td>2.801</td><td>0.998</td><td>2.808</td><td>0.989</td><td>0.352</td></tr><tr><td>-2.7</td><td>0.003</td><td>0.997</td><td>0.010</td><td>2.701</td><td>0.997</td><td>2.710</td><td>0.986</td><td>0.364</td></tr><tr><td>-2.6</td><td>0.005</td><td>0.995</td><td>0.014</td><td>2.601</td><td>0.996</td><td>2.614</td><td>0.982</td><td>0.376</td></tr><tr><td>-2.5</td><td>0.006</td><td>0.994</td><td>0.018</td><td>2.502</td><td>0.994</td><td>2.518</td><td>0.978</td><td>0.388</td></tr><tr><td>-2.4</td><td>0.008</td><td>0.992</td><td>0.022</td><td>2.403</td><td>0.993</td><td>2.423</td><td>0.972</td><td>0.401</td></tr><tr><td>-2.3</td><td>0.011</td><td>0.989</td><td>0.028</td><td>2.304</td><td>0.990</td><td>2.329</td><td>0.966</td><td>0.415</td></tr><tr><td>-2.2</td><td>0.014</td><td>0.986</td><td>0.035</td><td>2.205</td><td>0.988</td><td>2.236</td><td>0.959</td><td>0.429</td></tr><tr><td>-2.1</td><td>0.018</td><td>0.982</td><td>0.044</td><td>2.106</td><td>0.984</td><td>2.145</td><td>0.951</td><td>0.443</td></tr><tr><td>-2.0</td><td>0.023</td><td>0.977</td><td>0.054</td><td>2.008</td><td>0.980</td><td>2.055</td><td>0.942</td><td>0.458</td></tr><tr><td>-1.9</td><td>0.029</td><td>0.971</td><td>0.066</td><td>1.911</td><td>0.975</td><td>1.968</td><td>0.931</td><td>0.473</td></tr><tr><td>-1.8</td><td>0.036</td><td>0.964</td><td>0.079</td><td>1.814</td><td>0.969</td><td>1.882</td><td>0.920</td><td>0.489</td></tr><tr><td>-1.7</td><td>0.045</td><td>0.955</td><td>0.094</td><td>1.718</td><td>0.961</td><td>1.798</td><td>0.907</td><td>0.504</td></tr><tr><td>-1.6</td><td>0.055</td><td>0.945</td><td>0.111</td><td>1.623</td><td>0.953</td><td>1.717</td><td>0.894</td><td>0.520</td></tr><tr><td>-1.5</td><td>0.067</td><td>0.933</td><td>0.130</td><td>1.529</td><td>0.943</td><td>1.639</td><td>0.879</td><td>0.536</td></tr><tr><td>-1.4</td><td>0.081</td><td>0.919</td><td>0.150</td><td>1.437</td><td>0.931</td><td>1.563</td><td>0.863</td><td>0.552</td></tr><tr><td>-1.3</td><td>0.097</td><td>0.903</td><td>0.171</td><td>1.346</td><td>0.918</td><td>1.490</td><td>0.847</td><td>0.569</td></tr><tr><td>-1.2</td><td>0.115</td><td>0.885</td><td>0.194</td><td>1.256</td><td>0.902</td><td>1.419</td><td>0.830</td><td>0.585</td></tr><tr><td>-1.1</td><td>0.136</td><td>0.864</td><td>0.218</td><td>1.169</td><td>0.886</td><td>1.352</td><td>0.812</td><td>0.601</td></tr><tr><td>-1.0</td><td>0.159</td><td>0.841</td><td>0.242</td><td>1.083</td><td>0.867</td><td>1.288</td><td>0.794</td><td>0.616</td></tr><tr><td>-0.9</td><td>0.184</td><td>0.816</td><td>0.266</td><td>1.000</td><td>0.846</td><td>1.226</td><td>0.775</td><td>0.632</td></tr><tr><td>-0.8</td><td>0.212</td><td>0.788</td><td>0.290</td><td>0.920</td><td>0.823</td><td>1.168</td><td>0.756</td><td>0.647</td></tr><tr><td>-0.7</td><td>0.242</td><td>0.758</td><td>0.312</td><td>0.843</td><td>0.799</td><td>1.112</td><td>0.736</td><td>0.662</td></tr><tr><td>-0.6</td><td>0.274</td><td>0.726</td><td>0.333</td><td>0.769</td><td>0.772</td><td>1.059</td><td>0.717</td><td>0.677</td></tr><tr><td>-0.5</td><td>0.309</td><td>0.691</td><td>0.352</td><td>0.698</td><td>0.744</td><td>1.009</td><td>0.697</td><td>0.691</td></tr><tr><td>-0.4</td><td>0.345</td><td>0.655</td><td>0.368</td><td>0.630</td><td>0.714</td><td>0.962</td><td>0.678</td><td>0.705</td></tr><tr><td>-0.3</td><td>0.382</td><td>0.618</td><td>0.381</td><td>0.567</td><td>0.683</td><td>0.917</td><td>0.659</td><td>0.718</td></tr><tr><td>-0.2</td><td>0.421</td><td>0.579</td><td>0.391</td><td>0.507</td><td>0.651</td><td>0.875</td><td>0.640</td><td>0.731</td></tr><tr><td>-0.1</td><td>0.460</td><td>0.540</td><td>0.397</td><td>0.451</td><td>0.618</td><td>0.835</td><td>0.621</td><td>0.744</td></tr><tr><td>0.0</td><td>0.500</td><td>0.500</td><td>0.399</td><td>0.399</td><td>0.584</td><td>0.798</td><td>0.603</td><td>0.756</td></tr><tr><td>0.1</td><td>0.540</td><td>0.460</td><td>0.397</td><td>0.351</td><td>0.549</td><td>0.763</td><td>0.585</td><td>0.767</td></tr><tr><td>0.2</td><td>0.579</td><td>0.421</td><td>0.391</td><td>0.307</td><td>0.515</td><td>0.729</td><td>0.568</td><td>0.778</td></tr><tr><td>0.3</td><td>0.618</td><td>0.382</td><td>0.381</td><td>0.267</td><td>0.481</td><td>0.698</td><td>0.551</td><td>0.789</td></tr><tr><td>0.4</td><td>0.655</td><td>0.345</td><td>0.368</td><td>0.230</td><td>0.446</td><td>0.669</td><td>0.534</td><td>0.799</td></tr><tr><td>0.5</td><td>0.691</td><td>0.309</td><td>0.352</td><td>0.198</td><td>0.413</td><td>0.641</td><td>0.518</td><td>0.808</td></tr><tr><td>0.6</td><td>0.726</td><td>0.274</td><td>0.333</td><td>0.169</td><td>0.380</td><td>0.615</td><td>0.503</td><td>0.817</td></tr><tr><td>0.7</td><td>0.758</td><td>0.242</td><td>0.312</td><td>0.143</td><td>0.349</td><td>0.590</td><td>0.488</td><td>0.826</td></tr><tr><td>0.8</td><td>0.788</td><td>0.212</td><td>0.290</td><td>0.120</td><td>0.318</td><td>0.567</td><td>0.473</td><td>0.834</td></tr><tr><td>0.9</td><td>0.816</td><td>0.184</td><td>0.266</td><td>0.100</td><td>0.289</td><td>0.546</td><td>0.460</td><td>0.842</td></tr><tr><td>1.0</td><td>0.841</td><td>0.159</td><td>0.242</td><td>0.083</td><td>0.262</td><td>0.525</td><td>0.446</td><td>0.850</td></tr><tr><td>1.1</td><td>0.864</td><td>0.136</td><td>0.218</td><td>0.069</td><td>0.236</td><td>0.506</td><td>0.433</td><td>0.857</td></tr><tr><td>1.2</td><td>0.885</td><td>0.115</td><td>0.194</td><td>0.056</td><td>0.211</td><td>0.488</td><td>0.421</td><td>0.863</td></tr><tr><td>1.3</td><td>0.903</td><td>0.097</td><td>0.171</td><td>0.046</td><td>0.189</td><td>0.470</td><td>0.409</td><td>0.870</td></tr><tr><td>1.4</td><td>0.919</td><td>0.081</td><td>0.150</td><td>0.037</td><td>0.168</td><td>0.454</td><td>0.398</td><td>0.876</td></tr><tr><td>1.5</td><td>0.933</td><td>0.067</td><td>0.130</td><td>0.029</td><td>0.148</td><td>0.439</td><td>0.387</td><td>0.882</td></tr><tr><td>1.6</td><td>0.945</td><td>0.055</td><td>0.111</td><td>0.023</td><td>0.131</td><td>0.424</td><td>0.376</td><td>0.887</td></tr><tr><td>1.7</td><td>0.955</td><td>0.045</td><td>0.094</td><td>0.018</td><td>0.115</td><td>0.410</td><td>0.366</td><td>0.892</td></tr><tr><td>1.8</td><td>0.964</td><td>0.036</td><td>0.079</td><td>0.014</td><td>0.100</td><td>0.397</td><td>0.356</td><td>0.897</td></tr><tr><td>1.9</td><td>0.971</td><td>0.029</td><td>0.066</td><td>0.011</td><td>0.087</td><td>0.385</td><td>0.347</td><td>0.902</td></tr><tr><td>2.0</td><td>0.977</td><td>0.023</td><td>0.054</td><td>0.008</td><td>0.075</td><td>0.373</td><td>0.338</td><td>0.906</td></tr><tr><td>2.1</td><td>0.982</td><td>0.018</td><td>0.044</td><td>0.006</td><td>0.065</td><td>0.362</td><td>0.330</td><td>0.910</td></tr><tr><td>2.2</td><td>0.986</td><td>0.014</td><td>0.035</td><td>0.005</td><td>0.056</td><td>0.351</td><td>0.321</td><td>0.914</td></tr><tr><td>2.3</td><td>0.989</td><td>0.011</td><td>0.028</td><td>0.004</td><td>0.048</td><td>0.341</td><td>0.313</td><td>0.918</td></tr><tr><td>2.4</td><td>0.992</td><td>0.008</td><td>0.022</td><td>0.003</td><td>0.041</td><td>0.332</td><td>0.306</td><td>0.921</td></tr><tr><td>2.5</td><td>0.994</td><td>0.006</td><td>0.018</td><td>0.002</td><td>0.035</td><td>0.323</td><td>0.298</td><td>0.924</td></tr><tr><td>2.6</td><td>0.995</td><td>0.005</td><td>0.014</td><td>0.001</td><td>0.029</td><td>0.314</td><td>0.291</td><td>0.926</td></tr><tr><td>2.7</td><td>0.997</td><td>0.003</td><td>0.010</td><td>0.001</td><td>0.025</td><td>0.306</td><td>0.284</td><td>0.928</td></tr><tr><td>2.8</td><td>0.997</td><td>0.003</td><td>0.008</td><td>0.001</td><td>0.021</td><td>0.298</td><td>0.277</td><td>0.929</td></tr><tr><td>2.9</td><td>0.998</td><td>0.002</td><td>0.006</td><td>0.001</td><td>0.017</td><td>0.291</td><td>0.270</td><td>0.931</td></tr><tr><td>3.0</td><td>0.999</td><td>0.001</td><td>0.004</td><td>0.000</td><td>0.014</td><td>0.283</td><td>0.264</td><td>0.933</td></tr></table>

# 10.5.1 Truncated Mean and Variance

For notational consistency, the truncated mean and variance are denoted as: $\mu_{\mathrm{T}}(\mathbf{k})$ and $\sigma_{\mathrm{T}}(\mathbf{k})^{2}$ , respectively, and are obtained as below:

$$
\mu_ {T} (k) = E (t)
$$

$$
\sigma_ {T} (k) ^ {2} = E (t ^ {2}) - E (t) ^ {2}
$$

Note, the truncated standard deviation is simply $\sigma_{\mathrm{T}}(\mathbf{k})$

# 10.5.2 Some Useful Identities

The following identities are useful in the calculations.

$$
\begin{array}{l} \mathrm {H} (\mathrm {k}) = 1 - \mathrm {F} (\mathrm {k}) \\ \mathrm {E} (\mathrm {z} > \mathrm {k}) = \mathrm {f} (\mathrm {k}) - \mathrm {k H} (\mathrm {k}) \\ \operatorname {E} \left[ (z > k) ^ {2} \right] = \operatorname {H} (k) \left(1 + k ^ {2}\right) - \operatorname {k f} (k) \\ \mathrm {E} (t) = \mathrm {E} (z > k) / \mathrm {H} (k) \\ \mathrm {E} \left(\mathrm {t} ^ {2}\right) = \mathrm {E} \left[ (\mathrm {z} > \mathrm {k}) ^ {2} \right] / \mathrm {H} (\mathrm {k}) \\ \mu_ {T} (k) = E (t) \\ \end{array}
$$

# 10.5.3 Truncated Cov

A convenient way to identify the truncated normal distribution is by the coefficient of variation, cov, computed by,

$$
\operatorname {c o v} = \sigma_ {\mathrm {T}} (\mathrm {k}) / \mu_ {\mathrm {T}} (\mathrm {k})
$$

For notational ease, the truncated coefficient of variation with parameter $k$ is labeled here as $c_{\mathrm{T}}(k)$ , whereby,

$$
\mathrm {c} _ {\mathrm {T}} (\mathrm {k}) = \operatorname {c o v}.
$$

Table 10.2 lists various values of the cov (0.3 to 1.0) from the truncated normal distribution with their associate parameter $\mathrm{k}$ and measure $\mathrm{H}\left( \mathrm{k}\right)$ . When cov is 0.50 or less, the shape of the distribution is much like the standard normal distribution. When cov is 0.90 or larger, the distribution looks like an exponential distribution.

Figure 10.3 depicts the truncated normal distribution when $\mathrm{cov} = 0.3$ , 0.5, 0.7 and 0.9. The corresponding parameters $k$ are approximately $-3.5$ , $-1.7$ , $-0.4$ and 1.9, respectively. Note at $\mathrm{cov} = 0.5$ or less, the truncated normal appears much like the

Table 10.2 The truncated normal distribution with selected values of cov and associated values of k and H(k)   

<table><tr><td>Cov</td><td>k</td><td>H(k)</td></tr><tr><td>0.3</td><td>-3.5</td><td>1.000</td></tr><tr><td>0.4</td><td>-2.4</td><td>0.992</td></tr><tr><td>0.5</td><td>-1.7</td><td>0.955</td></tr><tr><td>0.6</td><td>-1.1</td><td>0.864</td></tr><tr><td>0.7</td><td>-0.4</td><td>0.655</td></tr><tr><td>0.8</td><td>0.4</td><td>0.345</td></tr><tr><td>0.9</td><td>1.9</td><td>0.029</td></tr><tr><td>1.0</td><td>3.5</td><td>0.000</td></tr></table>

![](images/418fb396ecc99b2b3cb3a0c320ed9060b04435225c9a12c03ec9d66952dc65f8.jpg)  
Fig. 10.3 Truncated normal at $c_{\mathrm{T}}(\mathrm{k}) = \mathrm{cov} = 0.3, 0.5, 0.7$ and 0.9

standard normal. When cov is 0.9 or larger, the distribution is like an exponential distribution, far from the standard normal.

Example 10.1 Consider the variable $x$ that follows a normal distribution with parameters, $\mu = 10$ and $\sigma = 2$ . Hence, $x \sim N(10, 2^2)$ . Now assume the probability of $x$ larger than $x_0 = 9$ is of interest to an analyst. Note, the corresponding values from the standard normal are as below:

$$
\begin{array}{l} \mathrm {k} = \left(\mathrm {x} _ {\mathrm {o}} - \mu\right) / \sigma \\ = (9 - 1 0) / 2 \\ = - 0. 5 \\ \end{array}
$$

Thereby, from Table 10.1,

$$
\mathrm {H} (- 0. 5) = 0. 6 9 1
$$

is the probability of $x > 9$ .

Example 10.2 Suppose the analyst is now interested in the partial variable $(\mathrm{x} > 9)$ and also the associated mean and standard deviation of the partial variable. From the standard normal, the parameter becomes,

$$
\mathrm {k} = (9 - 1 0) / 2 = - 0. 5
$$

Scanning Table 10.1 at $k = -0.5$ , yields $\mu_{\mathrm{p}}(\mathrm{k}) = 0.698$ and $\sigma_{\mathrm{p}}(\mathrm{k}) = 0.744$ . Thereby,

$$
\begin{array}{l} \mathrm {E} (\mathrm {x} > 9) = \mathrm {E} (\mathrm {z} > \mathrm {k}) \sigma \\ = \mu_ {\mathrm {p}} (\mathrm {k}) \sigma \\ = 0. 6 9 8 \times 2 \\ = 1. 3 9 6 \\ \end{array}
$$

$$
\begin{array}{l} \sigma_ {\mathrm {(x > 9)}} = \sigma_ {\mathrm {p}} (\mathrm {k}) \sigma \\ = 0. 7 4 4 \times 2 \\ = 1. 4 8 8 \\ \end{array}
$$

So, the partial mean of $(\mathrm{x} > 9)$ is 1.396 and the associated partial standard deviation is 1.488.

Example 10.3 Assume now, the analyst is interested in measuring the coefficient of variation from the truncated distribution with $x$ larger than $x_0 = 9$ . This measure can be obtained from the corresponding standard truncated normal distribution with parameter $k$ . From the standard normal, the parameter becomes,

$$
\mathrm {k} = (9 - 1 0) / 2 = 0. 5
$$

Now pursuing the truncated measures in Table 10.1 with parameter $k = -0.5$ , the mean is $\mu_{\mathrm{T}}(-0.5) = 1.009$ ; the standard deviation is $\sigma_{\mathrm{T}}(\mathrm{k}) = 0.697$ ; and the coefficient of variation is $c_{\mathrm{T}}(\mathrm{k}) = 0.697 / 1.009 = 0.691$ . Thereby, the coefficient of variation for the truncated normal with $(x > 9)$ is $\mathrm{cov} = 0.691$ .

# 10.5.4 Three Related Variables: $z, t$ and $w$

Now consider another variable, $\mathbf{w}$ , that is related to the variables $t$ and $z$ as shown below:

Let,

$$
t = \mu_ {T} (k) + w \sigma_ {T} (k)
$$

and

$$
\mathrm {w} = \left[ t - \mu_ {\mathrm {T}} (\mathrm {k}) \right] / \sigma_ {\mathrm {T}} (\mathrm {k})
$$

Note also, since, $\mathbf{t} = (\mathbf{z} - \mathbf{k})$

$$
w = \left[ z - k - \mu_ {T} (k) \right] / \sigma_ {T} (k)
$$

For a particular value of $t$ , say, $t_0$ , there are corresponding values $z_0$ and $w_0$ as shown below,

$$
\begin{array}{l} z _ {o} = t _ {o} + k \\ \mathrm {w} _ {\mathrm {o}} = \left[ \mathrm {z} _ {\mathrm {o}} - \mathrm {k} - \mu_ {\mathrm {T}} (\mathrm {k}) \right] / \sigma_ {\mathrm {T}} (\mathrm {k}) \\ \end{array}
$$

Below shows the relation with the partial expectations of the three variables. Recall Table 10.1 where a given cov yields a unique location parameter $k$ . Now for a given cov, $k$ and $(t_0 > 0)$ ,

$$
\mathrm {E} \left(\mathrm {t} > \mathrm {t} _ {\mathrm {o}}\right) = \mathrm {E} \left(\mathrm {z} > \mathrm {z} _ {\mathrm {o}}\right) / \mathrm {H} (\mathrm {k})
$$

and

$$
\begin{array}{l} \mathrm {E} \left(\mathrm {w} > \mathrm {w} _ {\mathrm {o}}\right) = \mathrm {E} \left(\mathrm {t} > \mathrm {t} _ {\mathrm {o}}\right) / \sigma_ {\mathrm {T}} (\mathrm {k}) \\ = \mathrm {E} \left(\mathrm {z} > \mathrm {z} _ {\mathrm {o}}\right) / \left[ \mathrm {H} (\mathrm {k}) \sigma_ {\mathrm {T}} (\mathrm {k}) \right] \\ \end{array}
$$

Also,

$$
\mathrm {E} \left(\mathrm {z} > \mathrm {z} _ {\mathrm {o}}\right) = \mathrm {E} \left(\mathrm {w} > \mathrm {w} _ {\mathrm {o}}\right) \left[ \mathrm {H} (\mathrm {k}) \sigma_ {\mathrm {T}} (\mathrm {k}) \right]
$$

# 10.5.5 Limits on $w$

The limits on the variable $w$ can be derived now. Recall,

$$
w = \left[ z - k - \mu_ {T} (k) \right] / \sigma_ {T} (k)
$$

where $\mathrm{k}$ is the location parameter on $\mathbf{Z}$ . When $\mathrm{z = k}$

$$
\begin{array}{l} \mathrm {w} = - \mu_ {\mathrm {T}} (\mathrm {k}) / \sigma_ {\mathrm {T}} (\mathrm {k}) \\ = - 1 / c _ {T} (k) \\ \end{array}
$$

Hence, the interval on the random variable $w$ becomes,

$$
- 1 / c _ {T} (k) <   w <   \infty
$$

Note, for example when the coefficient of variation is: $c_{\mathrm{T}}(\mathrm{k}) = \mathrm{cov} = (0.33, 0.50, 1.00)$ , the limits are as listed below:

<table><tr><td>Cov</td><td>w-interval</td></tr><tr><td>0.33</td><td>-3.00 &lt; w &lt; ∞</td></tr><tr><td>0.50</td><td>-2.00 &lt; w &lt; ∞</td></tr><tr><td>1.00</td><td>-1.00 &lt; w &lt; ∞</td></tr></table>

The relations shown here between random variables $t$ , $z$ and $w$ will be useful in developing the safety stock applications of Chap. 11.

# 10.5.6 Hastings Approximations

There is no closed-form solution for the cumulative distribution $\mathrm{F(z)}$ . A way to approximate $\mathrm{F(z)}$ has been developed by C. Hastings, Jr. Two methods credited to Hastings are listed below.

# 10.5.7 Approximation of $F(z)$ from $z$

For a given $z$ , to find $F(z)$ , the following Hastings routine is run.

1. $\mathrm{d}_1 = 0.0498673470$

$$
\mathrm {d} _ {2} = 0. 0 2 1 1 4 1 0 0 6 1
$$

$$
\mathrm {d} _ {3} = 0. 0 0 3 2 7 7 6 2 6 3
$$

$$
\mathrm {d} _ {4} = 0. 0 0 0 0 3 8 0 0 3 6
$$

$$
\mathrm {d} _ {5} = 0. 0 0 0 0 4 8 8 9 0 6
$$

$$
\mathrm {d} _ {6} = 0. 0 0 0 0 0 5 3 8 3 0
$$

2. If $z \geq 0, k = z$

$$
\text {I f} z <   0, k = - z
$$

3. $\mathrm{F} = 1 - 0.5\left[1 + \mathrm{d}_1\mathrm{k} + \mathrm{d}_2\mathrm{k}^2 +\mathrm{d}_3\mathrm{k}^3 +\mathrm{d}_4\mathrm{k}^4 +\mathrm{d}_5\mathrm{k}^5 +\mathrm{d}_6\mathrm{k}^6\right]^{-16}$   
4. if $\mathbf{z} \geq 0$ , $\mathrm{F(z) = F}$

$$
\text {I f} z <   0, \mathrm {F} (z) = 1 - \mathrm {F}
$$

Return $\mathrm{F(z)}$

# 10.5.8 Approximation of $z$ from $F(z)$

Another useful approximation also comes from Hastings, and gives a formula that yields a random $z$ from a value of $F(z)$ . The routine is listed below.

1. $c_{0} = 2.515517$

$$
c _ {1} = 0. 8 0 2 8 5 3
$$

$$
c _ {2} = 0. 0 1 0 3 2 8
$$

$$
\mathrm {d} _ {1} = 1. 4 3 2 7 8 8
$$

$$
\mathrm {d} _ {2} = 0. 1 8 9 2 6 9
$$

$$
\mathrm {d} _ {3} = 0. 0 0 1 3 0 8
$$

2. $\mathrm{H}(z) = 1 - \mathrm{F}(z)$

$$
\text {I f} \mathrm {H} (z) \leq 0. 5, \mathrm {H} = \mathrm {H} (z)
$$

$$
\text {I f} \mathrm {H} (z) > 0. 5, \mathrm {H} = 1 - \mathrm {H} (z)
$$

3. $t = \sqrt{\ln(1 / H^2)}$ where $\ln =$ natural logarithm.   
4. $k = t - \left[ c_0 + c_1 t + c_2 t^2 \right] / \left[ 1 + d_1 t + d_2 t^2 + d_3 t^3 \right]$   
5. If $\mathrm{H(z)}\leq 0.5$ $\mathrm{z} = \mathrm{k}$

$$
\text {I f} \mathrm {H} (\mathrm {z}) > 0. 5, \mathrm {z} = - \mathrm {k}
$$

Return z.

# Summary

The normal distribution with random variable, $\mathbf{X}$ , is defined along with its mean and standard deviation. The normal is related to the standard normal distribution with random variable $\mathbf{Z}$ , and where table values are listed in almost all statistical books. The standard normal is also related to the partial measures that are defined here with parameter $\mathrm{k}$ and includes the portion of the distribution where $(\mathrm{z} > \mathrm{k})$ . The standard normal is also related to the truncated normal with parameter $\mathrm{k}$ and includes only the values of $(\mathrm{z} > \mathrm{k})$ . The coefficient of variation from the truncated normal is of particular interest. Table values are listed with measures from the standard normal distribution, partial measures, and truncated normal distribution. Two approximations are also given which allow the user to measure $\mathrm{F(z)}$ from $\mathbf{Z}$ , and $\mathbf{Z}$ from $\mathrm{F(z)}$ , where $\mathrm{F(z)}$ is the cumulative distribution of the standard normal.

# Chapter 11 Safety Stock

# 11.1 Introduction

Safety stock is the extra inventory to hold for an item for protection against demands exceeding the forecast. This type of stock concerns entities where the demands of the future are not known until they happen, like in distribution centers, stores and dealers. In plants, where the production schedules are set in advance, safety stock is usually not needed. The typical way to measure the variability in the forecasts is by the standard deviation of the one month ahead forecast error. A relative measure is the coefficient of variation. Two common methods of generating the safety stock are: the service level (probability not out of stock), and the percent fill (ratio of demand filled over total demand) methods. Both methods are also sometimes referred as the service level method. The normal distribution is used primarily to generate how much safety stock to have available. This chapter shows how the truncated normal distribution can also serve this function. The truncated normal has many shapes and includes only portions of the right-hand-side of the standard normal.

# 11.2 Control of the Inventory

The amount of inventory to carry is computed to comply with management's desire of service to the customers. The goal is to have enough stock to satisfy the demands coming in from the customers. Two methods of determining the safety stock are described in this chapter, the service level method and the percent fill method. In many stocking locations, the safety stock consists of almost half of the total inventory. The primary desire of the inventory management is to have the least amount of inventory to satisfy the demands of the customers. The safety stock is needed because of the uncertainty in the forecasts. The more accurate the forecasts, the less safety stock is needed, and thereby, the less inventory.

![](images/da45596ee05c1e8f3285b34aecac797c0232113a47a529a43cfae316630f7d09.jpg)  
Fig. 11.1 On-hand and on-order flow for a continuous review inventory system

Customer service is defined in many ways, depending on the role by which the inventory is used. The two most common interpretations are the following: (1) the probability the demand over the lead time does not exceed the inventory on-hand, and (2) the ratio of demand filled from stock on-hand over the total demand. More on these are described below. A good inventory system is one where the level of customer service is high and the amount of inventory is at the minimum possible.

It is common to refer to the total inventory as total stock (TS). The total stock is partitioned into two components: cycle stock (CS) and safety stock (SS). The cycle stock is needed to fill the forecast of demands from the customers, and the safety stock is needed in the event the demands exceed the forecasts.

A common way to control the inventory on each item in the stocking location is by the order point, OP, and order level, OL. Figure 11.1 depicts how this works. At time $t_1$ , the on-hand, OH, plus on-order, OO, inventory reaches the OP, and this triggers the system to buy new inventory of size Q to reach the OL. This new inventory is OO that is shown with a dotted line. The OH inventory is depicted with a solid line. The order Q will be received a lead time, L, later at $t_2 = t_1 + L$ . At $t_3$ , the OH + OO again falls to the OP and a new replenishment of stock of size Q is ordered. This stock is received at time $t_4 = t_3 + L$ . The time between two receipts of stock, $t_2$ to $t_4$ , is called the order cycle.

This chapter describes the two main methods of generating the safety stock: the service level method and the percent fill method.

# 11.3 Safety Stock when Normal Distribution

This section shows how to generate the safety stock with the assumption the monthly demands follow a normal distribution, where the mean is the monthly forecast and the variation is the standard deviation of the one month forecast error.

# 11.4 Availability Method

# 11.4 Service Level Method

A common way to determine the safety stock is by the service level method. The management sets a parameter, SL, that specifies the probability the demand over the lead-time will not exceed the amount of stock available. With this method two measures are computed, the order point, OP, and the order level, OL, as follows:

$$
\mathrm {O P} = \mathrm {F} _ {\mathrm {I}} + \mathrm {S S}
$$

$$
\mathrm {O L} = \mathrm {O P} + \mathrm {Q}
$$

where, $\mathrm{F_L} =$ forecast of the demands over the lead time, $\mathrm{SS} =$ safety stock and $\mathrm{Q} =$ order quantity. All three of these quantities come from the forecasts of the future months, $\mathrm{F}(\tau)\tau = 1,2,\ldots$ . The computations for the safety stock is shown below.

The lead-time forecast, $\mathrm{F}_{\mathrm{I}}$ , is computed as,

$$
\begin{array}{l} F _ {l} = L \times F (1) \quad \text {i f} L \leq l \\ = F (1) + (L - 1) \times F (2) \quad i f 1 <   L \leq 2 \\ \end{array}
$$

and so forth.

The safety stock is obtained from the normal distribution, the standard deviation of the one-month ahead forecast error, $\sigma$ , and the lead-time, $L$ . The lead time is the length of time between ordering replenish stock till receiving the stock. The standard deviation over the lead-time, $\sigma_{L}$ , is obtained by,

$$
\sigma_ {L} = \sqrt {L} \sigma
$$

The parameter SL is set to the cumulative probability in the standard normal distribution, $\mathrm{F}(\mathrm{k})$ and $\mathrm{k}$ is called the safety factor. That is,

$$
\mathrm {F (k) = S L}
$$

where $k$ is the value of $z$ , from the standard normal, where $P(z \leq k) = F(k) = SL$ . So, the safety stock becomes,

$$
\mathrm {S S} = \mathrm {k} \sigma_ {\mathrm {L}}
$$

The order quantity, Q, is the amount of stock to order for replenishment. This quantity is determined by an economic analysis using the forecast of the future months as well as the costs associated with buying and holding the stock. With each new order quantity, the on-order, OO, increases by Q; and when the stock arrives, the OO decreases by Q and the on-hand, OH, increases by Q.

The on-hand, OH, plus on-order, OO, inventory is monitored daily with the order point, OP, to determine when and how much to buy as described below.

$$
\begin{array}{l} \text {I f} (\mathrm {O H} + \mathrm {O O}) > \mathrm {O P} \quad \text {b u y} = 0 \\ \text {I f} (\mathrm {O H} + \mathrm {O O}) \leq \mathrm {O P} \quad \text {b u y} = \mathrm {O L} - (\mathrm {O H} + \mathrm {O O}) \\ \end{array}
$$

The buy quantity is placed when $(\mathrm{OH} + \mathrm{OO})$ falls equal or below the OP mark.

Example 11.1 Consider a part with horizontal forecasts of $\mathrm{F} = 100$ for each of the future months, and a standard deviation of $\sigma = 30$ . Suppose the lead time is $\mathrm{L} = 2$ months, the order quantity is $\mathrm{Q} = 100$ pieces, and the management sets the service level at $\mathrm{SL} = 0.95$ . For this scenario, the following computations take place:

$$
\begin{array}{l} \mathrm {F} _ {\mathrm {L}} = 2 \times 1 0 0 = 2 0 0 \\ \sigma_ {\mathrm {L}} = \sqrt {2} \times 3 0 = 4 2. 4 \\ k = 1. 6 5 \quad (s i n c e F (1. 6 5) \approx 0. 9 5 \quad f r o m T a b l e 1 0. 1) \\ \mathrm {S S} = 1. 6 5 \times 4 2. 4 = 6 9. 9 6 \approx 7 0 \\ \mathrm {O P} = 2 0 0 + 7 0 = 2 7 0 \\ \mathrm {O L} = 2 7 0 + 1 0 0 = 3 7 0 \\ \end{array}
$$

Each day, the sum $(\mathrm{OH} + \mathrm{OO})$ is compared with the OP, and if $(\mathrm{OH} + \mathrm{OO}) \leq 270$ , the replenish quantity becomes: buy $= 370 - (\mathrm{OH} + \mathrm{OO})$ .

# 11.5 Percent Fill Method

Another common way to determine the safety stock, SS, with the normal distribution, is by the percent fill method, sometimes called the service level method. This method measures the percent fill (PF), as:

$$
\mathrm {P F} = (\text {d e m a n d f i l l e d}) / (\text {t o t a l d e m a n d})
$$

The management sets the PF desired and the method determines the order point, OP, and order level, OL needed to accomplish. This method requires the following data: the monthly forecasts, $\mathrm{F}(\tau) \tau = 1, 2, \dots$ , the lead-time (month), L, the one month standard deviation, $\sigma$ , the order quantity, Q, and the desired percent fill, PF. The forecast for the lead-time is $\mathrm{F}_{\mathrm{L}}$ , and the associated standard deviation over the lead-time is obtained by,

$$
\sigma_ {\mathrm {L}} = \sqrt {L} \sigma
$$

To find the safety factor, a time interval is needed that allows the computations to take place. The time duration covering the order cycle, OC, is selected, and the PF for this duration is set as the desired percent fill. The order cycle is the time interval between two receipts of new stock. For this length of time, the percent fill is:

$$
\begin{array}{l} \mathrm {P F} = (\text {d e m a n d f i l l e d i n O C}) / (\text {t o t a l d e m a n d i n O C}) \\ = 1 - (\text {d e m a n d s h o r t i n O C}) / (\text {t o t a l d e m a n d i n O C}). \\ = 1 - \mathrm {E} (\mathrm {z} > \mathrm {k}) \sigma_ {\mathrm {L}} / \mathrm {Q} \\ \end{array}
$$

# 11.5 Percent Fill Method

Note, Q is the amount of replenish stock in the order cycle and represents the expected demand in the OC; and $\mathrm{E}(\mathrm{z} > \mathrm{k})\sigma_{\mathrm{L}}$ is the expected demand exceeding the OP during the order cycle, and therefore is a measure of the stock that is short in the OC. So now, the partial expectation becomes,

$$
\mathrm {E} (z > k) = (1 - \mathrm {P F}) Q / \sigma_ {\mathrm {L}}
$$

The safety factor, $k$ , that corresponds to $\mathrm{E}(z > k)$ is obtained from Table 10.1. Note from the table where $k > 0$ only when $\mathrm{E}(z > k) < 0.40$ . To avoid a negative safety stock, $k$ is set to zero when $\mathrm{E}(z > k) \geq 0.40$ , whereby no safety stock is needed.

With $k$ now obtained, the safety stock is computed by,

$$
\mathrm {S S} = \mathrm {k} \sigma_ {\mathrm {L}}
$$

The order point, OP, and order level, OL, become,

$$
\mathrm {O P} = \mathrm {F} _ {\mathrm {L}} + \mathrm {S S}
$$

$$
\mathrm {O L} = \mathrm {O P} + \mathrm {Q}
$$

Each day the sum $(\mathrm{OH} + \mathrm{OO})$ is compared to the OP and if $(\mathrm{OH} + \mathrm{OO}) \leq \mathrm{OP}$ , a new buy quantity, buy, is needed and becomes,

$$
\mathrm {b u y} = \mathrm {O L} - (\mathrm {O H} + \mathrm {O O})
$$

In this way, the inventory replenishments for the item is controlled to yield the percent fill, PF, desired by the management.

Example 11.2 Suppose a part where the management wants a percent fill of $\mathrm{PF} = 0.95$ . Assume the horizontal forecast is $F = 100$ per future month, the standard deviation is $\sigma = 30$ , the lead-time is $L = 2$ months, and the order quantity is $Q = 100$ pieces. For this situation, the following computations take place.

$$
\mathrm {F} _ {\mathrm {L}} = 2 \times 1 0 0 = 2 0 0
$$

$$
\sigma_ {\mathrm {L}} = \sqrt {2} \times 3 0 = 4 2. 4
$$

$$
\mathrm {E} (\mathrm {z} > \mathrm {k}) = (1 - 0. 9 5) 1 0 0 / 4 2. 4 = 0. 1 1 8
$$

Table 10.1 shows: $\mathrm{E}(\mathrm{z} > {0.8}) = {0.120}$ and $\mathrm{E}\left( {\mathrm{z} > {0.9}}\right)  = {0.100}$ . Using interpolation,

$$
\begin{array}{l} k = 0. 8 0 + [ E (z > k) - E (z > 0. 8) ] \times [ 0. 9 - 0. 8 ] / [ E (z > 0. 9) - E (z > 0. 8) ] \\ = 0. 8 0 + [ 0. 1 1 8 - 0. 1 2 0 ] \times [ 0. 9 - 0. 8 ] / [ 0. 1 0 0 - 0. 1 2 0 ] \\ = 0. 8 2 \\ \end{array}
$$

Thereby,

$$
\mathrm {S S} = 0. 8 2 \times 4 2. 4 = 3 4. 7 7 \approx 3 5
$$

$$
\mathrm {O P} = 2 0 0 + 3 5 = 2 3 5
$$

$$
\mathrm {O L} = 2 3 5 + 1 0 0 = 3 3 5
$$

# 11.6 Sensitivity of Safety Stock with Cov

The accuracy of the forecast is measured by the standard deviation of the one-month ahead forecast error, $\sigma$ . A relative measure is the coefficient of variation, $\mathrm{cov} = \sigma / \mathrm{F}$ , where $\mathrm{F}$ is the average one month forecast. The lower the cov, the more accurate the forecast, and the less safety stock is needed. Below shows how much safety stock can be reduced with a relative decrease in the forecast error measured by, $\sigma$ or $\mathrm{cov}$ .

# 11.7 Service Level Safety Stock and Cov

When the service level method is used, the safety stock is generated by,

$$
\mathrm {S S} = \mathrm {k} \sigma \sqrt {L}
$$

where $\sigma$ is the standard deviation, $k$ is the safety factor, and $L$ is the lead time in months. The only ingredient that is affected by the forecast accuracy is the standard deviation. Thereby, a $10\%$ decrease in the standard deviation will lower the safety stock needs by $10\%$ . In the same way, a $10\%$ decrease in the cov will lower the safety stock by $10\%$ . In essence, the more accurate the forecast, the lower the inventory to satisfy management's desire of customer service.

# 11.8 Percent Fill Safety Stock and Cov

When the percent fill method is used to find the safety stock, the relation between the cov and the safety stock is not straight forward, as in the service level method. Recall, the partial expectation is computed as below,

$$
\mathrm {E} (\mathrm {z} > \mathrm {k}) = (1 - \mathrm {P F}) \mathrm {Q} / \left(\sigma \sqrt {L}\right)
$$

where, PF is the percent fill desired, $Q$ is the order quantity, $\sigma$ is the one month standard deviation and $L$ is the lead-time in months.

In a generic way, when $\mathrm{F} =$ the average one month forecast, $\mathrm{Q} = \mathrm{M} \times \mathrm{F}$ is the order quantity where $\mathrm{M}$ is the months-in-buy, and $\sigma = \operatorname{cov} \times \mathrm{F}$ . The partial expectation becomes,

$$
\mathrm {E} (\mathrm {z} > \mathrm {k}) = (1 - \mathrm {P F}) \mathrm {M} / \left(\operatorname {c o v} \sqrt {L}\right)
$$

and thereby $\mathrm{E(z > k)}$ depends on the four generic ingredients: PF, M, cov and L

For a particular item in the inventory, the value of $\mathrm{E}(\mathrm{z} > \mathrm{k})$ is computed and a search is needed to find the corresponding safety factor, $\mathbf{k}$ , whereby, the safety stock quantity becomes,

$$
\mathrm {S S} = \mathrm {k} \sigma \sqrt {L}
$$

# Months of Safety Stock

It is helpful to transform the safety stock quantity into months supply terms, denoted as, ss. Note, $\mathrm{SS} = \mathrm{ss} \times \mathrm{F}$ where SS is safety stock in pieces and ss is safety stock in months supply. Recall, $\mathrm{cov} = \sigma / \mathrm{F}$ . The measure for months supply is below.

$$
\mathrm {s s} = \mathrm {k} \times \mathrm {c o v} \sqrt {L}
$$

Table 11.1 gives the months of safety stock needed for five levels of percent fill (0.90, 0.925, 0.95, 0.975, 0.99), and five values of the cov (0.30, 0.50, 0.60, 0.80, 1.00). The table also gives five combinations, (L, M), of lead-time (months), L, and months-in-buy, M: (0.5, 0.5), (0.5, 1.0), (1.0, 1.0), (1.0, 2.0), (2.0, 1.0). Note, for example, when PF=0.95, L=1, M=2 and cov=0.6, the months of safety stock needed is 0.36.

The right-hand-side of the table gives the percent reduction in months of safety stock when the cov reduces by $10\%$ . For example, consider the table values listed below:

<table><tr><td>PF</td><td>L</td><td>M</td><td>cov</td><td>ss</td></tr><tr><td>0.95</td><td>1.0</td><td>2.0</td><td>0.60</td><td>0.36</td></tr><tr><td>0.95</td><td>1.0</td><td>2.0</td><td>0.80</td><td>0.62</td></tr></table>

The percent change in cov is $(0.80 - 0.60) / 0.80 = 0.250$ $(25.0\%)$ .

The percent change in months of safety stock is: $(0.62 - 0.36) / 0.62 = 0.419$ (41.9%)

So, $0.419 / 0.250 = 1.676$ is the percent change in months of safety stock with a one percent reduction in the cov. Using $10\%$ as the base, when the $\mathrm{cov} = 0.8$ is reduced by $10\%$ , the corresponding reduction in the safety stock months is $16.8\%$ . This illustrates how the $10\%$ entries of Table 11.1 are derived.

Table 11.1 Months of safety stock by percent fill (PF), when lead time months, L, months-in-buy, M, and coefficient of variation, cov; and percent reduction in safety stock for a $10\%$ reduction in cov   

<table><tr><td colspan="8">Months of safety stock</td><td colspan="4">Percent reduction in SS when 10% reduction in cov</td></tr><tr><td colspan="8">Cov</td><td colspan="4">Cov</td></tr><tr><td>PF</td><td>L</td><td>M</td><td>0.3</td><td>0.5</td><td>0.6</td><td>0.8</td><td>1.0</td><td>0.5</td><td>0.6</td><td>0.8</td><td>1.0</td></tr><tr><td>0.90</td><td>0.5</td><td>0.5</td><td>0.08</td><td>0.25</td><td>0.34</td><td>0.55</td><td>0.77</td><td>17.0</td><td>15.9</td><td>15.3</td><td>14.3</td></tr><tr><td></td><td>0.5</td><td>1.0</td><td>0.00</td><td>0.09</td><td>0.16</td><td>0.32</td><td>0.50</td><td>25.0</td><td>26.4</td><td>20.0</td><td>18.0</td></tr><tr><td></td><td>1.0</td><td>1.0</td><td>0.04</td><td>0.24</td><td>0.36</td><td>0.62</td><td>0.90</td><td>20.8</td><td>20.1</td><td>16.8</td><td>15.6</td></tr><tr><td></td><td>1.0</td><td>2.0</td><td>0.00</td><td>0.00</td><td>0.08</td><td>0.27</td><td>0.49</td><td>—</td><td>60.2</td><td>28.1</td><td>22.4</td></tr><tr><td></td><td>2.0</td><td>1.0</td><td>0.16</td><td>0.50</td><td>0.69</td><td>1.09</td><td>1.53</td><td>17.0</td><td>16.6</td><td>14.7</td><td>14.4</td></tr><tr><td>0.925</td><td>0.5</td><td>0.5</td><td>0.12</td><td>0.31</td><td>0.41</td><td>0.63</td><td>0.87</td><td>15.3</td><td>14.7</td><td>14.0</td><td>13.8</td></tr><tr><td></td><td>0.5</td><td>1.0</td><td>0.02</td><td>0.16</td><td>0.24</td><td>0.42</td><td>0.61</td><td>21.9</td><td>20.1</td><td>17.1</td><td>15.6</td></tr><tr><td></td><td>1.0</td><td>1.0</td><td>0.10</td><td>0.33</td><td>0.47</td><td>0.75</td><td>1.05</td><td>17.4</td><td>17.9</td><td>14.9</td><td>14.3</td></tr><tr><td></td><td>1.0</td><td>2.0</td><td>0.00</td><td>0.11</td><td>0.20</td><td>0.42</td><td>0.67</td><td>25.0</td><td>27.1</td><td>21.0</td><td>18.7</td></tr><tr><td></td><td>2.0</td><td>1.0</td><td>0.24</td><td>0.61</td><td>0.82</td><td>1.26</td><td>1.73</td><td>15.2</td><td>15.4</td><td>14.0</td><td>13.6</td></tr><tr><td>0.95</td><td>0.5</td><td>0.5</td><td>0.17</td><td>0.38</td><td>0.50</td><td>0.74</td><td>1.00</td><td>13.8</td><td>14.5</td><td>13.0</td><td>13.0</td></tr><tr><td></td><td>0.5</td><td>1.0</td><td>0.08</td><td>0.25</td><td>0.34</td><td>0.55</td><td>0.77</td><td>17.0</td><td>15.9</td><td>15.3</td><td>14.3</td></tr><tr><td></td><td>1.0</td><td>1.0</td><td>0.18</td><td>0.45</td><td>0.60</td><td>0.92</td><td>1.25</td><td>15.0</td><td>15.1</td><td>13.9</td><td>13.2</td></tr><tr><td></td><td>1.0</td><td>2.0</td><td>0.04</td><td>0.24</td><td>0.36</td><td>0.62</td><td>0.90</td><td>20.8</td><td>20.1</td><td>16.8</td><td>15.6</td></tr><tr><td></td><td>2.0</td><td>1.0</td><td>0.34</td><td>0.77</td><td>1.00</td><td>1.48</td><td>2.00</td><td>14.0</td><td>13.9</td><td>13.0</td><td>13.0</td></tr><tr><td>0.975</td><td>0.5</td><td>0.5</td><td>0.25</td><td>0.50</td><td>0.63</td><td>0.92</td><td>1.21</td><td>12.5</td><td>12.4</td><td>12.6</td><td>12.0</td></tr><tr><td></td><td>0.5</td><td>1.0</td><td>0.17</td><td>0.38</td><td>0.50</td><td>0.74</td><td>1.00</td><td>13.8</td><td>14.5</td><td>13.0</td><td>13.0</td></tr><tr><td></td><td>1.0</td><td>1.0</td><td>0.30</td><td>0.63</td><td>0.80</td><td>1.18</td><td>1.57</td><td>13.1</td><td>12.8</td><td>12.9</td><td>12.4</td></tr><tr><td></td><td>1.0</td><td>2.0</td><td>0.18</td><td>0.45</td><td>0.60</td><td>0.92</td><td>1.25</td><td>15.0</td><td>15.1</td><td>13.9</td><td>13.2</td></tr><tr><td></td><td>2.0</td><td>1.0</td><td>0.50</td><td>1.00</td><td>1.27</td><td>1.83</td><td>2.42</td><td>12.5</td><td>12.8</td><td>12.2</td><td>12.2</td></tr><tr><td>0.99</td><td>0.5</td><td>0.5</td><td>0.34</td><td>0.64</td><td>0.79</td><td>1.12</td><td>1.46</td><td>11.7</td><td>11.4</td><td>11.8</td><td>11.6</td></tr><tr><td></td><td>0.5</td><td>1.0</td><td>0.27</td><td>0.53</td><td>0.68</td><td>0.97</td><td>1.27</td><td>12.3</td><td>13.3</td><td>12.0</td><td>11.8</td></tr><tr><td></td><td>1.0</td><td>1.0</td><td>0.43</td><td>0.83</td><td>1.04</td><td>1.48</td><td>1.94</td><td>12.0</td><td>12.2</td><td>11.9</td><td>11.9</td></tr><tr><td></td><td>1.0</td><td>2.0</td><td>0.33</td><td>0.68</td><td>0.86</td><td>1.25</td><td>1.66</td><td>12.9</td><td>12.6</td><td>12.5</td><td>12.3</td></tr><tr><td></td><td>2.0</td><td>1.0</td><td>0.68</td><td>1.27</td><td>1.59</td><td>2.24</td><td>2.92</td><td>11.6</td><td>12.1</td><td>11.6</td><td>11.6</td></tr></table>

# 11.9 Safety Stock when Truncated Normal Distribution

In Chap. 10, the truncated normal distribution is introduced; and this is the distribution used here to find the amount of safety stock needed by way of the service level method and the percent fill method. The distribution is useful in inventory control since it has many shapes that are applicable. Consider a part where the monthly forecast is labeled as $\mathrm{F}$ , the one month standard deviation is denoted by $\sigma$ and the demands over the months are always zero or larger. Recall the coefficient of variation, cov, is measured by $\mathrm{cov} = \sigma / \mathrm{F}$ . In the event $\mathrm{F} = 3\sigma$ , the standard deviation

Table 11.2 The truncated standard distribution with approximate values of cov, k and H(k)   

<table><tr><td>Cov</td><td>k</td><td>H(k)</td></tr><tr><td>0.3</td><td>-3.5</td><td>1.000</td></tr><tr><td>0.4</td><td>-2.4</td><td>0.992</td></tr><tr><td>0.5</td><td>-1.7</td><td>0.955</td></tr><tr><td>0.6</td><td>-1.1</td><td>0.864</td></tr><tr><td>0.7</td><td>-0.4</td><td>0.655</td></tr><tr><td>0.8</td><td>0.4</td><td>0.345</td></tr><tr><td>0.9</td><td>1.9</td><td>0.029</td></tr><tr><td>1.0</td><td>3.5</td><td>0.001</td></tr></table>

is one-third the forecast and $\mathrm{cov} = \sigma / \mathrm{F} = 0.33$ . For this situation, the shape of the demands for the month could be the same as a normal since all the demands are zero or larger and the probability of a demand below zero is nil. For any part with $\mathrm{cov} \leq 0.33$ , the normal assumption is possible since the probability of all demands larger than zero is near one.

When $\mathrm{cov} = 1.00$ , however, the shape of the monthly demands are more like an exponential distribution, and are sometimes referred as lumpy demands. In this situation, the normal distribution does not apply. In this scenario, the distribution of monthly demands begins at zero and is skewed far to the right of F. The normal distribution does not closely resemble this distribution. The same is true for the distributions as cov increases above the 0.33 mark.

Table 11.2 has entries that are taken from Table 10.1 of Chap. 10. When the cov from the truncated normal is 0.4, say, the associated parameter from the standard normal is $\mathrm{k} = -2.4$ , and $\mathrm{H(k)} = 0.992$ . At $\mathrm{cov} = 0.5$ , the associated parameter is $\mathrm{k} = -1.7$ , and $\mathrm{H(k)} = 0.955$ . Neither of these truncated normal distributions are much different than the standard normal. But when $\mathrm{cov} = 0.6$ , $\mathrm{k} = -1.1$ and $\mathrm{H(k)} = 0.864$ , whereby $13.6\%$ of the demands would fall negative, and this distribution starts to drift away from the normal. When $\mathrm{cov} = 0.7$ or larger, the distribution becomes much different than a normal.

# 11.10 Lead Time Demand

As the forecasting system measures the average monthly forecast, F, and the corresponding one month standard deviation, $\sigma$ , the coefficient of variation for one month is $\mathrm{cov} = \sigma / \mathrm{F}$ . But in computing the amount of safety stock to have available by the availability method and the percent fill method, the distribution of the demands cover the lead-time duration, and thereby the cov for the lead-time is needed to control the inventory properly. Since,

$$
\mathrm {F} _ {\mathrm {L}} = \mathrm {F} (1) + \dots + \mathrm {F} (\mathrm {L})
$$

Table 11.3 Value of the lead-time coefficient of variation, covL, when the lead-time is L months, and the one month coefficient of variation is cov   

<table><tr><td>L\cov</td><td>0.10</td><td>0.20</td><td>0.30</td><td>0.40</td><td>0.50</td><td>0.60</td><td>0.70</td><td>0.80</td><td>0.90</td><td>1.00</td></tr><tr><td>0.25</td><td>0.20</td><td>0.40</td><td>0.60</td><td>0.80</td><td>1.00</td><td>1.20</td><td>1.40</td><td>1.60</td><td>1.80</td><td>2.00</td></tr><tr><td>0.50</td><td>0.14</td><td>0.28</td><td>0.42</td><td>0.57</td><td>0.71</td><td>0.85</td><td>0.99</td><td>1.13</td><td>1.27</td><td>1.41</td></tr><tr><td>0.75</td><td>0.12</td><td>0.23</td><td>0.35</td><td>0.46</td><td>0.58</td><td>0.69</td><td>0.81</td><td>0.92</td><td>1.04</td><td>1.15</td></tr><tr><td>1.00</td><td>0.10</td><td>0.20</td><td>0.30</td><td>0.40</td><td>0.50</td><td>0.60</td><td>0.70</td><td>0.80</td><td>0.90</td><td>1.00</td></tr><tr><td>2.00</td><td>0.07</td><td>0.14</td><td>0.21</td><td>0.28</td><td>0.35</td><td>0.42</td><td>0.49</td><td>0.57</td><td>0.64</td><td>0.71</td></tr><tr><td>3.00</td><td>0.06</td><td>0.12</td><td>0.17</td><td>0.23</td><td>0.29</td><td>0.35</td><td>0.40</td><td>0.46</td><td>0.52</td><td>0.58</td></tr><tr><td>4.00</td><td>0.05</td><td>0.10</td><td>0.15</td><td>0.20</td><td>0.25</td><td>0.30</td><td>0.35</td><td>0.40</td><td>0.45</td><td>0.50</td></tr></table>

is the mean of the lead-time distribution, and

$$
\sigma_ {\mathrm {L}} = \sqrt {L} \sigma
$$

is the associated standard deviation, the coefficient of variation for the lead-time becomes,

$$
\operatorname {c o v} _ {\mathrm {L}} = \sigma_ {\mathrm {L}} / F _ {\mathrm {L}}.
$$

Table 11.3 shows how the $\mathrm{cov}_{\mathrm{L}}$ is related to the one month cov and the lead time L. Note at $\mathrm{L} = 1.00$ , $\mathrm{cov}_{\mathrm{L}} = \mathrm{cov}$ ; when $\mathrm{L} < 1.00$ , $\mathrm{cov}_{\mathrm{L}} > \mathrm{cov}$ ; and when $\mathrm{L} > 1.00$ , $\mathrm{cov}_{\mathrm{L}} < \mathrm{cov}$ . For example, when $\mathrm{cov} = 0.30$ (normal) and $\mathrm{L} = 0.25$ months, $\mathrm{cov}_{\mathrm{L}} = 0.60$ (not normal). When $\mathrm{cov} = 1.00$ (not normal), and $\mathrm{L} = 4$ months, $\mathrm{cov}_{\mathrm{L}} = 0.50$ (near normal), and so forth.

In stores and dealers, the lead-time is fairly low (a few days) for most items they stock, and thereby $\mathrm{cov}_{\mathrm{L}}$ for many items in stock are high and the distribution tends to be not normally shaped. In distribution centers, the lead-time is often higher (two or more months), whereby $\mathrm{cov}_{\mathrm{L}}$ increases and the shape of the lead-time demands approach a normal distribution.

# 11.11 Service Level Methods and Truncated Normal

Truncated Normal Density Consider the truncated normal with parameter $k$ and variable $t = z - k$ , where $t \geq 0$ . The parameter $k$ identifies the left-hand-side of the standard normal distribution where the truncation begins, and the only values of $z$ are those greater than $k$ . The truncated normal probability density with parameter $k$ is:

$$
\mathrm {g} _ {\mathrm {k}} (\mathrm {t}) = \mathrm {f} (\mathrm {z}) / \mathrm {H} (\mathrm {k}) \quad \mathrm {t} \geq 0
$$

The corresponding cumulative distribution of $t$ is as follows:

$$
G _ {k} (t) = [ F (z) - F (k) ] / [ 1 - F (k) ] \quad f o r z \geq k a n d t = (z - k)
$$

Example 11.3 Suppose a situation where the management wants to set the safety stock to yield the service level measure as $\mathrm{SL} = 0.90$ for an item with a truncated normal distribution with $\mathrm{cov}_{\mathrm{L}} = 0.60$ and where the standard deviation for the lead time is $\sigma_{\mathrm{L}} = 10$ .

Table 10.1 shows when $\mathrm{cov}_{\mathrm{L}} = 0.60$ , the truncated location parameter is $\mathrm{k} = -1.1$ . The table also shows that $\mu_{\mathrm{T}}(-1.1) = 1.352$ and $\sigma_{\mathrm{T}}(-1.1) = 0.812$ . The way to find the safety factor for this scenario is given below.

$$
\operatorname {S e t} \mathrm {G} _ {\mathrm {K}} (\mathrm {t}) = \mathrm {S L} = 0. 9 0
$$

In this situation,

$$
\mathrm {S L} = [ \mathrm {F (z)} - \mathrm {F (k)} ] / [ 1 - \mathrm {F (k)} ]
$$

and thereby,

$$
\mathrm {F} (\mathrm {z}) = \mathrm {F} (\mathrm {k}) + \mathrm {S L} \times [ 1 - \mathrm {F} (\mathrm {k}) ]
$$

Note from Table 10.1 where, $\mathrm{F(k) = F(-1.1) = 0.136}$ , thereby,

$$
\begin{array}{l} \mathrm {F} \left(\mathrm {z} _ {\mathrm {o}}\right) = 0. 1 3 6 + 0. 9 0 \times [ 1 - 0. 1 3 6 ] \\ = 0. 9 1 4 \\ \end{array}
$$

Referring back to Table 10.1 again, the value of $z_0$ that yields $F(z_0) = 0.914$ is, with interpolation, $z_0 = 1.36$ .

Recall, $t > 0$ and $t = z - k$ .

It is useful now to introduce another variable, w, where,

$$
\mathrm {t} = \mu_ {\mathrm {T}} (\mathrm {k}) + \mathrm {w} \sigma_ {\mathrm {T}} (\mathrm {k})
$$

and thereby,

$$
\begin{array}{l} w = \left[ t - \mu_ {T} (k) \right] / \sigma_ {T} (k) \\ = \left[ z - k - \mu_ {T} (k) \right] / \sigma_ {T} (k) \\ \end{array}
$$

Hence, when $z_{0}$ is known, the corresponding value of $w$ , denoted as $w_{0}$ , is computed as below:

$$
\mathrm {t} _ {\mathrm {o}} = \mu_ {\mathrm {T}} (\mathrm {k}) + \mathrm {w} _ {\mathrm {o}} \sigma_ {\mathrm {T}} (\mathrm {k})
$$

$$
w _ {o} = \left[ z _ {o} - k - \mu_ {T} (k) \right] / \left[ \sigma_ {T} (k) \right]
$$

Continuing with Example, 11.3, $z_0 = 1.36$ , $k = -1.1$ , $\mu_T(k) = 1.352$ , $\sigma_T(k) = 0.812$ , and thereby the safety factor to use is computed as below:

$$
\begin{array}{l} \mathrm {w} _ {\mathrm {o}} = [ 1. 3 6 + 1. 1 - 1. 3 5 2 ] / 0. 8 1 2 \\ = 1. 3 6 \\ \end{array}
$$

Hence, the safety stock to use for this part is set as below.

$$
\begin{array}{l} \mathrm {S S} = \mathrm {w} _ {\mathrm {o}} \sigma_ {\mathrm {L}} \\ = 1. 3 6 \times 1 0 \\ = 1 3. 6 \\ \end{array}
$$

In comparison when the normal distribution is applied, the safety factor becomes $k \approx 1.29$ via Table 10.1. The safety stock to use is computed below.

$$
\begin{array}{l} \mathrm {S S} = 1. 2 9 \times 1 0 \\ = 1 2. 9 \\ \end{array}
$$

In general, the truncated safety stock will be greater or equal to the counterpart standard normal safety stock.

In summary, the steps to find the safety stock for the service level method from the truncated normal distribution are listed below:

1. From $\mathrm{cov}_{\mathrm{I}}$ , get k from Table 10.1.   
2. Compute $\mathrm{F(z_o)}$   
3. Find $z_0$ from Table 10.1.   
4. Compute $\mathrm{w_o}$   
5. $\mathrm{SS} = \mathrm{w}_{\mathrm{o}}\sigma_{\mathrm{L}}$

# 11.12 Percent Fill Method and Truncated Normal

Consider an item where the safety stock, SS, from the truncated normal is needed and the percent fill method will now be used. The data that is needed for the part is listed below:

$\mathrm{F} =$ one-month forecast

$\sigma =$ one-month standard deviation

$\mathrm{L} =$ lead-time

$\mathrm{Q} =$ order quantity

$\mathrm{PF} =$ desired percent fill

$\mathrm{F_I} = \mathrm{L}\times \mathrm{F} =$ lead-time forecast

$\sigma_{\mathrm{L}} = \sqrt{L}\sigma =$ lead-time standard deviation

$\mathrm{cov}_{\mathrm{L}} =$ lead-time coefficient of variation

$$
\mathrm {E} (\mathrm {w} > \mathrm {w} _ {\mathrm {o}}) = (1 - \mathrm {P F}) \mathrm {Q} / \sigma_ {\mathrm {L}}
$$

To obtain $\mathrm{w_o}$ , gather the following measures from Table 10.1:

$\mathrm{k} =$ parameter associated with $\mathsf{c}_{\mathrm{T}}(\mathsf{k}) = \mathsf{cov}_{\mathrm{L}}$

$\mathrm{H(k) =}$ probability of $(z > k)$

$\mu_{\mathrm{T}}(\mathrm{k}), \sigma_{\mathrm{T}}(\mathrm{k}) =$ mean and standard deviation for parameter k of truncated normal $\mu_{\mathrm{p}}(\mathrm{k}) =$ partial mean for parameter k

Also recall from Chap. 10, the following:

$$
\begin{array}{l} \mathrm {E} \left(\mathrm {w} > \mathrm {w} _ {0}\right) = \mathrm {E} \left(\mathrm {t} > \mathrm {t} _ {0}\right) / \sigma_ {\mathrm {T}} (\mathrm {k}) \\ = \mathrm {E} \left(\mathrm {z} > \mathrm {z} _ {\mathrm {o}}\right) / \left[ \mathrm {H} (\mathrm {k}) \sigma_ {\mathrm {T}} (\mathrm {k}) \right] \\ \end{array}
$$

Now compute the following:

$$
\mathrm {E} \left(\mathrm {z} > \mathrm {z} _ {\mathrm {o}}\right) = \mathrm {E} \left(\mathrm {w} > \mathrm {w} _ {\mathrm {o}}\right) \left[ \mathrm {H} (\mathrm {k}) \sigma_ {\mathrm {T}} (\mathrm {k}) \right]
$$

From $\mathrm{E}(z > z_0)$ , use Table 10.1 to find $z_0$ ; and then compute $w_0$ as follows:

$$
w _ {o} = \left[ z _ {o} - k - \mu_ {T} (k) \right] / \sigma_ {T} (k)
$$

Finally, the safety stock becomes,

$$
\mathrm {S S} = \mathrm {w} _ {\mathrm {o}} \sigma_ {\mathrm {L}}
$$

Example 11.4 Suppose an item with the average monthly forecast of $\mathrm{F} = 10$ , the standard deviation is $\sigma = 6$ , the lead-time is $\mathrm{L} = 1$ month, and the order quantity is $\mathrm{Q} = 10$ pieces. Use the percent fill method with $\mathrm{PF} = 0.95$ , and the truncated normal distribution to find the safety stock.

The partial expectation for the item is computed as below:

$$
\begin{array}{l} \mathrm {E} (\mathrm {w} > \mathrm {w} _ {\mathrm {o}}) = (1 - \mathrm {P F}) \mathrm {Q} / \sigma_ {\mathrm {L}} \\ = (1 - 0. 9 5) 1 0 / 6 \\ = 0. 0 8 3 \\ \end{array}
$$

Note the lead-time forecast is $\mathrm{F_L} = 10$ , the lead-time standard deviation is $\sigma_{\mathrm{L}} = 6$ and the lead-time coefficient of variation is $\mathrm{cov}_{\mathrm{L}} = \mathrm{c}_{\mathrm{T}}(\mathrm{k}) = 0.60$ . From Table 10.1, at $\mathrm{c}_{\mathrm{T}}(\mathrm{k}) = 0.6$ , the truncated mean and standard deviation are approximately $\mu_{\mathrm{T}}(\mathrm{k}) = 1.352$ and $\sigma_{\mathrm{T}}(\mathrm{k}) = 0.812$ , respectively. Further from the table, the truncated location parameter is $\mathrm{k} = -1.1$ and $\mathrm{H}(-1.1) = 0.864$ .

The corresponding value, $\mathrm{E(z > z_0)}$ is obtained as below,

$$
\begin{array}{l} \mathrm {E} \left(\mathrm {z} > \mathrm {z} _ {0}\right) = \mathrm {E} \left(\mathrm {w} > \mathrm {w} _ {0}\right) \mathrm {H} (- 1. 1) \sigma_ {\mathrm {T}} (- 1. 1) \\ = 0. 0 8 3 \times 0. 8 6 4 \times 0. 8 1 2 \\ = 0. 0 5 8 \\ \end{array}
$$

From Table 10.1, $z_{\mathrm{o}} \approx 1.18$ corresponds to $\mathrm{E}(z > z_{\mathrm{o}}) = 0.058$ .

The value of $\mathrm{w_o}$ that conforms with $z_{0}$ is computed below.

$$
\begin{array}{l} w _ {o} = \left[ z _ {o} - k - \mu_ {T} (k) \right] / \sigma_ {T} (k) \\ = [ 1. 1 8 + 1. 1 - 1. 3 5 2 ] / 0. 8 1 2 \\ = 1. 1 4 \\ \end{array}
$$

Finally, the safety stock for the part is,

$$
\begin{array}{l} \mathrm {S S} = \mathrm {w} _ {0} \sigma_ {\mathrm {I}} \\ = 1. 1 4 \times 6 \\ = 6. 8 4 \\ \end{array}
$$

In comparison when the normal distribution is applied with $\mathrm{E}(\mathrm{z} > \mathrm{k}) = 0.083$ , the safety factor becomes $\mathrm{k} = 1.00$ via Table 10.1. The safety stock to use is computed below:

$$
\begin{array}{l} \mathrm {S S} = 1. 0 0 \times 6 \\ = 6. 0 0 \\ \end{array}
$$

As stated earlier, the truncated safety stock will be greater or equal to the counterpart normal safety stock.

In summary, the steps to compute the safety stock for the percent fill method from the truncated normal distribution are listed below:

1. From $\mathrm{cov}_{\mathrm{L}}$ , get $\mathrm{k}$ , $\mathrm{H}(\mathrm{k})$ , $\sigma_{\mathrm{T}}(\mathrm{k})$ and $\mu_{\mathrm{T}}(\mathrm{k})$ from Table 10.1.   
2. Compute $\mathrm{E}(\mathrm{w} > \mathrm{w}_{\mathrm{o}})$   
3. Compute $\mathrm{E}(z > z_0)$   
4. Get $z_0$ from Table 10.1.   
5. Compute $\mathbf{w}_{\mathrm{o}}$   
6. $\mathrm{SS} = \mathrm{w}_{\mathrm{o}}\mathrm{s}_{\mathrm{L}}$

# Summary

Safety stock is one of the most important measures in inventory control. The two common ways to measure the safety stock are the service level method and the percent fill method. Two probability distributions are described on how to determine the amount of safety stock needed, the standard normal distribution and the truncated normal distribution. No doubt, the standard normal is far more known and used. Although the truncated normal distribution is not known or used by most practitioners, it is the more appropriate distribution to apply when seeking the safety stock for each sku in the inventory. To use the normal distribution, when the truncated normal is appropriate, will result in a lower level of service (service level, percent fill), than is planned.

# Chapter 12 Auxiliary Forecasts

# 12.1 Introduction

Management often needs forecasts unlike the models described in the earlier chapters that are generated using the flow of demands from the history months. This chapter describes some of the more commonly needed forecasts of this type. A first concerns the forecasts for the first future month and the demand-to-date as the month is progressing. For the first month, a forecast has already been generated, and as the month progresses, the demand-to-date demand is evolving. The forecast for the remaining portion of the month is generated along with the associated standard deviation. Another scenario occurs for parts when some demands are ordered for future deliveries, called advance demands. A forecast for the future month has already been generated in the usual way from the flow of history demands. An adjustment to the future month's forecast is developed based on the advance demand information. Another situation that often occurs in service parts inventory is when a forecast is needed on a part even when no history demands are available. This happens when a new part is included on the bill-of-material of a finished good item due to an engineering change or a redesign, and the part is to be immediately held in inventory at the service part location. This situation is called the initial buy quantity. Another condition that takes place often in service parts locations is when the supplier will stop supplying the part, even when the service part location is obliged to carry the part for future possible needs from its customers. This is called the all-time-buy.

# 12.2 Month-1 Forecasts and Demand-to-Date

Suppose a forecast system where the history demands, $\mathrm{x}(1),\dots,\mathrm{x}(\mathrm{N})$ , are used to generate the forecasts for the future months. The forecast for future month-1 is listed as $\mathbf{x}'(1)$ , and the associated standard deviation is denoted as $\sigma$ . Assume now

where a portion, w, of future month-1 has elapsed and the demand to date is $\mathbf{X}_{\mathrm{w}}$ Note the forecast for this portion of month-1 would be,

$$
\mathrm {F} _ {\mathrm {w}} = \mathrm {w} \times \mathrm {x} ^ {\prime} (1)
$$

and the corresponding standard deviation is:

$$
\sigma_ {\mathrm {w}} = \sqrt {w} \sigma
$$

A compatibility measure that may be useful to the management is shown below:

$$
\mathrm {k} = \left(\mathrm {x} _ {\mathrm {w}} - \mathrm {F} _ {\mathrm {w}}\right) / \sigma_ {\mathrm {w}}
$$

When all is in order, the accepted values of $k$ are $(-3 < k < 3)$ . In the event $k$ is out of the range, the management may choose to review the forecast to make an adjustment. If $k < -3$ , the forecast is too low, and if $k < 3$ , the forecast is too high.

The remainder portion of month-1 is (1-w), and the corresponding forecast and standard deviation are computed as below:

$$
\mathrm {F} _ {(1 - w)} = (1 - w) \times x ^ {\prime} (1)
$$

$$
\sigma_ {(1 - w)} = \sqrt {(1 - w)} \sigma
$$

The adjusted forecast for the total of month-1 becomes,

$$
F ^ {\prime} (1) = x _ {w} + F _ {(1 - w)}
$$

and the standard deviation is,

$$
\sigma^ {\prime} = \sigma_ {(1 - w)}
$$

Example 12.1 Suppose an item with the month-1 forecast of $\mathrm{x}(1) = 100$ and the standard deviation is $\sigma = 30$ . Assume, $\mathrm{w} = 0.20$ of the month has elapsed and the demand-to-date is $X_{\mathrm{w}} = 10$ pieces. Note the forecast and standard deviation for the w portion of month-1 is as below:

$$
\mathrm {F _ {w}} = 0. 2 \times 1 0 0 = 2 0
$$

$$
\sigma_ {\mathrm {w}} = \sqrt {0 . 2 0} 3 0 = 1 3. 4 2
$$

The compatibility measure is:

$$
k = (1 0 - 2 0) / 1 3. 4 2 = - 0. 7 4 5
$$

# 12.3 Advance Demand

and is well within the acceptable range of: $(-3 <   \mathrm{k} <   3)$

The remaining portion of month-1 is $(1 - w) = (1 - 0.20) = 0.80$ . The associated forecast and standard deviation are:

$$
\begin{array}{l} \mathrm {F} _ {\mathrm {(l - w)}} = 0. 8 \times 1 0 0 = 8 0 \\ \sigma_ {(1 - w)} = \sqrt {0 . 8} \times 3 0 \\ = 2 6. 8 3 \\ \end{array}
$$

For the total of month-1, the forecast and the standard deviation are as below,

$$
\begin{array}{l} F ^ {\prime} (1) = x _ {w} + F _ {(1 - w)} \\ = 1 0 + 8 0 \\ = 9 0 \\ \end{array}
$$

and

$$
\begin{array}{l} \sigma^ {\prime} = \sigma_ {(1 - w)} \\ = 2 6. 8 3 \\ \end{array}
$$

# 12.3 Advance Demand

On some occasions a demand for an item is known one or more months prior to the date the customer wants possession of the item. This is known as an advance demand. For example, in June, the customer orders the quantity prior to its need in August. The demand is part of the regular demand in August and not an addition to it. The forecast for the future months are already generated from the flow of demands of the past and with this extra advance demand knowledge, an adjustment to the forecast is applied.

Assume the current month is $t = N$ and $F(\tau) =$ forecast for the $\tau$ th future month with $\sigma$ the corresponding standard deviation. Further, let $x_{o} =$ advance demand for future month $\tau$ . Of need now is an adjustment to the forecast for the $\tau$ th future month. It is assumed the demand for the future month comes from the normal distribution with parameters, $F(\tau)$ and $\sigma$ . Note where,

$$
\mathrm {k} = \left[ \mathrm {x} _ {\mathrm {o}} - \mathrm {F} (\tau) \right] / \sigma
$$

and recall from Chap. 10, the partial expectation of the standard normal where $(\mathbf{z} > \mathbf{k})$ is:

$$
\begin{array}{l} \mu_ {\mathrm {p}} (\mathrm {k}) = \mathrm {E} (\mathrm {z} > \mathrm {k}) \\ = \int_ {k} ^ {\infty} (z - k) f (z) d z \\ \end{array}
$$

The corresponding partial expectation for the demand, $\mathbf{x}$ , is:

$$
\begin{array}{l} \mathrm {E} \left(\mathrm {x} > \mathrm {x} _ {\mathrm {o}}\right) = \int_ {\mathrm {x} _ {\mathrm {o}}} ^ {\infty} (x - x _ {o}) f (x) d x \\ = \mathrm {E} (\mathrm {z} > \mathrm {k}) \sigma \\ \end{array}
$$

and the corresponding standard deviation becomes:

$$
\sigma \left(x > x _ {o}\right) = \sigma_ {p} (\kappa) \sigma
$$

Recall also, where $\sigma_p(k)$ is the partial standard deviation of $(z > k)$ .

The forecast adjustment for future month $\tau$ becomes,

$$
\mathrm {x} _ {\mathrm {a}} (\tau) = \mathrm {x} _ {\mathrm {o}} + \mathrm {E} (z > k) \sigma
$$

and the corresponding standard deviation is $\sigma (x > x_{o})$

Example 12.2 Suppose a part where the forecast for future month $\tau$ is $F(\tau) = 100$ and the standard deviation is $\sigma = 30$ . Assume also an advance demand comes in for $\mathrm{x_o} = 80$ pieces, and an adjustment to the forecast is needed. In this scenario,

$$
\begin{array}{l} \mathrm {k} = \left[ 8 0 - 1 0 0 \right] / 3 0 \\ = - 0. 6 7 \\ \end{array}
$$

and with interpolation, Table 10.2 gives the partial expectation and standard deviation as, $\mu_{\mathrm{P}}(-0.67) = \mathrm{E}(\mathrm{z} > - 0.67)\approx 0.83$ and $\sigma_p(-0.67)\approx 0.79$ , respectively. Thereby, the adjusted forecast is,

$$
\begin{array}{l} \mathrm {x} _ {\mathrm {a}} (\tau) = \mathrm {x} _ {\mathrm {o}} + \mathrm {E} (\mathrm {z} > - 0. 6 7) \sigma \\ = 8 0 + 0. 8 3 \times 3 0 \\ = 1 0 4. 9 \\ \end{array}
$$

and the adjusted standard deviation is,

$$
\begin{array}{l} \sigma (\tau) = \sigma_ {p} (- 0. 6 7) \times \sigma \\ = 0. 7 9 \times 3 0 \\ = 2 3. 7 \\ \end{array}
$$

Note in this example, the forecast goes up and the standard deviation goes down.

Example 12.3 Consider the same part as Example 12.2, $(\mathrm{F}(\tau) = 100, \sigma = 30)$ , but now assume the advance demand is $\mathbf{x}_0 = 10$ . In this scenario,

$$
\begin{array}{l} k = \left[ 1 0 - 1 0 0 \right] / 3 0 \\ = - 3. 0 0 \\ \end{array}
$$

# 12.4 Initial Forecasts

and from Table 10.2, $\mu_{\mathrm{p}}(-3.00) = 3.00$ and $\sigma_{\mathrm{p}}(-3.00) = 1.00$ . Thereby, the adjusted forecast is,

$$
\begin{array}{l} \mathrm {x} _ {\mathrm {a}} (\tau) = \mathrm {x} _ {\mathrm {o}} + \mu_ {\mathrm {P}} (- 3. 0 0) \sigma \\ = 1 0 + 3. 0 0 \times 3 0 \\ = 1 0 0. 0 \\ \end{array}
$$

and the standard deviation is,

$$
\begin{array}{l} \sigma (\tau) = \sigma_ {\mathrm {p}} (- 3. 0 0) \times \sigma \\ = 1. 0 0 \times 3 0 \\ = 3 0. 0 \\ \end{array}
$$

Note, there is no change in the forecast and standard deviation since the demand is at or below the range of minus three standard deviations.

Example 12.4 Suppose once more the same part as Example 12.2, $(\mathrm{F}(\tau) = 100,$ $\sigma = 30)$ , where now the advance demand is $\mathrm{x_o} = 190$ pieces. In this scenario,

$$
\begin{array}{l} \mathrm {k} = [ 1 9 0 - 1 0 0 ] / 3 0 \\ = 3. 0 0 \\ \end{array}
$$

and Table 10.2 gives, $\mu_{\mathrm{p}}(3.00) = 0.00\alpha \nu \delta \sigma_{p}(3.00) = 0.00$ . The adjusted forecast now becomes,

$$
\begin{array}{l} \mathrm {x} _ {\mathrm {a}} (\tau) = \mathrm {x} _ {\mathrm {o}} + \mu_ {\mathrm {p}} (3. 0 0) \sigma \\ = 1 9 0 + 0. 0 0 \times 3 0 \\ = 1 9 0. 0 \\ \end{array}
$$

and the standard deviation is,

$$
\begin{array}{l} \sigma^ {\prime} (\tau) = \sigma_ {p} (3. 0 0) \times \sigma \\ = 0. 0 0 3 0 \\ = 0. 0 \\ \end{array}
$$

Note when the advance demand is three or more standard errors above the forecast, $\mathrm{F}(\tau)$ , the adjusted forecast is the same as the advance demand, $\mathbf{x}_{\mathrm{o}}$ , and the standard deviation reduces to zero.

# 12.4 Initial Forecasts

An important mission of a service parts distribution center (spdc) is to stock the parts for the finished good items (fgi) that are currently or previously in the lineup of products of the original equipment manufacturer (oem). This includes all the

parts that are included in the bill-of-material (bom) of the fgi's that are currently in production and for those that have been in production for the past years. The oem is obliged to carry the parts for any maintenance or repair need by the customers for a fixed number of years after the part is no longer in the production of the fgi's on the assembly line. This length of time is called the obligation period.

At the beginning, when a new part is introduced in the bill-of-material for the fgi, due to an engineering or model change, the part must be stocked in the distribution center to fill any demands for the service and maintenance of the unit. A difficulty occurs in determining how much stock to buy since there is no demand history to base the buy decision. The first buy quantity on the part is called the initial buy quantity. The initial buy quantity requires an initial forecast of the part; one that is developed even when no demand history is available for the part. This situation is common for service parts where the parts are stored in a distribution center awaiting the demands from customers. The stocking location is confronted with determining how much to buy and store for each new part of this type. To accomplish, an initial forecast is needed.

The problem on how much to stock is indeed a very elusive and difficult one since there is no data to base the stocking decision. Often the decision on the amount to stock is assigned to experts who review each new part and determine the quantity to buy. The experts have little if any data to back their decisions and rely mainly on their experience.

The notions of new-parts-of-the-past (npop) and new-parts-of the-future (npof) are introduced. The npof are the parts where a forecast is needed now. The npop are the parts that have already occurred and where demand data is still available on the database for the initial year of their introduction.

An important element on the parts is here called an attribute (A), it describes the use of the part on the fgi. This could be a spring that is used on a door system, where each fgi has such a part. When possible, the attribute categorizes the type of part, its function, where it is used and so forth. The classification of attributes becomes valuable information to include on the database for each part.

For each npop, the average of the first 12 months of demand history is captured from the demand history. For a npof with an attribute A, all the npop with the same attribute are gathered and the first 12 months of their history demands are listed as D(i) where i identifies the i-th npop and n is the number of such parts. Hence, the data available becomes, D(1), ..., D(n). Each yearly demand is now converted to a monthly average as $\mathrm{d(i)} = \mathrm{D(i)} / 12$ for $\mathrm{i} = 1$ to $\mathrm{n}$ .

From the monthly average demand history data, the average and variance of the demands are computed as shown below,

$$
\mu_ {d} = \sum_ {i} ^ {n} d (i) / n
$$

$$
\sigma_ {d} ^ {2} = \sum_ {i} ^ {n} \left[ d (i) - \bar {d} \right] ^ {2} / (n - 1)
$$

# 12.4 Initial Forecasts

Because of the possibility of a large spread in the npop demands, the lognormal distribution (LN) is assumed for the parts. Thereby, $\mathrm{d} \sim \mathrm{LN}(\mu_{\mathrm{y}} \sigma_{\mathrm{y}}^2)$ where $\mathrm{y} = \log \text{normal}$ of $\mathrm{d}$ , $\mathrm{y} = \ln (\mathrm{d})$ , with $\mu_{\mathrm{y}}$ the mean and $\sigma_{\mathrm{y}}^2$ the variance. Note the parameters of $\mathrm{y}$ are used as the parameters of $\mathrm{d}$ . The mean and variance of $\mathrm{y}$ are computed as below:

$$
\begin{array}{l} \mu_ {\mathrm {y}} = \ln \left[ \mu_ {\mathrm {d}} ^ {2} / \left(\sigma_ {\mathrm {d}} ^ {2} + \mu_ {\mathrm {d}} ^ {2}\right) ^ {0. 5} \right] \\ \sigma_ {\mathrm {y}} ^ {2} = \ln \left[ \left(\sigma_ {\mathrm {d}} ^ {2} + \mu_ {\mathrm {d}} ^ {2}\right) / \mu_ {\mathrm {d}} ^ {2} \right] \\ \end{array}
$$

The distribution of $y$ is normally distributed whereby $y \sim N(\mu_y, \sigma_y^2)$ .

It is possible now to select a group of probabilities where the values of $y$ may occur. For convenience here, ten probabilities are selected as: (0.05, 0.15, ..., 0.95.) For each of these, the associated value of the $z$ value from the standard normal distribution is gathered and labeled as: $[z(1), z(2), \ldots, z(10)]$ . These become:

$$
\left[ - 1. 6 4 5, - 1. 0 3 6, - 0. 6 7 4, - 0. 3 7 5, - 0. 1 2 4, 0. 1 2 4, 0. 3 7 5, 0. 6 7 4, 1. 0 3 6, 1. 6 4 5 \right]
$$

So now, ten values of $y$ can be calculated by $y(i) = [\mu_y + z(i)\sigma_y]$ for $i = 1 - 10$ . Each of the ten values are chosen to represent the center of a range with probability of 0.10. The corresponding values of $d$ , are now computed by,

$$
\mathrm {d} ^ {\prime} (\mathrm {i}) = \mathrm {e} ^ {\mathrm {y} (\mathrm {i})} \mathrm {i} = 1 \text {t o} 1 0
$$

Example 12.5 Suppose an engineering change to a fgi and a new part is included for the first time. The fgi will be produced on the assembly line and will contain this new part. The spdc is obliged to order some of these parts for any pending demands from the dealers to satisfy the potential customers needs on maintenance and repair. The engineers classify the part with an attribute A. The spdc computer system scans their database files to find any parts with the same attribute, A, where the first 12 months of service part demands are still available. In the example, $n = 5$ such parts are found. The average monthly demands of the five parts are labeled as $\mathrm{d(i)} \mathrm{i} = 1$ to 5 and are listed below:

$$
\mathrm {d} (\mathrm {i}) = 1. 2, 0. 8, 1. 5, 2. 1, 9. 3
$$

The average, variance and standard deviation of the demands are computed with results below:

$$
\begin{array}{l} \bar {d} = \mu_ {\mathrm {d} ^ {\prime}} = 2. 9 8 \\ s _ {d} ^ {2} = \sigma_ {\mathrm {d} ^ {\prime}} ^ {2} = 1 2. 7 0 7 \\ s _ {d} = \sigma_ {\mathrm {d} ^ {\prime}} = 3. 5 6 5 \\ \end{array}
$$

Table 12.1 Ten selected probabilities, $\alpha (\mathrm{i})$ , with corresponding standard normal variables, $z(i)$ , associated values of $y(i)$ , and of the average monthly demand, d'(i)   

<table><tr><td>i</td><td>α(i)</td><td>z(i)</td><td>y(i)</td><td>d&#x27;(i)</td></tr><tr><td>1</td><td>0.05</td><td>-1.645</td><td>-0.903</td><td>0.405</td></tr><tr><td>2</td><td>0.15</td><td>-1.036</td><td>-0.329</td><td>0.720</td></tr><tr><td>3</td><td>0.25</td><td>-0.674</td><td>0.013</td><td>1.013</td></tr><tr><td>4</td><td>0.35</td><td>-0.385</td><td>0.285</td><td>1.330</td></tr><tr><td>5</td><td>0.45</td><td>-0.124</td><td>0.531</td><td>1.701</td></tr><tr><td>6</td><td>0.55</td><td>0.124</td><td>0.765</td><td>2.148</td></tr><tr><td>7</td><td>0.65</td><td>0.385</td><td>1.011</td><td>2.747</td></tr><tr><td>8</td><td>0.75</td><td>0.674</td><td>1.283</td><td>3.608</td></tr><tr><td>9</td><td>0.85</td><td>1.036</td><td>1.624</td><td>5.074</td></tr><tr><td>10</td><td>0.95</td><td>1.645</td><td>2.198</td><td>9.008</td></tr></table>

Recall, the monthly demands are assumed to follow a lognormal distribution. The corresponding normal variable, $y$ , is obtained by

$$
\mathrm {y} = \ln (\mathrm {d})
$$

where $\ln =$ lognormal. The parameters of $y$ are the mean, variance and standard deviation and are computed as shown earlier. The resulting values are listed below:

$$
\mu_ {\mathrm {y}} = 0. 6 4 8
$$

$$
\sigma_ {\mathrm {y}} ^ {2} = 0. 8 8 8
$$

$$
\sigma_ {\mathrm {y}} = 0. 9 4 2
$$

The range of possible values of $d$ is obtained in the following way. Ten selected probability points are selected as: 0.05, 0.15, ..., 0.95 and are listed in Table 12.1. For each probability entry, the corresponding standard normal variable, $z(i)$ , is found where $P(z < z(i)) = \alpha(i)$ . So now, the selected values of $y$ are measured by,

$$
\mathrm {y} (\mathrm {i}) = 0. 6 4 8 + \mathrm {z} (\mathrm {i}) 0. 9 4 2 \quad \mathrm {i} = 1 \text {t o} 1 0
$$

Finally, the ten selected values of the average monthly demands, d, are:

$$
\mathrm {d} ^ {\prime} (\mathrm {i}) = \mathrm {e} ^ {\mathrm {y} (\mathrm {i})} \quad \mathrm {i} = 1 \text {t o} 1 0
$$

The table shows the average monthly demands, d, ranges from 0.405 to 9.008. Some ranges of d with probability estimates are the following:

$$
\mathrm {P} (1. 0 1 3 <   \mathrm {d} <   3. 6 0 8) = 0. 5 0
$$

$$
\mathrm {P} (0. 4 0 5 <   \mathrm {d} <   9. 0 0 8) = 0. 9 0
$$

$$
\mathrm {P} (\mathrm {d} <   9. 0 0 8) = 0. 9 5
$$

and so forth.

# 12.5 All Time Forecasts

In the production of a finished-good-item (fgi), many parts and components are needed in the assembly process. Each part has a supplier that replenishes the plant in a steady manner. As time passes, the collection of parts for the fgi is ever changing due to engineering and model enhancements. From time-to-time, the parts are needed at the service parts distribution center who replenish the dealers as customers seek maintenance or repair on their fgi. As the fgi is sold to the public, the population of fgi's with the part will increase over time as long as the fgi is still in production. The increase will halt when the part is replaced on the fgi because of an engineering change or for a model change. From then on, the population of fgi decreases as the units age and slowly are being scrapped. Thereafter, the demands start approaching zero.

When the part is no longer in use in production on the fgi, and with the demands dwindling at the spdc, the supplier will eventually find it unprofitable to produce the part and will notify the spdc that it will soon stop as the supplier of the part. The spdc is still responsible to carry the part for an obligation period, could be 5-15 years, after the part is no longer included in the born of the current fgi. The spdc must order a quantity one last time from the supplier to carry for this all time need. This buy is often called the all-time requirement (ATR). A forecast of the demands over the obligation years is now needed by the spdc.

A possible way to generate the forecast is given here. The method seeks to estimate the shape of the population of fgi units that have the service part included. The assumption is that the demands of the service part in question will be somewhat in parallel to the population of fgi's that have the part included. The method described here uses five parameters: (1) $\mathrm{j_o} =$ the number of years after a unit is sold to a customer where the fgi is free of being scrapped. For example, $\mathrm{j_o} = 2$ will state that most likely the fgi will not be scrapped within the first two years of use by the customers. (2) $\mathrm{r} =$ the probability that a unit (of the fgi) will be scrapped in a year's duration. This is for each year after $\mathrm{j_o}$ years. If $\mathrm{r} = 0.1$ , $90\%$ of all units of the fgi will continue to be used by the customer for yet another year, and $10\%$ will be scrapped. (3) $\mathrm{t_o} =$ the number of years the part has been included in the born of the fgi. This parameter identifies how many units have been produced by the oem. (4) $\mathrm{T} =$ the current year relative to the year of introduction of the part in the fgi. If the part is first included in the born of the fgi in the year 2005 and the current year is 2013, $\mathrm{T} = 9$ represents the number of years since and including the introduction year from 2005-2013. (5) $N =$ the number of past years where the annual demands are

available. For example, if the annual demands for the prior four years are still available on the database, $N = 4$ .

In summary, the parameters of this forecasting method are listed below:

Parameters:

$$
j _ {o} = \text {s c r a p f r e e y e a r s}
$$

$$
r = \text {p r o b a b i l i t y} j _ {\circ}
$$

$$
t _ {o} = \text {p r o d u c t i o n y e a r s}
$$

$$
\mathrm {T} = \text {c u r r e n t y e a r (a f t e r p a r t i s i n t r o d u c e d)}
$$

$$
N = \text {n u m b e r y e a r s o f p a r t d e m a n d h i s t o r y}
$$

The forecast model seeks to estimate the shape of the population of fgi units with the part that are still in use by the customers. This requires estimating the probability of a unit being scrapped each year. For a given unit, $j =$ the number of years after the customer has possession of the fgi unit, and $p(j) =$ probability the unit is scrapped in year $j$ is computed as below:

$$
\begin{array}{l} p (j) = 0 \quad j = 1 t o j _ {o} \\ = r (1 - r) ^ {j - j _ {0} - 1} \quad j > j _ {o} \\ \end{array}
$$

The probability that the unit is scrapped in year $j$ or sooner is noted as $F(j)$ , and the complement is $H(j) = 1 - F(j)$ . Note, $H(j)$ is the probability the unit will not be scrapped by the customer in the first $j$ years. In summary, these probabilities are below.

$$
\begin{array}{l} \mathrm {F} (\mathrm {j}) = \quad \text {p r o b a b i l i t y} \text {t h e u n i t i s s c r a p p e d i n y e a r j o s o o n e r .} [ \mathrm {F} (\mathrm {j}) = \sum_ {1} ^ {j} p (j) ] \\ \mathrm {H} (\mathrm {j}) = \quad \text {p r o b a b i l i t y} \text {t h e u n i t i s n o t s c r a p p e d a s o f y e a r j .} [ \mathrm {H} (\mathrm {j}) = 1 - \mathrm {F} (\mathrm {j}) ] \\ \end{array}
$$

For all the years after the part is introduced, the notation of $t$ is used where $t \geq 1$ . Of need here is to estimate the probability the fgi units will still be in use by the customers for $t$ years after the introduction of the part. The summary of this notation is provided below assuming $t_0 = 4$ years of production:

$$
t = \text {n u m b e r o f y e a r s a f t e r p a r t i s i n t r o d u c e d}
$$

$\mathrm{H}(1,t) =$ probability year 1 production unit is not scrapped as of year t $\mathrm{H}(2,t) =$ probability year 2 production unit is not scrapped as of year t $\mathrm{H}(3,t) =$ probability year 3 production unit is not scrapped as of year t $\mathrm{H}(4,t) =$ probability year 4 production unit is not scrapped as of year t

The sum of the above probabilities by year, $t$ , is used to estimate the shape of the population size that includes the service part in question. The notation uses $x(t)$ to represent the sum of the probabilities as listed below:

$$
\mathrm {x} (t) = \mathrm {H} (1, t) + \mathrm {H} (2, t) + \mathrm {H} (3, t) + \mathrm {H} (4, t)
$$

$=$ generic shape of population in year t after introduction

# 12.5 All Time Forecasts

The computation of $\mathrm{x(t)}$ is tallied for all the years from $t = 1$ to $T$ ; the years from introduction to the current year.

From the database, the demands at the spdc for the N prior years are now gathered and listed as $\mathrm{d(t)}$ , where,

$\mathrm{d}(t) =$ demand in year t for each year the service part demand is known.

For each of the N years where $\mathrm{d(t)}$ is available, the associated $\mathbf{x}(t)$ measures are gathered and the ratio of $\mathrm{d}$ over $\mathbf{x}$ is noted as $\mathrm{dx}$ and computed as below:

$$
\mathrm {d} x = \Sigma \mathrm {d} (t) / \Sigma x (t)
$$

$=$ ratio of demand over generic shape where the sum is over the $\mathrm{N}$ demand years

Finally, the forecast of the service demands for the future years can be generated. The forecast for year $t$ is denoted as $f(t)$ and is calculated as follows:

$$
f (t) = x (t) \times d x
$$

Note, $f(t) =$ forecast of the service part demand in year t for $t > T$

Example 12.6 Suppose the supplier of a part in the spdc informs the part will be dropped and requests one last time buy. The spdc is obliged to generate a forecast for the future years of the service obligation on this part. Assume the parameter values are below:

Parameters:

$$
\begin{array}{l} j _ {o} = 2 = \text {s r a p f r e e y e a r s} \\ r = 0. 1 = \text {p r o b a b i l i t y o f s c r a p p e r y e a r a f t e r} j _ {\mathrm {o}} \\ \mathrm {t} _ {\mathrm {o}} = 4 = \text {p r o d u c t i o n y e a r s} \\ \mathrm {T} = 6 = \text {c u r r e n t y e a r (a f t e r p a r t i s i n t r o d u c e d)} \\ N = 4 = \text {n u m b e r y e a r s o f s e r v i c e p a r t d e m a n d h i s t y} \\ \end{array}
$$

A first set of computations concern the probability the part will be scrapped in the j-th year after the customer takes possession of the unit. The probabilities, $\mathrm{p(j)}$ , $\mathrm{F(j)}$ and $\mathrm{H(j)}$ are listed in Table 12.2. Note, for example, at $\mathrm{j} = 4$ , $\mathrm{p(4)} = 0.09$ , $\mathrm{F(4)} = 0.190$ and $\mathrm{H(4)} = 0.810$ . Figure 12.1 is a plot of the flow of $\mathrm{H(j)}$ for twenty years after the unit of the fgi is sold to the customer.

Table 12.3 is a worksheet that yields the forecasts for the future years on the service part. The table shows, $\mathrm{H}(1,\mathrm{t})$ as the probability that a unit produced in year $t = 1$ is still in use at year $t$ . In the same way, $\mathrm{H}(2,\mathrm{t})$ , $\mathrm{H}(3,\mathrm{t})$ and $\mathrm{H}(4,\mathrm{t})$ are the corresponding probabilities the units produced in years $t = 2, 3$ and 4 are still in use in year $t$ . The sum of the four probabilities is $\mathrm{x(t)}$ , that represents the shape of the units in the population that have the service part in the fgi. The service demands known for $N = 4$ years, $(t = 3, 4, 5, 6)$ is listed as $\mathrm{d(t)}$ . The sum of the four years of $\mathrm{d(t)}$ with corresponding $\mathrm{x(t)}$ are shown below:

$$
\begin{array}{l} \Sigma \mathrm {d} (t) = 1 1 0 + 1 2 0 + 1 3 0 + 1 2 5 = 4 8 5 \\ \Sigma \mathrm {x} (\mathrm {t}) = 2. 9 0 0 + 3. 7 1 0 + 3. 4 3 9 + 3. 0 9 5 = 1 3. 1 4 4 \\ \end{array}
$$

Table 12.2 Years, j, with probability of scrap in the year, p(j), cumulative probability of scrap, F(j), and probability not scrap, H(j)   

<table><tr><td>j</td><td>p(j)</td><td>F(j)</td><td>H(j)</td></tr><tr><td>1</td><td>0.000</td><td>0.000</td><td>1.000</td></tr><tr><td>2</td><td>0.000</td><td>0.000</td><td>1.000</td></tr><tr><td>3</td><td>0.100</td><td>0.100</td><td>0.900</td></tr><tr><td>4</td><td>0.090</td><td>0.190</td><td>0.810</td></tr><tr><td>5</td><td>0.081</td><td>0.271</td><td>0.729</td></tr><tr><td>6</td><td>0.073</td><td>0.344</td><td>0.656</td></tr><tr><td>7</td><td>0.066</td><td>0.410</td><td>0.590</td></tr><tr><td>8</td><td>0.059</td><td>0.469</td><td>0.531</td></tr><tr><td>9</td><td>0.053</td><td>0.522</td><td>0.478</td></tr><tr><td>10</td><td>0.048</td><td>0.570</td><td>0.430</td></tr><tr><td>11</td><td>0.043</td><td>0.613</td><td>0.387</td></tr><tr><td>12</td><td>0.039</td><td>0.651</td><td>0.349</td></tr><tr><td>13</td><td>0.035</td><td>0.686</td><td>0.314</td></tr><tr><td>14</td><td>0.031</td><td>0.718</td><td>0.282</td></tr><tr><td>15</td><td>0.028</td><td>0.746</td><td>0.254</td></tr><tr><td>16</td><td>0.025</td><td>0.771</td><td>0.229</td></tr><tr><td>17</td><td>0.023</td><td>0.794</td><td>0.206</td></tr><tr><td>18</td><td>0.021</td><td>0.815</td><td>0.185</td></tr><tr><td>19</td><td>0.019</td><td>0.833</td><td>0.167</td></tr><tr><td>20</td><td>0.017</td><td>0.850</td><td>0.150</td></tr></table>

![](images/e7747e8f3148eb7b88ab2eb663c484fc2032537ef4c4ff63ac2e97684b8a357c.jpg)  
Fig. 12.1 Probability the unit is not scrapped as of year j, H(j), when the probability of scrap per year is $r = 0.1$ and, scrap free years is $j_{\mathrm{o}} = 2$

So now, the ratio of $d$ to $x$ becomes

$$
\mathrm {d x} = 4 8 5 / 1 3. 1 4 4 = 3 6. 9 0
$$

The forecasts for each of the years beyond $\mathrm{T} = 6$ are now calculated as,

$$
f (t) = 3 6. 9 0 \times x (t) \quad f o r t = 7 t o 2 0
$$

Table 12.3 Years since introduction, t, probability of non-scratch, H(j, t), for production years $j = 1, 2, 3, 4$ , generic population of units, x(t), demand history, d(t), and annual forecasts, f(t)   

<table><tr><td>t</td><td>H(1,t)</td><td>H(2,t)</td><td>H(3,t)</td><td>H(4,t)</td><td>x(t)</td><td>d(t)</td><td>f(t)</td></tr><tr><td>1</td><td>1.000</td><td></td><td></td><td></td><td>1.000</td><td></td><td></td></tr><tr><td>2</td><td>1.000</td><td>1.000</td><td></td><td></td><td>2.000</td><td></td><td></td></tr><tr><td>3</td><td>0.900</td><td>1.000</td><td>1.000</td><td></td><td>2.900</td><td>110</td><td></td></tr><tr><td>4</td><td>0.810</td><td>0.900</td><td>1.000</td><td>1.000</td><td>3.710</td><td>120</td><td></td></tr><tr><td>5</td><td>0.729</td><td>0.810</td><td>0.900</td><td>1.000</td><td>3.439</td><td>130</td><td></td></tr><tr><td>6</td><td>0.656</td><td>0.729</td><td>0.810</td><td>0.900</td><td>3.095</td><td>125</td><td></td></tr><tr><td>7</td><td>0.590</td><td>0.656</td><td>0.729</td><td>0.810</td><td>2.786</td><td></td><td>103</td></tr><tr><td>8</td><td>0.531</td><td>0.590</td><td>0.656</td><td>0.729</td><td>2.507</td><td></td><td>93</td></tr><tr><td>9</td><td>0.478</td><td>0.531</td><td>0.590</td><td>0.656</td><td>2.256</td><td></td><td>83</td></tr><tr><td>10</td><td>0.430</td><td>0.478</td><td>0.531</td><td>0.590</td><td>2.031</td><td></td><td>75</td></tr><tr><td>11</td><td>0.387</td><td>0.430</td><td>0.478</td><td>0.531</td><td>1.828</td><td></td><td>67</td></tr><tr><td>12</td><td>0.349</td><td>0.387</td><td>0.430</td><td>0.478</td><td>1.645</td><td></td><td>61</td></tr><tr><td>13</td><td>0.314</td><td>0.349</td><td>0.387</td><td>0.430</td><td>1.480</td><td></td><td>55</td></tr><tr><td>14</td><td>0.282</td><td>0.314</td><td>0.349</td><td>0.387</td><td>1.332</td><td></td><td>49</td></tr><tr><td>15</td><td>0.254</td><td>0.282</td><td>0.314</td><td>0.349</td><td>1.199</td><td></td><td>44</td></tr><tr><td>16</td><td>0.229</td><td>0.254</td><td>0.282</td><td>0.314</td><td>1.079</td><td></td><td>40</td></tr><tr><td>17</td><td>0.206</td><td>0.229</td><td>0.254</td><td>0.282</td><td>0.971</td><td></td><td>36</td></tr><tr><td>18</td><td>0.185</td><td>0.206</td><td>0.229</td><td>0.254</td><td>0.874</td><td></td><td>32</td></tr><tr><td>19</td><td>0.167</td><td>0.185</td><td>0.206</td><td>0.229</td><td>0.787</td><td></td><td>29</td></tr><tr><td>20</td><td>0.150</td><td>0.167</td><td>0.185</td><td>0.206</td><td>0.708</td><td></td><td>26</td></tr></table>

![](images/1a39a1ac4cc1ebcf429340e94ddbe41ceee0114ce0805ccaec10ea8abd8a28e6.jpg)  
Fig. 12.2 Generic units in population in year t after introduction, x(t),

Note, for example,

$$
\mathrm {f} (7) = 3 6. 9 0 \times 2. 7 8 6 = 1 0 3
$$

when probability of scrap per year is $r = 0.1$ , scrap free years is $j_{o} = 2$ , and production years is $t_{o} = 4$ (Fig. 12.2)

# Summary

Forecasts of the following type are described: (1) The month-1 forecast is adjusted as the month progresses and the demand-to-date becomes available. The forecast includes the remaining portion of the month-1 and the associated standard deviation. (2) Advance demand forecasts are needed when demands arrive months before the customer wants delivery. The advance demand forecast for a month is based on the flow of demands from the history months and also the advance demand for the future month. (3) In service parts, a forecast is often needed for a part that has no history demands. This occurs when the part is new on the bill-of-material, but yet the part is needed in stock at the service part holding location. (4) Also in service parts, a supplier may inform that the part will no longer be available and the service part location will need an all-time-buy. This requires a forecast on demands that may occur over the coming years for the obligation period of the part.

# Bibliography

Abramowitz, M., & Stegun, I. A. (1964). Handbook of mathematical functions with formulas, graphs, and tables. (pp. 931-937). Washington D.C.: U.S. Department of Commerce.   
Altay, N., & Lewis, A. (2011). Service parts management: Demand forecasting and inventory control. New York: Springer-Verlag.   
Armstrong, J. S. (2001). Principles of forecasting. New York: Springer.   
Brown, R. G. (1956). Exponential smoothing for predicting demand. ORSA, Nov.   
Brown, R. G. (1959). Statistical forecasting for inventory control. New York: McGraw Hill.   
Brown, R. G. (1962). Smoothing, forecasting and prediction of discrete time series. Englewood Cliffs: Prentice Hall.   
Chase, C. W. (2013). Demand driven forecasting. New York: Wiley & SAS Business Series.   
Chatfield, C. (2000). Time series forecasting. Little-John85, London.   
Chisholm, R. K., & Whitaker, G. R. (1971). Forecasting methods. Homewood: Irwin.   
Gross, C. W., & Peterson, R. T. (1976). Business forecasting. Boston: Houghton.   
Hastings, C. Jr. (1955). Approximation for digital computers. Princeton University Press, Princeton, New Jersey.   
Holt, C. C. (1957). Forecasting seasonal and trends by exponentially weighted moving averages. Pittsburgh: Carnegie Institute of Technology.   
Holt, C. C., Modigliani, F., Muth, J. F., & Simon, H. A. (1960). Planning production inventories and work force. Englewood Cliffs: Prentice Hall.   
Hong, W. C. (2013). Intelligent energy demand forecasting. New York: Springer-Verlag.   
Lewis, C. (1997). Demand forecasting and inventory control. New York: Wiley.   
Mahaso, A. (2012). Demand forecasting and management practices. Zimbabwe: Lap Lambert Academic.   
Makridakis, S., & Wheelwright, S. C. (1977). Interactive forecasting. San Francisco: Holden-Day.   
Montgomery, D. C., & Johnson, L. A. (1976). Forecasting and time series analysis. New York: McGraw Hill.   
Montgomery, D. C., Jennings, C. L., & Kulahci, M. (2008). Introduction to time series analysis and forecasting. New York: Wiley.   
Moon, M. A. (2013). Demand and supply integration. Upper Saddle: F. T. Press.   
Thomopoulos, N. T. (1980). Applied forecasting methods. Englewood Cliffs: Prentice Hall.   
Winters, P. R. (1960). Forecasting sales by exponentially weighted moving averages. Management Science. Vol. 3, pp. 324-342.

# A

Additive, 17

Advance demand, 5, 10, 11, 16, 21, 165, 167-169, 178

Aggregate demand, 7, 8, 89

All-timerequirement,173

Approximation of $\mathrm{F(z)}$ from z, 147

Approximation of $z$ from $\mathrm{F(z)}$ , 147

Assembly line, 2, 170, 171

Assembly process, 173

Attribute, 170, 171

Average monthly forecast, 157, 161

# B

Bill-of-material,10,165,170,178

Binomial, 91

Bom, 170, 173

Buy, 71, 150-153, 155, 156, 165, 170, 173, 175, 178

# C

Calculators, 2

Coefficient, 3, 72, 74, 79-82

Coefficient of variation, 6, 8, 9, 18, 20, 21, 25-27, 29, 34, 39, 71, 73, 75, 81, 83, 85, 87, 93, 97, 98-102, 107-109, 114, 116, 117, 137, 143, 145, 146, 148, 149, 154, 156-158

Control of the Inventory, 149

Cumulative distribution, 146, 148, 159

Cumulative forecasts, 6, 12, 21

Cumulative round algorithm, 19, 21, 39

Cumulative rounding algorithm, 6

Cycle stock, 150

Cyclical flow, 6

# D

Dampening, 6

Data processing, 3

DC, 7, 13, 15, 16, 89, 103

Dealers, 1, 5, 11, 13, 16, 89, 107, 149, 158, 171, 173

Demand entry, 3, 5, 6, 11, 17, 18, 32, 33, 39, 77

Demand flow, 7

Demand forecasting, 3, 4, 19 concept of, 2

Demand history, 4, 5, 8, 11, 12, 15, 17-21, 27, 29-31, 36, 37, 71-75, 78, 79, 82, 83, 92, 93, 99, 103, 108, 109, 111-117, 119, 121-123, 125, 127-129, 131-135, 170, 174, 175, 177

Demand patterns, 3, 6, 9, 17, 107, 119

Demand-to-date, 5, 9, 11, 165, 166, 178

Desired percent fill, 152, 161

Discount, 6, 16, 23, 29, 31, 39, 110, 111, 29

Discounting, 29, 39

Discount parameter, 6, 29, 110, 111

Discount weight, 29, 110, 111

Distribution center, 1, 5, 7-9, 11, 13, 20, 89, 90, 102-104, 107, 149, 158, 170

# E

Engineering change, 10, 165, 171, 173

Exponential smoothing, 3, 4, 32

# F

Fgi, 169-171, 173-175

Filtering, 9, 20, 119-125, 127-129, 131, 132, 136

Filtering algorithm, 20, 120-122, 127-129, 131

Finished-good-item, 13, 173

Fitted values, 73, 74, 77, 78, 83, 84, 86, 115, 116, 120, 125, 126, 129, 130

Forecast errors, 6, 18, 23, 26, 27, 30, 31, 108, 109

Forecast model, 3, 4, 6, 14, 23, 24, 29-31, 39, 71, 75, 76, 81, 87, 99, 107-112, 117, 118, 120-122, 125-131, 174

Forecasts, 1, 2, 3, 5-9, 11, 12, 14, 16, 18, 19, 21, 24, 25, 29-31, 33, 38, 39, 71, 75, 77, 78, 85, 105-107, 89, 108, 92, 93, 98, 99, 102-107, 120, 108-112, 114, 127, 115-117, 136, 121, 128, 131, 132, 149, 150-152, 165, 169, 29, 173, 175, 177, 103, 105

# H

Horizontal demand, 107, 108, 110, 113-115, 117, 136, patterns, 3

Horizontal filtering, 121-123, 125

Horizontal forecasts, 152

# I

Identities, 142

ILLIAC,4

Initial buy, 165, 170

Initial buy quantity, 10, 165, 170

Initial forecast, 170

Initialize stage, 72, 79

Initial stage, 71, 86, 87

Integer forecasts, 6, 12, 21, 23-25, 30, 38, 39, 104-106

Inventory, 1-3, 5, 6, 8-11, 18, 19, 23, 33, 34, 39, 89, 90, 102, 103, 106, 107, 114, 117, 119, 132, 134, 136, 137, 139, 149-151, 153-157, 163, 165

Inventory control, 4, 6, 9, 18, 114, 137, 139, 156, 163

system, 1

Inventory profile, 12

# L

Lead-time, 1, 151-155, 157, 158, 160-162

Lead-time coefficient of variation, 158, 161, 162

Lead-time forecast, 151, 161, 162

Least squares, 24, 25, 27, 72, 79

Level, 6, 18, 20, 23-25, 27-30, 32, 33, 37, 38, 72, 73, 76, 78, 79, 81, 82, 85, 86, 92-96, 99-102, 110, 111, 112, 115, 116, 126, 129, 130, 132, 149, 150, 152, 163

Limit, 120, 126, 131, 134

Limits on w, 146

Line demands, 9, 119, 132-135

Location parameter, 140, 145, 146, 159, 162

Lognormal, 171, 172

Lower limit, 133, 134

# M

Matrix, 80-82

Mean and standard deviation, 139, 144, 148, 161, 162

Monthsupply,155

Multiplicative, 4, 16, 17, 112, 129

# N

New-parts-of-the-past,170

Normal distribution, 9, 18, 19, 137, 138, 144, 148-152, 157, 158, 160, 162, 163, 167

Npof, 170

Npop, 170, 171

# 0

Oem, 169, 173

On-hand, 150, 151

On-order, 150, 151

Order cycle, 150, 152, 153

Order entry, 5, 9, 11, 34, 132-134, 136

Order level, 150-153

Order point, 150-153

Orderquantity,151-155,161

Original equipment manufacturer, 169

Other requirements, 5, 11, 15

Outlier, 5, 12, 18, 20, 107, 113-117, 136, 119, 120, 122, 124, 113, 126, 115, 127, 128, 131

Outlier demands, 8, 9, 18, 21, 107, 119, 136

# P

Parameter, 24, 27, 32, 33, 39, 76, 77, 84, 92, 98, 110-113, 137, 139, 140, 143-145, 148, 151, 157, 158, 161, 173, 175

Partial, 137, 139-141, 144-146, 153-155, 161, 167, 168

Partial expectation, 139, 140, 145, 153-155, 161, 167, 168

Partial mean, 9, 137, 145, 161

Partial measures, 139, 140, 148

Partial standard deviation, 9, 137, 139, 145, 168

Partialvariance,139

Percent fill, 9, 149, 150, 152-157, 160, 162, 163

Percent fill method, 149, 150, 152, 154, 156, 157, 160-163

Percent of annual demand, 20

Percent of part numbers, 19, 20

PF, 152-156, 161

Plant, 103, 173

Probability density, 138, 140, 158

Production, 2, 9, 14, 149, 170, 173-177

Promotion demands, 5, 11, 16

Promotion horizontal model, 7, 71, 87

Promotion trend model, 71, 78, 84, 87

# R

Randomly generated demands, 109, 111, 112, 115

Random variable, 91, 139, 146, 148

Raw forecast, 6, 23-25, 30, 36, 39, 104-106

Regression, 71-73, 79, 87, 109, 115, 117, 126

Regular demands, 5, 11, 15

Replenish, 5, 11, 14, 103, 106, 151-153, 173

Replenish stock, 5, 11, 14, 151, 153

Residual error, 24, 25, 28, 30, 73, 74, 81, 83, 85, 114, 120, 126, 130, 135

Residual errors, 25, 28, 30, 73, 74, 83, 114, 120, 126, 130

Retail items, 106

Return demands, 5, 11, 21

Revised forecasts, 98

Revision stage, 71, 72, 79, 86, 87

# S

Safety factor, 133, 151-155, 159, 160, 162

Safety stock, 8, 9, 18, 107, 114, 119, 146, 149-157, 160-163

Scrap, 174-177

Seasonal additive, 16, 17

Seasonaldemand,18,107,112,136

Seasonal filtering, 129, 131

Seasonal filtering algorithm, 129

Seasonal forecasts, 6

Seasonal model, 130, 132

Seasonal multiplicative model, 6

Seasonal ratios, 112, 129

Sensitivity, 107, 154

Service level, 149, 154, 156, 157, 163

Service part demands, 171

Service parts, 2, 5, 10, 11, 13, 19, 165, 169, 170, 173, 178

Service parts distribution center, 11, 13, 169, 173

Shoe, 7, 8, 89, 103

Simulated, 108, 109, 114

Simulation, 8, 107-111, 113, 115

Size and width, 7, 8, 89, 103, 105

Sku, 2, 7, 8, 89-92, 97-99, 101-104, 106, 163

Sku forecast, 8, 97, 98, 103, 106

Slope, 6, 20, 78, 85, 86, 92, 93, 98-102, 112, 116, 126, 129, 130

Smooth, 32, 33, 112

Smoothed, 4, 32, 33, 93, 99

Smoothing, 3, 6, 23, 32, 33, 39, 71, 72, 76, 77, 79, 84, 87, 92, 98, 112, 113, 130

Smooth parameter, 32, 33

Spdc, 169, 171, 173, 175

Standard deviation, 6-8, 10, 18, 23, 25-28, 30, 31, 33, 34, 39, 71, 73, 75, 81, 83, 85, 87, 90-93, 95-103, 108, 109, 111-116, 120, 126, 130, 133, 137-140, 145, 149-154, 156-162, 165-169, 171, 172, 178

Standard normal, 9, 137-140, 142-145, 148, 149, 151, 157, 158, 160, 163, 167, 171, 172

Standard normal distribution, 9, 137-140, 142, 143, 151, 158, 163, 171

Stock-keeping-unit, 2, 7, 89

Stock location, 71

Stores, 1, 5, 11, 13, 14, 90, 102, 105, 107, 149, 105

Style, 2, 8, 103-106

Sum of squares, 24, 83

Supplier, 7, 10, 16, 17, 71, 103, 104, 106, 165, 173, 175, 178

# T

Top-down, 8, 89, 90, 92, 102-104, 106

Total requirements, 15

T-ratio, 120, 126, 130

Trend, 5, 6, 8, 9, 12, 14, 16, 17, 23, 78, 81, 92, 98, 99, 108-113, 115-117, 136, 125, 126, 115, 127-129, 131, component, 3

Trend discount forecasts, 6

Trend filtering, 125, 127, 129

Trend regression forecasts, 6

Trend smoothing forecasts, 6

Truncatedexpectancies,140

Truncated mean and variance, 142

Truncated normal, 9, 137, 140, 143-145, 148, 143, 156-162

Truncated normal distribution, 9, 140, 143, 145, 148, 143, 156, 157, 159-162

Truncated standard deviation, 142

# U

Unbiased estimates, 135

Upper limit, 122, 127, 128, 131, 133, 134

# W

Weekly demands, 14