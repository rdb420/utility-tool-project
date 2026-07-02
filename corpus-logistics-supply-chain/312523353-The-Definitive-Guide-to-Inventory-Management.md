# Contents

# Chapter 1 Introduction to Inventory

What Is Inventory?

The Role of Inventory in Supply Chain Management

Why Inventory Is Such an Important Metric for Supply Chain Management

Overview of the Book

Endnotes

# Chapter 2 Inventory Management Fundamentals

Types of Inventory

Inventory Costs

Endnotes

# Chapter 3 Inventory Control

Uncertainty in Inventory Processes

Inventory Replenishment Processes

Demand During Lead Time

Expected Units Out Per Replenishment Cycle

Total Annual Cost as a Function of Order Quantity

Quantity Discounts

Endnotes

# Chapter 4 The Link Between Inventory Management and Forecasting

Uncertainty in Demand and Forecasting

Time Series Methods

Causal Models

Endnotes

# Chapter 5 Discrete Event Simulation of Inventory Processes

Understand the Inventory Replenishment Process

Randomness in Demand

Inventory Simulation in Excel

Endnotes

# Chapter 6 Additional Inventory Management Processes and Concepts

Multi-Item Inventory Management

Multi-Echelon Inventory Management

The Newsvendor Model

Censored Distributions

ABC Inventory Classification

Material Requirements Planning

Distribution Requirements Planning

Aggregate Inventory Control: Inventory Throughput Functions

Storage of Inventory

Inventory Record Management

Implementation Challenges and Challenging the Incumbent Process

Endnotes

# Chapter 7 Managing Supply Chain Inventory Flows

Component Risk Pooling

Bullwhip

Inventory Postponement

Merge-in-Transit

Vendor Managed Inventory

Consignment

Reverse Consignment

Collaborative Planning, Forecasting, and Replenishment

Push Versus Pull

Channel Separation

Inventory Placement Optimization

The Global Supply Chain Impact

Retail and Consumer Products Inventory Management

Endnotes

# Chapter 8 Inventory Performance Measurement

Trade-Off Analysis

Types of Measures

4-V Model

Measurement Systems and Frameworks

Management by Exception

Measurement Dashboards

Endnotes

# 1. Introduction to Inventory

In June 2013 the Council of Supply Chain Management Professionals (CSCMP) released its annual State of Logistics Report. The document consists of several key logistics-related trends and data analyses that provide the reader with a snapshot of the emerging issues in the discipline and a source for benchmarking supply chain activities of a firm. One of the primary aspects of the report was the discussion of inventory trends. According to the report, inventories in the retail, wholesale, and manufacturing sectors all rose in 2012. Interestingly, retail inventories increased by 8.3 percent, more than twice the increase of wholesale inventories and more than six times that of manufacturing inventories. Likewise, inventory-related costs increased, with inventory carrying costs up by 4 percent. Perhaps even more interesting was the fact that these inventories were not necessarily moving, as the retailers reported significant overstocks through the latter half of 2012.

As the CSCMP report highlights, inventory is a fundamental measure of the overall health of supply chain and logistics activities. Because supply chain management efficiencies and executional excellence have become core strategic goals for most major firms over the last two decades, there has been a surge in C-level executives who focus on inventory-related costs and measures. Inventory reduction initiatives have become commonplace, with many supply chain and logistics professionals indicating that inventory-related efficiencies have become a culture and mindset within their organizations.

With so much emphasis on inventory, we feel it necessary to start this book with the basic fundamentals and foundations of the concept. So, we open with a question...

# WHAT IS INVENTORY?

What is inventory?1 This may seem like somewhat of a rhetorical question. Perhaps, at the very least, it could be considered a question with an obvious answer. However, inventory is one of the most interesting, intriguing, and misunderstood business phenomena. At the root of this misunderstanding are the various perspectives on what inventory represents. Thus, the next sections present the predominant definitional perspectives on inventory.

# The GAAP Perspective

According to Generally Accepted Accounting Principles (GAAP), the primary framework for financial accounting standards, inventory is a current asset. In particular, inventory represents “tangible personal property which are held for sale

in the ordinary course of business; are in process of production for such sale; or, are to be currently consumed in the production.” In other words, inventory (in the form of “work-in-process,” “raw materials,” or “finished goods”) is an asset because it represents property that is likely to be converted to revenue, as the ultimate goal of inventory is to facilitate sales for an organization. Thus, Accounting 101 would indicate that inventory is properly accounted for on financial statements by being reported in dollar value terms as a current asset on the balance sheet.

Several years ago, an undergraduate student asked one of the authors an insightful question. “If inventory is an asset, then why are so many firms engaging in ‘inventory reduction initiatives’?” This question underscores the intriguing nature of inventory. Yes, according to GAAP, it is an asset, as it represents potential revenues. However, themanagement of inventory renders it an asset that comes with a price tag. Thus, inventory management is why inventory is such an interesting business phenomenon. It’s the art of managing an asset that is often viewed as a liability even though it is an asset. Various measures of inventory in the supply chain are perhaps the most salient metrics for the efficiency and effectiveness of the supply chain.

# The Supply Chain Management Efficiency Perspective

One of the primary goals of supply chain management is to ensure that operations within and across firms in a supply chain are efficient. In many cases, the means to ensure efficiencies is in inventory; more specifically, in inventory reductions. Considering this, inventory is often viewed as a liability to efficient supply chain management. While supply chain managers recognize the necessity of inventory, the unwritten (and in many cases, written) rule is to keep inventory at a bare minimum. This goal gave rise to many of the popular supply chain management frameworks that are ubiquitous today: just-in-time inventory management; lean inventory; and even collaboration initiatives like collaborative planning, forecasting, and replenishment (CPFR). Overall, these strategic initiatives were all developed with the goal of streamlining inventories across the supply chain and keeping inventory investment as low as possible.

The concept of inventory investment is, perhaps, the underlying reason why supply chain managers attempt to keep inventories low. The cost investment associated with having inventories can be high. These costs are addressed in much more detail later in the book, but suffice it to say, for now, that these costs include the cash outlay required to actually purchase the inventory, the costs of holding the inventories (which includes the cost of having invested in inventories instead of something else), and the costs associated with managing the inventory.

Considering this, the managerial approach of keeping inventories as low as possible is not necessarily because it’s inventory, per se, but because it’s money—money tied up in something that costs even more money as it sits idle. In addition, metrics

such as return on assets are affected by inventory since inventory is in the asset category on the balance sheet.

# The Risk Management Perspective

Perhaps another interesting answer to the “what is inventory?” question is the risk management perspective. An interesting shift occurred recently regarding inventory. Though most firms still attempt to keep inventories as low as possible because of the costs associated with holding and managing it, there has been a growing emphasis on the costs of not having or effectively managing inventories.2 In other words, inventory has been increasingly viewed from a risk management perspective, where the costs and impacts of stockouts, missed service opportunities, and unforeseen supply chain interruptions have become a primary decision-driver for firms. This has resulted in firms becoming much more favorable to concepts (discussed in much more detail later in the book) such as safety stock. Their rationale has been the sentiment, “we can’t afford to not have safety stock inventory!” Because of this, inventory has interestingly become a means of managing risks.

In general, there appears to be much more sensitivity to the risk of potential supply chain disruptions.3 In many cases, these disruptions are the result of some uncertainty involved in managing supply chain processes. Sometimes the uncertainty is because of poor information availability; sometimes it is associated with uncertainty in supplier lead times; sometimes it is uncertainty in execution of specific tasks in various supply chain processes. In any case, uncertainty is the primary culprit involved in supply chain disruptions. One way that many firms have chosen to deal with such uncertainties is to hedge against them with inventory investment. Although this philosophy is cause for much debate, the reality is that many businesses engage in this practice for various reasons and, therefore, view inventory as a means of managing and mitigating risks.

Another popular variation of the risk management perspective is investing in inventory as a means of hedging against currency and price fluctuations. Vendors often offer short-term volume discounts, the prices of many raw materials are based on market value, and purchasing from global suppliers involves currency exchange rates. To hedge against these potential fluctuations and changes, many firms opt to invest in inventory as a means of locking in prices and currency valuations. Doing this ultimately prevents them from being susceptible to the risk of inventory costs going above budgetary and capital constraints.

# The Balanced Perspective

As all the preceding definitional perspectives suggest, inventory has a variety of meanings and symbolic roles within supply chains. This understanding is perhaps

the most important and fundamental starting point for effective inventory management. Inventory is an asset, but an asset that firms don’t want too much of. Yet not having “too much” could put the firm at risk of potential supply chain disruptions and unforeseen extreme costs. As such, the key to effective inventory management is balance—maintaining adequate inventories to ensure smooth production and merchandising flows while simultaneously minimizing inventory investment to ensure firm financial performance. This balance is often referred to as optimal.

The quest for optimal inventory levels is not an easy undertaking. It involves an interweaving of several analytical methods and techniques. Moreover, several interconnected decisions must be made to maintain optimal flows and seamless exchange of inventories along the supply chain. These issues are the focus of this book and are discussed in much detail in the forthcoming chapters.

# THE ROLE OF INVENTORY IN SUPPLY CHAIN MANAGEMENT

Managing customer and vendor relationships is a critical aspect of managing supply chains. In many cases, the collaborative relationship concept has been considered the essence of supply chain management. However, a closer examination of supply chain relationships, particularly those involving product flows, reveals that the heart of these relationships is inventory movement and storage. Much of the activity involved in managing relationships is based on the purchase, transfer, or management of inventory. As such, inventory plays a critical role in supply chains because it is a salient focus of supply chains.

Perhaps the most fundamental role that inventory plays in supply chains is that of facilitating the balancing of demand and supply. To effectively manage the forward and reverse flows in the supply chain, firms have to deal with upstream supplier exchanges and downstream customer demands. This puts an organization in the position of trying to strike a balance between fulfilling the demands of customers, which is often difficult to forecast with precision or accuracy, and maintaining adequate supply of materials and goods. This balance is often achieved through inventory.

For example, a growing trend is the implementation of sales and operations planning (S&OP) processes.4 The fundamental purpose of S&OP is to bring the demand management functions of the firm (for example, sales forecasting, marketing) together with the operations functions of the firm (for example, manufacturing, supply chain, logistics, procurement) and level strategic plans. This often involves extensive discussions about the firm’s on-hand inventory, in-transit inventory, and work-in-process. Such discussions allow the sales and marketing group to adequately plan for the forthcoming time horizon by gaining a realistic

picture of the inventory levels available for sale. Additionally, the operations groups are able to get updated and direct sales forecasting information, which can assist in planning for future inventory needs. Such information may very well result in shifts in manufacturing plans or alterations to procurement needs because of the strategic decision to focus on specific units of inventory instead of others in the near future.

Another example of balancing through inventory is the use of point-of-sale5 (POS) data for perpetual inventory management in the retail industry. For many retailers, every “beep” of a cash register upon scanning of an item’s bar code during checkout triggers a series of messages that another unit of inventory has been sold. This information is not only tracked by the retailer but is also shared with upstream vendors. As items are depleted from inventory, in some cases, both the retailer and vendor work collaboratively to determine when reordering is necessary to replenish the depleted inventory, especially at the distribution center level. This is a balancing of supply and demand because demand information is tracked to determine when to best place replenishment orders based on the time required to get the inventory to the store location. In essence, inventory decisions are used to effectively time when supply inflows are needed to handle demand outflows.

# WHY INVENTORY IS SUCH AN IMPORTANT METRIC FOR SUPPLY CHAIN MANAGEMENT

As initiatives like S&OP illustrate, inventory can be a vital part of managing supply chains. Because of this, the status of a firm’s inventory is often used as a litmus test for the overall “health” of its supply chain management processes and decisionmaking. For example, consider the firm that has excessive amounts of inventory in the form of safety stock. Such high safety stock is indeed a problem in and of itself because of the costs of holding this inventory and the opportunity costs of having working capital tied up in assets that aren’t being converted to sales. The larger issue here, however, is that this safety stock situation is likely a symptom of some sort of ineffective supply chain management decision-making. Perhaps demand forecasting is constantly and significantly inaccurate, maybe supplier lead times are unnecessarily long, perhaps firm operations are laden with bottlenecks and inefficient inventory handling, or maybe transportation carriers are not providing quality service in the form of delivering inventory damage-free and on-time. These are but a few examples of supply chain management ineffectiveness that often manifest in the form of either extensive levels of stagnant inventory or consistent out-of-stocks. Hence, inventory is an important supply chain measurement tool because it is likely one of the first signs that some root cause(s) is causing supply chain inefficiencies.

This has resulted in industry analysts, supply chain consultants and researchers, and even Wall Street paying close attention to inventory metrics to glean insights about supply chain performance trends and changes. Measures such as inventory turns, days of inventory, and cash-to-cash cycle have become popular, as they are all indicators of how well a firm’s supply chain is being managed. These inventory measures tell us, for example, how quickly inventory is moving through the supply chain, how likely the firm can handle the fulfillment of customer demands, how the firm’s liquidity is impacted by its investment in inventory, and may even signal how effectively supplier relationships are being managed.

# OVERVIEW OF THE BOOK

Considering that inventory management is clearly a fundamental aspect of supply chain management, this book has been developed to outline the concepts and techniques at the heart of effective inventory decision-making. As we established in this chapter, inventory management is a far-reaching and expansive subject. Because of this, we can’t make claims that this book will be exhaustive, by any means. However, we have carefully pieced together what we consider to be the key frameworks and approaches to assist the reader in better understanding the “what, why, how, and by what means” of inventory management decision-making.

Chapter 2, “Inventory Management Fundamentals,” builds on the definitional discussion in this chapter and provides foundational insights into the key terminology and concepts involved in inventory management. Chapter 2 highlights the different types of inventory and the various cost drivers and cost categories associated with these inventories. Because there is often confusion in discussions about inventory that is a result of lack of terminology, we carefully and thoroughly consider many different and overlapping inventory concepts. A thorough understanding of Chapter 2 facilitates your understanding of the remainder of the book.

Chapter 3, “Inventory Control,” takes the inventory management discussion further by focusing on the analyses used to make well-informed inventory decisions. Chapter 3 presents frameworks that assist in determining when inventory should be ordered, how much should be ordered, and ultimately how the inventory ordered should be managed and accounted for. The chapter concludes with some examples of managerial issues that firms have faced when implementing several of these inventory approaches. This portion of the chapter was developed to help contextualize the analysis techniques by sharing certain roadblocks, problems, and unique successes that some firms have realized when putting these theoretical concepts to practice.

Chapter 4, “The Link Between Inventory Management and Forecasting,” looks at forecasting within the context of inventory management. It is really impossible to

even examine inventory management without thoroughly discussing forecasting and how it relates to inventory decisions. You need to know how many units you are expecting to sell if you want to order an appropriate quantity at the appropriate time. In addition, the error in forecasts also contains useful information, because it is an indicator of how much uncertainty there is in demand.

Chapter 5, “Discrete Event Simulation of Inventory Processes,” describes a tool that is useful for analyzing inventory processes, the effects of forecasting methods on inventory processes, and how execution failures affect the performance of the inventory system—namely, discrete event simulation. Discrete event simulation is used to study a wide variety of processes and systems, but we are discussing its use only within the context of forecasting and inventory management. Furthermore, many software packages are specifically designed for discrete event simulation, but we explain how to conduct discrete event simulation in Microsoft Excel.

Prior to Chapter 6, we primarily look at inventory management from the perspective of an individual stock-keeping unit (SKU), but in Chapter 6, “Additional Inventory Management Processes and Concepts,” we consider inventory management with multiple SKUs. One must clearly understand inventory management and theory from the single SKU perspective to be able to fully understand multi-item inventory management since many of the concepts from single item inventory management are used in the discussion of multi-item inventory management. In addition, up to Chapter 6, we only discuss single echelon inventory management, but in Chapter 6 we extend the discussion to include multi-echelon inventory management. Many other related concepts are discussed in Chapter 6, including distribution requirements planning, which is certainly a multi-echelon concept.

Chapter 7, “Managing Supply Chain Inventory Flows,” looks at a number of topics related to overall management of the flow of inventory, including who owns the inventory, who makes decisions about when and how much to order, where the product flows vis-à-vis where the marketing transactions occur, and other related topics. We also look at questions about where inventory should be held and how orders can cause additional uncertainty in demand as they move up the supply chain.

Although performance measurement is discussed both directly and indirectly throughout Chapters 2 through 7, Chapter 8, “Inventory Performance Measurement,” focuses on inventory management performance measurement, covering some metrics we do not cover earlier in the book but are important in the discussion. We carefully include content regarding cost trade-offs and cost/service trade-offs throughout the discussion of performance measurement. This is important because many times companies focus on some set of performance metrics at the cost of others that are ignored or not measured.

# ENDNOTES

1. Daugherty, Patricia J., Matthew B. Myers, and Chad W. Autry. “Automatic Replenishment Programs: An Empirical Examination.”Journal of Business Logistics 20.2 (1999): 63-82.   
2. Ettouzani, Younes, Nicola Yates, and Carlos Mena. “Examining Retail on Shelf Availability: Promotional Impact and a Call for Research.” International Journal of Physical Distribution & Logistics Management 42.3 (2012): 213-243.   
3. Harrison, Terry P., et al. “Supply Chain Disruptions Are Inevitable—Get READI.” Transportation Journal 52.2 (2013): 264-276.   
4. Thomé, Antônio Márcio Tavares, Rui Soucasaux Sousa, and Luiz Felipe Roris Rodriguez Scavarda do Carmo. “The Impact of Sales and Operations Planning Practices on Manufacturing Operational Performance.” International Journal of Production Research ahead-of-print (2013): 1-14. Stank, Theodore P., et al. “Creating Relevant Value Through Demand and Supply Integration.” Journal of Business Logistics33.2 (2012): 167-172. Mentzer, John T., Theodore P. Stank, and Terry L. Esper. “Supply Chain Management and Its Relationship to Logistics, Marketing, Production, and Operations Management.” Journal of Business Logistics 29.1 (2008): 31-46. Autry, Chad W., and Stanley E. Griffis. “Supply Chain Capital: The Impact of Structural and Relational Linkages on Firm Execution and Innovation.” Journal of Business Logistics 29.1 (2008): 157-173.   
5. Williams, Brent D., and Matthew A. Waller. “Creating Order Forecasts: Point-of-Sale or Order History?” Journal of Business Logistics 31.2 (2010): 231-251. Nachtmann, Heather, Matthew A. Waller, and David W. Rieske. “The Impact of Point-of-Sale Data Inaccuracy and Inventory Record Data Errors.” Journal of Business Logistics 31.1 (2010): 149-158. Williams, Brent D., and Matthew A. Waller. “Top-Down Versus Bottom-Up Demand Forecasts: The Value of Shared Point-of-Sale Data in the Retail Supply Chain.” Journal of Business Logistics 32.1 (2011): 17-26. Sabath, Robert E., Chad W. Autry, and Patricia J. Daugherty. “Automatic Replenishment Programs: The Impact of Organizational Structure.” Journal of Business Logistics 22.1 (2001): 91-105.

# 2. Inventory Management Fundamentals

# TYPES OF INVENTORY

There are many different types of stock or inventory and many different ways of classifying them. In this book we spend more time talking about the different types of stock than most books on inventory management, and we classify them in more ways than most books classify them. You will also notice that many of the definitions overlap. We do this because how you should manage the stock depends heavily on the type of stock, what it is used for, how it is affected by antecedents, and what it affects. There is no need to be laconic on defining stock and no need to worry about too much overlap. It is more important to come up with the smallest set of items in the classification that gets the job done well. That is what we do in this book. In managing inventory it is crucial to communicate clearly on what you are talking about. The authors have had many discussions about inventory and inventory management with both practitioners and academics, and they have found that many times one of the challenges is that people are discussing different aspects of inventory management without realizing it. We emphasize this because it might be tempting to gloss over the following discussion, not digging in deeply and thinking things through, but we believe this would be a mistake.

As we mentioned, you will notice overlaps in our classification system. For example, one of the items in our classification scheme is retail backroom stock (RBS), and another item is safety stock (SS). Well, RBS may very well include SS. However, theoretical and practical differences make it beneficial to keep them separated, while at the same timerecognizing the overlap. Since communication about inventory management within companies and between companies is a persistent problem, we need a complete vocabulary with precision to improve the situation. Throughout this book we refer to these definitions and classifications so it is worthwhile to spend plenty of time in this section.

We often hear of projects to reduce inventory, and many times they are successful. We rarely hear careful specificity regarding which types of stock were reduced, yet it has a huge impact on the short-term and long-term implications of the stock reduction.

This is even a problem, as we will see, with those who have a cursory understanding of the terms. For example, some erroneously believe that as long as safety stock is not reduced, service levels will remain unchanged. Generally this is a fallacy that is a result of a narrow view of service. If the definition of service is the frequency with which we run out of stock during the protection period, such as the lead time, then that is true. If it is the total amount of demand fulfilled from inventory, then it is wrong. Reducing cycle stock hurts service level as we learn later in the chapter.

Another differentiating factor about our classification and our definitions that make them more useful is that we define them from both a forward looking perspective and a historical perspective. We actually do this throughout the entire book. In most inventory management books the definitions of inventory are forward looking only. Take, for example, safety stock. The forward looking definition leads to a mathematical formulation to estimate how much inventory is required to achieve a desired “service” level, whereas the historical perspective estimates how much safety stock we actually had over time.1 It would be great if we could specify a service level, calculate a required safety stock, and then later look back at the data and find that our historical safety stock was the same as our forward looking safety stock. For technical reasons, many times that does not happen. Therefore, we propose an empirical approach to setting some of these inventory levels.

Definitions of replenishment processes, service metrics, and so on, are all intertwined with our definitions and classification scheme, but you have to start somewhere. So, while we are defining these items of the classification scheme, we focus on a few definitions of service, which are defined in the course of discussion about the type of stock. We also need to do this for a replenishment process. That is, we need a couple of different types of replenishment processes. Regarding service level measures, we begin by using (1) protection period in-stock (PPIS) metric and (2) item-level fill rate (ILFR) metric. Regarding replenishment processes,2 we begin by using (1) the fixed order point, fixed order quantity (Q,ROP) process, and the fixed order interval, order up to level (T,OUL) process. These are helpful in discussing each of the definitions within the classification scheme. However, in Chapter 3, “Inventory Control,” we go into more depth on each of the service level measures as well as the replenishment processes. In addition, later in this chapter we look at other types of measures of service as well as other types of replenishment processes.

Before we define the PPIS metric, we must define protection period. Protection period3 is the interval of time over which a stockout is possible. This may seem odd since it would appear that you could stockout anytime; however, this is not the case. Consider the (Q,ROP) process. In that process you order Q when the inventory position4reaches the ROP. Well, if the ROP > 0, it is not possible to stockout prior to reaching the ROP, by definition. However, you can stockout after you reach the ROP. As soon as you hit the ROP, you place an order. The time between when the order is placed and the order is received and available for use is the lead time (L). So, with the (Q,ROP) process the protection period is the lead time. Now we can define the PPIS metric for the (Q,ROP) process—namely, the PPIS for the (Q,ROP) process is the probability of a stockout during the lead time.

For the (T,OUL) process, you only order when you get to the reorder times, which are spaced out by T periods of time. So, suppose you are at one of the reorder times,

and you calculate the difference between the OUL and the inventory and order that quantity. Then you wait for the lead time to receive the order. You cannot order again until you reach the next reorder time. Once you place your order, you can stockout anytime between order times and the lead time. Hence, for the (T,OUL) replenishment process the protection period is T + L and the PPIS is the probability of a stockout during T + L.

The item-level fill rate (ILFR) is the percentage of demand fulfilled from on-hand inventory. If demand is not fulfilled from on-hand inventory, the demand is either lost (lost sales) or back-ordered.5 In either case, that is the demand loss at that time. So, the total demand loss over a period of time divided by the total demand over that time is the ILFR.

With all of this, we can now begin to discuss each type of stock in our classification scheme.

# Cycle Stock

Cycle stock6 is the amount of inventory between replenishments. For a (Q,ROP) replenishment process, the average amount of inventory between replenishments is (Q+1)/2 for discrete units7 (such as cartons of ready-to-eat cereal) and Q/2 for continuous units (such as gallons of gasoline).8 For a (T,OUL) replenishment process, the average amount of inventory between replenishments is T × d / 2, where d is average demand per unit of time.

Each time there is an order or production release, some cost is incurred, either a transportation cost, or a setup cost, or some other fixed cost per order, including receiving costs, purchasing costs, and so on. The larger these fixed costs, the larger the amount should be ordered each time an order is placed.

Cycle stock is relatively easy to estimate. If a company always orders in truckload quantities, the average cycle stock is the truckload quantity divided by two; if the company always orders a pallet, the average cycle stock is the pallet quantity divided by two.

Consider a situation where a retailer only orders a particular stock-keeping unit (SKU) of wine from a supplier in pallet quantities for its distribution center. Each pallet has 150 cases and each case has 6 bottles. Assume that the stores only order in case pack quantities from the distribution center. Suppose there are 2 distribution centers and 200 stores. The number of bottles per pallet is 6 × 150 = 900 bottles. So, the average cycle stock per distribution center is 900 bottles / 2 = 450 bottles.9 Since there are two distribution centers, the average cycle stock in the distribution centers combined is 900 bottles. The average cycle stock per store is 6 + 1 bottles / 2 = 3.5 bottles. Since there are 200 stores we have 200 stores × 3.5

bottles per store = 700 bottles.10 The total cycle stock in the retail network is 700 bottles plus 450 bottles = 1,150 bottles.

For a (T,OUL) process, it is similar. Suppose you order to bring the inventory position up to OUL. Suppose a distribution center goes through 1,000 bottles per week, and the distribution center orders once per week. Then in that case, the average cycle stock per distribution center is 1,000 / 2 = 500 bottles. Suppose each store orders once per week and each goes through 6 bottles per week; then the average cycle stock per store is (6 + 1) / 2 = 3.5.

The point of all of this is that it is relatively easy to estimate cycle stock with both the (Q,ROP) and the (T,OUL) replenishment processes. This is nice because cycle stock is often a large component of total inventory, so it is a step closer to estimation of inventory requirements. Such estimation is easy to do in a meeting on the back of a napkin yet few know about this method.

These methods are forward looking, not historical. That is, we use these methods to estimate what the average cycle stock is, but it might be different in reality. It is easy to see why it might be different for the (T,OUL) replenishment process since the average cycle stock is estimated to be d × T / 2. That is, the actual average demand might turn out to be different from d. But why would it be different for the (Q,ROP) method? Well, it could be that you run out of inventory and lose sales every replenishment cycle.11 Suppose you start the month with 100 units and you run out half way through the month. Then your average inventory in the first half of the month is 50, but the last half of the month is zero. So the average cycle stock during the month is (50 + 0) / 2 = 25. With the (Q,ROP) replenishment process and lost sales, it is possible for the (Q + 1) / 2 method to be different from the historical calculation of cycle stock.

To reiterate, for the (T,OUL) method of estimating forward looking cycle stock, d × T can be inaccurate if the average demand is different from d. That would not be surprising. On the other hand, for the (Q,ROP) method, (Q +1) / 2 will be different if there are frequent and deep stockouts.

We now discuss the measurement of historical cycle stock. As soon as the perpetual inventory goes up as a result of receiving an order, begin to take the average of onhand inventory. Cease taking the average at the time before the next replenishment arrives. Now subtract the final on-hand inventory from the average inventory to arrive at the average cycle stock for one replenishment cycle. This continues over time, and the average cycle stock for a set of replenishment cycles is the estimate of the historical safety stock.

For the (Q,ROP) replenishment process, higher levels of cycle stock can improve item-level fill rate (ILFR). To understand why, let’s take an extreme example.

Suppose you set Q such that you order just enough for one day of supply. Then you will have to reorder 365 times during that year, meaning that you will be exposed to lead time failures 365 times during the year. On the other hand, if you set Q such that you order enough for the entire year, there will only be one time per year you are faced with the possibility of a lead time failure. In the former case the number of stockouts due to lead time failures will be high compared to the latter case.

The same would not necessarily be true for the (T,OUL) process because you can stockout anytime during T. For the (Q,ROP) process, you replenish, on average, every Q/d periods of time, but if demand picks up, you order early. Whereas with the (T,OUL) you might not be able to order early. For example, a company might order a truckload per week of 20 different SKUs from a supplier. Ordering one SKU early because its demand picked up might not be cost effective, especially if these SKUs yield low margin in the market. In that case, expedited transportation might not be economical. Hence, more forward looking cycle stock in this replenishment process may not have as much impact on ILFR as it does in the (Q,ROP) replenishment process.

We have focused on cycle stock in the context of two different replenishment processes, the (Q,ROP) process and the (T,OUL) process, but there are many other hybrid processes, some of which we discuss inChapter 3. The ideas for estimating forward looking cycle stock are key in the other processes as well so we focus on these two types of replenishment processes for now.

# Safety Stock

Forward looking safety stock12 is the expected number of units on hand when the replenishment arrives and is available for use. Historical safety stock is the average amount of inventory on hand when the replenishment arrives and is available for use. Historical safety stock and forward looking safety stock can differ because (1) the assumed replenishment process in the safety stock calculation is different from the actual replenishment process, (2) the assumed distribution of demand is different from the actual distribution or the demand is nonstationary, (3) the actual lead time distribution differs from the actual lead time distribution, if it even exists, or (4) other types of execution errors exist that are not accounted for in the forward looking safety stock calculation. We address each of these in turn.

Historical safety stock and forward looking safety stock can differ because the assumed replenishment process is different from the actual replenishment process. If the (Q,ROP) or (T,OUL) replenishment processes are used, it is easy to find calculations of safety stock in the literature. However, it is rare to find such pure processes in practices. For example, to implement the (Q,ROP) process, all of the SKUs you are ordering would have to be ordered whenever they hit their reorder point (ROP). If transportation costs are low enough relative to inventory costs, this

might be possible. For example, suppose you are ordering an expensive component, so expensive that even air carriage is a small fraction of the inventory carrying cost. In that case, it might make sense to order each SKU by air each time the ROP is hit. But for most SKUs, you really need to order several SKUs at the same time due to the fact that they all need to go on the same pallet or truckload or carload. This sounds like a (T,OUL) process, where you could set T so that you go through enough demand on average where you can order several SKUs at the same time. However, this also has a strong assumption. That is, each time you order, you must order up to OUL. The problem is that you might need to only order in multiples of some number, such as case packs or truckloads. That is, using a strict (T,OUL) process, you might need to order a pack and a half to bring the inventory position up to OUL, but you then might have to order two as a minimum order quantity from the supplier. Similarly, what if several SKUs run out before T units of time, then if the cost of a stockout is high enough, an emergency order will be placed. If that is possible, the forward looking safety stock calculations based on the (T,OUL) replenishment process will not be accurate, because emergency orders are not a part of the (T,OUL) process. In addition to this situation, suppose you order all of the SKUs using a (T,OUL) process, and you are only at 60 percent of a full truckload. It might be optimal to order more of some products to fill the truck up the rest of the way, increasing transportation utilization. If this is possible, then this is not a true (T,OUL) process but a hybrid, and safety stock calculations based on the (T,OUL) process will be inaccurate.

Historical safety stock and forward looking safety stock can differ because the assumed distribution of demand is different from the actual distribution or the demand is nonstationary. Even with the traditional (Q,ROP) and (T,OUL) replenishment processes, many of the forward looking safety stock calculations are based on a limited number of demand distributions, including the normal, Poisson,13 Laplace,14 and empirical distributions. In reality, there are many times were we actually face a mixture of distributions. For example, in retail, the distribution of demand is different for different days of the week; the preponderance of shopping occurs on the weekend. Even more problematic, the majority of SKUs in retail face nonstationary demand. For simplicity we can assume that this means that their mean and/or standard deviation change over time.

Historical safety stock and forward looking safety stock can differ because the actual lead time distribution differs from the assumed lead time distribution. Lead time is the time between when the order is placed and when the inventory is available for use. It is not just the transportation time. Many times errors are made in calculating safety stock by using transportation time to represent lead time. Lead time can also include order placement time, order picking, staging, loading, transportation, receiving, put away, and so on. In addition, sometimes the standard deviation of transit time is used in place of the standard deviation of lead time.

Execution errors in all the steps in the lead time can contribute to the standard deviation of lead time.

You might wonder why you would want to calculate both forward looking and historical safety stocks. The reason for this is that it can allow you to adjust your forward looking safety stock to fit reality, and it can help you identify whether this difference is the reason for stockouts or excess inventory. Empirical estimates of the relationship between causes of safety stock and actual level of safety stock can be estimated to set future safety stock levels more accurately. One benefit to this is that you do not have to derive the exact analytical model, which might very well be impossible.

As we have already discussed, both safety stock and cycle stock can be used to deal with stockouts. In many textbooks, it is often purported that safety stock alone is used to address uncertainty in supply and demand. This is simply not true. For any given target Line Item Fill Rate (LIFR) you can adjust safety stock, cycle stock, or both to hit the target. Now, for the PPIS metric in the (Q,ROP) process, only safety stock can affect it by definition. For this unique situation, PPIS is the probability of being in stock during the lead time. However, even for this process, the LIFR can be adjusted either through cycle stock or safety stock. Having more variables to use for adjusting this is better than having fewer variables.

One might wonder why it even matters to differentiate between cycle stock and safety stock. In fact, some textbooks don’t even use the two terms. Well there are many reasons to want to manage them in different ways. For example, in brick and mortar retail establishments, having less than a certain amount of inventory on the shelf doesn’t look attractive. Safety stock can be used to address this issue. In addition, in some cases, a certain amount of cycle stock is necessary. For example, suppose transportation costs dramatically outweigh inventory costs. In that case it might be that inventory is ordered in truckload or carload quantities; both LIFR and PPIS must be managed through safety stock.

# In-Transit Stock

In-transit stock15 is inventory that is not being stored for later use or sale but is en route to an inventory holding node.16 The most obvious in-transit stock is inventory that is in a transportation unit, such as on a truck, train, ship, or airplane.

However, just because it is in a transportation unit does not mean that it is intransit stock. For example, if inventory is held in a truck trailer for sale directly from the truck trailer, it is not in-transit stock; the truck trailer is actually an inventory holding node. Similarly, if you look at inventory in a distribution center, some of it is in a node and some of it is in-transit stock. If the inventory is being cross docked through the distribution center, it is in transit. Similarly, if you see inventory in the backroom of the store, awaiting stocking to the shelves, it is in

transit until it gets to the shelves. On the other hand, if inventory is held in the backroom of a store until the shelf needs to be restocked, it is not in-transit inventory; the backroom of the store is an inventory holding node. In general, anytime inventory is “in the lead time,”17 it is in-transit stock.

For precision of discussion, we refer to in-transit stock that is being transported as in-transport stock. In-transit stock that is being cross docked, staged, picked, put away, and so on, we refer to as in-non-transport stock. So, in-transit stock has in-transport and in-non-transport stock. We need to make this distinction because these may have different costs, as we discuss later in this chapter.

It is also important to distinguish which portion of in-transit stock is actually being moved by a common carrier. The reason for this is that after a common carrier is tendered freight, the liability for the inventory shifts to the carrier in many cases. When this is the case, the cost of holding the inventory is lower during the time it is in transit because the liability portion of the inventory carrying cost is removed.

The forward looking expected amount of in-transit stock is relatively easy to estimate. It is the expected lead time in days divided by 365 days,18 quantity times the expected annual demand for a particular SKU. “Expected lead time in days divided by 365 days” is the percentage of the year that each unit that is sold stays as in-transit inventory. Another way to look at the calculation is expected lead time in days times expected daily sales. Each unit spends time as in-transit stock, and this way of looking at the calculation says that all of the units sold will be as in-transit stock during the lead time. As an example, suppose a product has a lead time of 5.2 weeks and an expected annual demand of 5,000. Then 5.2 weeks divided by 52 weeks per year is 0.10 years. Multiply 0.10 years by 5,000 units per year to get an expected in-transit stock of 500 units.

If the historical average in-transit stock differs from the forward looking expected in-transit stock, it may be due to errors in the expected demand and the actual demand or due to errors in the expected lead time and the actual lead time. If you take the historical average in-transit stock and divide it by what the actual demand was, that gives you what the average lead time was. This can then be used to compare to the expected lead time that is being used. If they are meaningfully different, then why are they different? Is it because some major component of the lead time was left out? Or were the actual times of some of the components of lead time grossly in error? This type of process can be good for making more accurate estimates of lead time. Having the correct lead time is important because it is used to make safety stock calculations and determine the correct time to place orders. When lead time is not correct in an automated replenishment system, it can result in either excess inventory or stockouts.

Increases in any of the components of lead time not only increase in-transit stock, but also increase the amount of safety stock and/or cycle stock required. For this reason, using the comparison of forward looking and historical in-transit stock can be particularly valuable. It is a way of keeping check on the accuracy of the lead time estimates.

When ocean carriage is used, the in-transit stock naturally is much higher than when air carriage is used. For ocean carriage, most likely the preponderance of the lead time is the transit time, whereas in air carriage, that might not be the situation. Imagine a product that is ordered from Tokyo, Japan, for use in Long Beach, California, and that lead time minus transportation time is 1 day. Suppose ocean carriage is 12 days and air carriage is 1 day. In this highly stylized example, estimating in-transit stock simply from transportation time is possibly acceptable for ocean carriage, but for air carriage it is in error by a factor of 2. However, if you are simply comparing the two, with all else being equal, you can estimate the change in in-transit stock just using the difference in transportation time. Back to the example of the product moving from Tokyo, Japan, to Long Beach, California: If a switch from ocean to air was being considered, it would result in a 92 percent reduction in in-transit stock (12-1)/12. Similarly, if the switch being considered is from air to ocean, the increase in in-transit stock would be 11-fold. In general, if any component of lead time is considered for a change, only the relative change in that component is needed to estimate the relative change in in-transit stock. This is convenient but must be weighed carefully in light of the change in total cost. For example, if in-transit stock is a small percentage of total inventory costs, a 92 percent reduction, as discussed earlier, may seem more impressive than it will actually be on total inventory.

# Promotional Stock

There are two categories of promotional stock: a promoted SKU that is continuously in the assortment, and a promoted SKU that is not carried continuously. For the former, there are many different types of promotions: temporary price reductions, promotional displays, buy one get one free, bonus packs, coupons, samplings, signage, extra inventory in the store, and many others. Many times these are used in combination with one another. For example, a temporary price reduction might be coupled with a promotional display and extra inventory.

The goal of promotions is to increase demand. However, the change in quantity sold at any given location is difficult to forecast, making it difficult to know how much additional inventory is required, if any. For products that are slow movers, where you sell one every couple of weeks, a promotion might result in selling one per day and perhaps not require extra inventory to support the increased demand.

# Demonstration Stock

Inventory held for the purposes of demonstration or display is called demonstration stock. If it cannot be sold, even if out of stock of the item, it is technically not a part of safety stock. On the other hand, if it can be sold in the case of an out of stock, it really is a part of safety stock. In that case, the safety stock is actually higher than the planned safety stock, and both the ILFR and the PPIS are actually higher than planned. In that case, it might be better just to view demonstration stock as a part of safety stock for cost and service calculations. However, if demonstration stock goes out of date or deteriorates in some way, it is not really a part of safety stock.

# Retail Backroom Stock

Retail backroom stock19 is inventory located in the storage or backroom of a retail store. Retail backroom stock may actually be in-transit stock, safety stock, or cycle stock or a combination of safety stock and cycle stock.

Before we explain this further, first note that an inventory holding node is a physical location from which orders are placed and received. If inventory is ordered from Node A and from Node B, but it travels from Node B through Node C, and then on to Node A, then Nodes A and B are inventory holding nodes and Node C is not. Node C might be a cross dock or it might be a retail backroom.

If inventory from the shelves is not replenished from the backroom, then the backroom is not an inventory holding node but simply a staging area, and, hence, the inventory is in-transit stock. If inventory is planned to be held in the backroom, the retail shelves are replenished from the backroom, and the backroom is replenished from the distribution center (DC) or supplier, the inventory in the backroom is a combination of cycle stock and safety stock.

Consider the situation where the backroom is not an inventory holding node but a replenishment arrives. It goes to the stock shelves, but some of the units don’t fit on the shelf. Then the units go to the backroom until the shelf has more space. This is a problematic situation because there may not be formal triggers to replenish the shelf when it gets too low. Technology may eventually solve this problem, but coordinating shelf capacity and backroom capacity is not an easy task. It is important for operational excellence to be able to specify what types of inventory are where and why they are there. That is why we are going into detail to provide vocabulary for discussion of these issues.

If store safety stock is set to shelf capacity, then on average, no units that arrive to the shelf from an order will fit on the shelf. Recall that safety stock is the expected number of units of inventory available just before the replenishment arrives.

Consider a continuous review (Q,ROP) system. If shelf capacity is equal to ROP + Q, then units will always fit on the shelf when an order arrives. Consider the situation where an order is placed and demand goes to zero. Then when the units arrive at the shelf, there are still ROP units since that is what it was when the order was placed. Since the order is Q units, the total number of units that will be on the shelf will be Q + ROP. The problem with this is that there will on average be (ROP – safety stock) units of empty shelf space. For a (T,OUL) process, if shelf capacity is set to OUL, it is just like setting shelf capacity to ROP + Q. Both of these situations result in wasted shelf space. On the other hand, when items have to go to the backroom because they don’t fit, that drives extra labor costs. Shelf space costs must be weighed against labor costs among other things in setting shelf capacity. The interaction of shelf capacity, order quantity, safety stock, lead time, and others determines how often units must go to the backroom.

# Replenished Retail Shelf Stock

Replenished retail shelf stock20 is inventory that is on the shelf and consists of both cycle and safety stock. It is to be distinguished from promotional stock that might also be on the shelf. Earlier we discussed promotional stock—the extra stock in the store to fulfill extra demand due to a promotion. Consider a situation where a promotional display is put in the store in an area different from the regular shelf location and that no other promotion is used in combination with the promotion display. If bar codes are used at point-of-sale21 (POS) and the items on the promotional display have a different code than the replenished retail shelf stock, confusion may occur. For example, people who would have normally purchased from the shelf may purchase off the promotional display. It might make the promotion look more successful than it actually is. Consider a promotion that involves a bonus pack and that there are also replenished retail shelf stock in the store. The bonus pack may have a different bar code, making it appear as though the demand for the replenished item is lower. This could make the forecast for the item go lower, causing out of stocks in the future. This is an important point: There is a difference between inventory categories and demand. From the consumer’s perspective, the bonus pack and the nonbonus pack might essentially be the same. So, for inventory management, we need to classify things one way, and for demand management we might need to classify them another way.

# Seasonal Stock

Seasonal stock is inventory held for a portion of the year; it may be replenished during the season or it may not be. Seasonal stock is usually purchased based on a single order, even if it is replenished. The news vendor model is an approach to calculating the order quantity. If not enough seasonal stock is purchased, sales and profit are lost. If too much is purchased, markdowns become necessary, reducing the ROI. The news vendor model attempts to balance these costs.

# Replenished Multiple Location Impulse Stock

In many retail stores, certain items are found in multiple locations. For example, candy bars are often at multiple checkstands in the grocery store and also in the candy aisle. Items can potentially be out of stock at many locations and still record daily sales if they are in stock in other locations within the store. Keeping all of the locations stocked is a store execution challenge. Many of these items are impulse items, meaning that people don’t come to the store planning on purchasing them but decide to purchase them when they see them on the shelf. This inventory may be a combination of cycle stock and safety stock for the store as a whole, but in the individual locations, the inventory can be difficult to plan and manage well. Many times the specific locations the inventory is held in changes over time, with the exception of where its continual location is in the main part of the store.

# Raw Material Stock

Raw material stock is inventory held for production. For example, to make bread, grain must be held. Running out of stock of raw material inventory can be expensive because it can cause the entire production line to shut down. Also, raw material inventory is relatively less expensive than finished goods inventory, so holding more of it can easily be argued.

Suppose a bread manufacturer keeps introducing new types of bread, and every time a new bread SKU is introduced, a new specification of grain is created, to the point that eventually there are 100 different grains for 100 different SKUs. If it would be possible to have 10 grains and still be able to produce the 100 different SKUs, the total amount of inventory required could be greatly reduced.

# Work in Process Stock

Work in process stock is inventory in the process of being transformed into the finished product. It is sometimes built up between workstations so that the entire line doesn’t have to shut down if one machine breaks down. However, when there is more stock in between workstations, the feedback loop between the workstations is longer. Just-in-time (JIT)22came to the United States through the change in perception of Japanese products being sold here. The reputation of Japanese and Chinese goods transformed from one of low quality in terms of product failures or breakdowns in the late 1960s and early 1970s to one of high quality in the late 1970s and early 1980s.23

Suppose two people, Lin and Jim, are at different workstations. Lin takes a block of wood and drills a hole in it. Jim places a wooden peg in the hole. The hole has to be just right. If the hole is too big, the peg passes clean through. If the hole is too small, the peg does not fit.

Suppose that Lin’s drill press is unreliable, but he drills a lot of blocks and produces 20 days of supply. Days of supply (DOS) are inventory divided by forecast per day. For example, 100 units of inventory are produced, and the forecast is 5 units per day. This would equal 20 days of supply (DOS = 100 units / 5 units/day = 20 days).

But Lin’s drill breaks down. Lin thinks that the drill press was drilling the correct size holes before the breakdown. However, Jim says that the holes are not the right size and asks Lin what is wrong. Lin has no idea because it has been almost 20 days since the drill press broke down, and 20 days’ material has been wasted because of the bit problem.

Now let’s change the scenario by removing the entire inventory. The drill press is working, but the drill bit has not been changed in quite a while. Jim approaches Lin with the same concern: The pegs do not fit in the holes. Lin responds by changing the drill bit immediately. This illustrates the key idea behind JIT: creating shorter feedback loops, which drive learning to improve quality. The idea is that as inventory increases it lengthens the feedback loop and hides problems that could be occurring in processes from manufacturing to sale.

There is a problem with coupling the initial scenario and the second scenario. If the inventory is depleted or eliminated, and nothing has been done to improve or replace the drill bit, when the drill press breaks down, it causes Jim to not be able to work, and he must wait. The lack of an inventory cushion when the drill press breaks down is more of a detriment in this scenario than carrying some inventory and the costs associated with it to allow for the drill to be fixed and resume production. To reduce inventory, checks must be in place to make sure the drill press is reliable.

# Finished Goods Stock

Finished goods stock is inventory in its final form after production. It can include both cycle stock and safety stock. Due to the added value, finished goods stock is more expensive to hold than work in process stock, which is more expensive to hold than raw materials stock. Also, once the finished goods inventory is produced it can deteriorate, spoil, become obsolete, get damaged, or be stolen. All of this can happen with any inventory, but, for example, it is more likely that a car might be stolen than sheet metal. For a producer, there is also the question as to where to hold finished goods stock: at the factory, a distribution center, several distribution centers, customer distribution centers, or some combination. When ordering product from a supplier, the order often arrives at one time, whereas the order from your production facility builds up over time. Therefore the optimal order quantity is different from the optimal production quantity.

# Spare Parts Stock

Spare parts stock is inventory of components that go into finished products. Spare parts are used for maintenance and for repair. Maintenance is usually scheduled way in advance, so planning for spare parts inventory is more like planning a project. The project is the maintenance, and the spare parts have to be there when the maintenance is going to occur. However, the need for spare parts for use in repair is not planned but in some cases can be forecast. Some laws exist that state that spare parts must be maintained for a certain number of years after a product is discontinued.

# INVENTORY COSTS2 4

A retailer has money wrapped up in inventory of branded baby formula. Generally, in the United States, if a person is given a particular baby formula from the hospital at the time of a baby’s birth, most people do not switch to another brand of formula throughout the time the baby needs formula. It is believed that switching formula causes stomach problems for the baby. So the consumer behavior scenario associated with this tendency is that if a brand of formula is not offered at a particular retailer, the consumer will go to another store that carries that brand of formula.

As retailers encounter this situation, they do not know how much money they lose in sales because they do not know what the demand is during this time interval. But they do know how much money they have wrapped up in inventory for that product across stores nationwide. Suppose a retailer has 3,000 stores and $10 wrapped up in inventory in each store for this particular brand, which comes to $30,000 in inventory. But how much does it cost to have $1 wrapped up in inventory? One cost is that the retailer may have debt that could be paid. So the real indicator of cost associated with carrying this inventory becomes figuring out the opportunity cost, or what a retailer could do with that $30,000 wrapped up in inventory if it could take that money and do the next most profitable thing with it. That is the cost of inventory, and in these terms the cost of holding inventory may be high for a retailer with a soaring stock and a lot of growth opportunities, depending on what it could do with the money.

Because opportunity costs are difficult to judge, typically companies use the weighted cost of capital to figure their cost associated with carrying inventory, if they do it at all.

Inventory management requires the balance of various costs. Several key questions must be considered in inventory management: How much inventory do I need? What process should be used for replenishing inventory? How are costs affected by

the replenishment process? What costs do I incur if I have too much or too little inventory?

Answering these questions should begin with a consideration of costs. If I have $1 wrapped up in inventory, the costs associated with it are called opportunity costs— what I would make if it were not in inventory. Each dollar in inventory could be used for other things. Opportunity costs could cause loss by not reducing debt or by not investing in other important actions.

There are several ways to figure the real cost of opportunity costs. One simple equation is the following: Weighted average cost of capital = cost of debt + the cost of equity. But the equation leaves out the calculation of the best return that could be obtained by investment in something other than inventory. However, it is difficult to calculate.

Decision-makers must exercise care when including storage costs in inventory. They should not include storage costs in calculations if the costs are fixed, unless they are being charged based on how much inventory they have. Suppose you have a DC that is a million square feet and you are going to keep it, even though you only use 75 percent of it. The inventory varies between 50 percent and 80 percent, and it is in a good location. The storage cost in this case may not be considered. But, say you are using a public warehouse where you are charged by how much inventory you have. In this case it should be included in calculations because it is variable.

Shrinkage costs are associated with theft, loss, or deterioration of a product. You can look historically at what shrinkage levels you have and also note what inventory levels you have and run a regression. You can do a scatter plot with average inventory level against shrinkage and to get the regression with the slope being the shrinkage factor. The shrinkage for some items can be high because they are small and expensive, and so, easily stolen. Bananas are a common item that fits with shrinkage category because of deterioration.

Some products go obsolete over a course of time, incurring obsolescence costs. When 486 processors were introduced on the personal computer market, it made older models obsolete in the eyes of consumers, though they were not technologically obsolete. For PC vendors in the 1990s this was the biggest factor in inventory costs because they had price protection. In this case, if the retail price dropped a lot the manufacturer had to make up the cost to the retailer. The same analysis of shrinkage can be applied to obsolescence.

Some states tax inventory. Most of them are highly populated states, where you want to hold inventory, because you want the product to be near the larger concentration of customers.

All these inventory holding costs combined are represented as a percentage of the value of the inventory for a year, h. Let c be the unit value of the inventory. So the cost of carrying one unit of inventory for one year is H = hc.

# Inventory Investment, Cost, and Valuation

Inventory is an asset. Inventory on the balance sheet is listed as an asset and is a snapshot of the value of the inventory at one point in time. The cost of inventory is not listed on financial statements. We already discussed the cost of inventory. The cost of inventory is often represented by an inventory holding cost factor, h, and is based on all of the drivers of inventory holding cost including the ones discussed previously. To calculate the inventory holding cost, you multiply the value of the inventory by the inventory holding cost factor. To calculate the value of the inventory, you take the value per unit times the number of units of inventory. As in the balance sheet, you sometimes want to know the value of the inventory at a point in time. At other times, you want to know the value of average inventory over some time in the past or the expected value of inventory in the future.

In accounting, three well known methods of determining the value of inventory include first-in, first-out (FIFO), last-in, first-out (LIFO), and average cost. For FIFO, the cost of the first units in are assigned to the first units out; for LIFO, the cost of the last units in are assigned to the first units out; and for average cost, the cost of the average unit is assigned to each unit out. There is also the issue of using standard costs or actual costs. Standard costs are used in accounting for simplifying things so that they don’t have to use a different cost for each SKU. But when we are making inventory decisions and analyzing inventory performance, we want to use the actual cost of a product.

One issue associated with calculation of the current value of inventory is knowing how much inventory you actually have. Even for an individual SKU it can be difficult to know how much inventory is on hand. Research shows that inventory can be off significantly. Inventory holding nodes often have a perpetual inventory system that keeps track of on-hand inventory. It adds units received and subtracts units sold or used. Again, research shows that perpetual inventory systems often have significant errors.

Errors in perpetual inventory result in errors in the calculation of the value of onhand inventory, the estimate of average inventory over some time interval, and the timing and quantity of orders. For example, a (Q,ROP) system places orders when the inventory position reaches ROP. The inventory position is equal to on hand and on order minus back-orders, so if the on hand is wrong, the inventory position will be off. For the (T,OUL) process, you order the difference between OUL and inventory position. Clearly, with either of these processes, errors in perpetual

inventory can result in either excess inventory (more than we think we have) or stockouts.

One important concept to remember is that there is a difference between inventory value and inventory cost. Sometimes people confuse a $1 million inventory reduction as a $1 million inventory cost reduction. If inventory is reduced by $1 million, the cost reduction must be calculated by multiplying the reduction by the inventory holding cost factor.

In a (Q,ROP) inventory system25 the expected cycle stock is Q/2, so the expected cycle stock holding cost is (Q/2)hc. The amount of safety stock in a (Q,ROP) system is (ROP – EDDLT) where EDDLT is expected demand during the lead time so the expected cost of holding safety stock is (ROP – EDDLT)hc.

# Fixed and Variable Ordering Costs

Ordering costs are another category of cost associated with inventory that we discuss in this book. There are two salient categories of ordering costs, namely, variable ordering costs and fixed ordering costs. Variable ordering costs are a cost per unit, whereas fixed ordering costs are a cost per order. For example, the price per unit of inventory ordered would be a variable ordering cost, whereas the cost of a truckload of product that was ordered would be a fixed ordering cost, if truckload motor carriage is the mode. However, if it were shipped by less than truckload (LTL) motor carriage, then it would be a variable ordering cost because LTL rates are given in terms that depend on how many units are transported.26 Other costs associated with fixed ordering costs include additional costs due to placing orders, receiving orders, paying invoices, and reconciling invoice match errors. Throughout the book, where it is obvious based on the context, we just refer to fixed ordering costs as ordering costs. The most common type of variable ordering cost we discuss is the cost per unit, c, which in many of the discussions is the cost being paid for the item. However, there are some costs per unit and some costs per order, such as transportation costs, that we elaborate on their effect on inventory decisions.

# Cost of an Out-of-Stock

It is costly to have inventory, but it is also costly to not have it.27Customer service is a variable we talk about in inventory management, but it has a narrow meaning. Imagine a customer is looking for kumquats at a grocery store. Many people consider good customer service to mean that, upon entering a store, the customer is asked by a smiling, neatly dressed employee what she is looking for and directs her to the kumquats. The kind of customer service we consider is to ask what is the probability that in this case the grocer will have kumquats in stock, given they carry kumquats. Generally, the higher the average inventory of kumquats the grocer has,

the greater the probability that the retailer will have them in stock, which translates into higher customer service in this concept. But when the item is not in stock, what is the cost of lost sales?

Suppose your spouse tells you to go to the store to go get some Similac baby formula late in the evening. You decide to also pick up few other things you need while you are out. After putting a few things in the grocery basket you arrive at the baby formula section to notice that the store is completely out of the brand you were sent to get. Because you do not want to go through the checkout stands of this retailer and the other store where you have to go for the formula, you decide to leave your items there and go to another store, one that might have the brand you want. You drive to another grocery store, which does have the item on the shelves, and purchase it along with the other items you need.

This scenario translates into an even greater cost to the first retailer than the margin it lost, because you were going to purchase more items other than the formula. The items you did not purchase at the first store are included in the actual lost sales cost.

The cost for the stockout was not just the profit margin of the Similac. So suppose the first retailer sells the formula for $2 and buys it for $.50 for a $1.50 profit margin.28 Therefore, the cost of lost sales for the formula alone was $1.50, but the retailer also lost sales on all the other items.

This may be complicated to figure, but it is becoming more accurate as retailers are collecting data about everything on a ticket. That means that they are able to find out the average profit of someone’s basket given that the person bought that formula. Retailers can also calculate the probability someone will leave the store if the person is not able to purchase a specific brand of formula or other products.29

If we go to the store looking for pencils and the store is out of one brand, most likely we will not leave to go to another store to find a particular brand. We will usually just buy the other brand. If we purchase another brand, the cost of the stockout of the initial brand is not the loss of the profit margin, because we will probably buy other pencils that are similar in margin. So even though there was a stockout, there was no lost sale.

I like breakfast cereal X, and have been buying it for 25 years. I have never bought the private label brand that my retailer sells, because I have thought it will probably not taste as good. One day at the store I am getting ready buy cereal X, but the store is actually out of stock. I notice that the private label brand is in stock (a private label is a brand owned by the retailer). The private label brand is sold for $1 less per box, but suppose the retailer makes a greater margin on this private label brand than on cereal X. At this point the cost of the stockout depends on my behavior. On

one hand I could buy the private label brand and be satisfied, but return to buying cereal X thereafter. In this case there is a negative cost of a lost sale because the retailer actually made a greater margin on the private label brand on just the one occasion, but thereafter the retailer made a lesser margin with the continuing purchase of cereal X. This does not account for the loss of good will with me.

On the other hand the worst case for the cereal X manufacturer is for me to buy the private label after the brand X stockout and decide that I like the private label better. If I like the private label, then I have switched brands for less cost to me, but the retailer has actually made a greater profit from the greater margin that it now collects of my brand switch. So the original scenario of the brand X being stockedout has produced a positive result from the stockout for the retailer due to the greater margin on the private label brand and for me as well. This category of stockout is usually ignored.

At the onset of inkjet printers, Hewlett-Packard (HP) was one of the few manufacturers that offered ink cartridges. If someone who works from home ran out of ink while printing a proposal, he would go to the closest office store that offers the cartridges. If that store were out of cartridges, then he would go to the nearest competitor to find what he needed. Suppose they were in stock at the second store. Customer behavior is such that if the needed product is out of stock several times in a row at a particular store, the customer will simply avoid going at all to the first retailer. If that happens, the retailer has not only lost the profit on the purchase of the one cartridge and anything else the customer might buy, but all the future profits from purchases she might have made.

But when HP first came out with inkjet printers, there were not substitute cartridges from other brands for HP to compete against. In that scenario the supplier has all the power, so if there was a stockout, HP did not have to worry about it because the customer had nowhere else to turn for cartridges. In contrast, a retailer assumed all the risk of a stockout because it had no other cartridges to offer the customer.

Over time cartridge refills from non-HP brands began to make it to market. At first, customers avoided buying them because of quality concerns or fears that it would damage their printers. Some customers would try a non-HP refill cartridge if there was a stockout of the other product. They did not want to go through the learning curve of figuring out how to refill a cartridge, but they also did not want to drive to another store for a new cartridge. So, some customers tried the refills and some of them continued to buy the refills.

# ENDNOTES

1. If narrow, unrealistic mathematical assumptions are made about the probability distribution of demand and lead time, as well as about the nature of the replenishment process per se, it is possible that the forward looking perspective and the historical perspective will be the same in the long run. The problem is that often the demand is nonstationary and not well represented by a probability distribution. That is not to say that a distribution should not be used for a practical estimate of how much inventory is needed.   
2. Hadley, George, and Thomson M. Whitin. Analysis of Inventory Systems. New York: Prentice Hall, 1963.   
3. Johnson, M. Eric, et al. “Expressions for Item Fill Rates in Periodic Inventory Systems.” Naval Research Logistics (NRL) 42.1 (1995): 57-80.   
4. Inventory position is equal to the number of units on hand plus the number of units on order, minus the number of units on back-order.   
5. If someone were at a checkstand and wanted to buy a specific candy bar but the brand was out of stock, it would be a lost sale, not a back-order, because the shopper would not wait. It might be that the next time the person is in the store, he might purchase a candy bar, but that is a separate sale altogether. Whereas, if a retailer distribution center orders a well-known brand of laundry detergent and the supplier is out of stock, the retailer will most likely wait until it is available and then the supplier will ship the product to the retailer’s distribution center. In this example, the out of stock resulted in a back-order.   
6. Coyle, John, Edward Bardi, and E. J. Bardi. The Management of Business Logistics. New York: Langley, 1996.   
7. Zipkin, Paul. Foundations of Inventory Management. Irwin, NY: McGraw-Hill, 2000.   
8. The difference between (Q+1)/2 and Q/2 is very small for large Q. Most textbooks just discuss Q/2.   
9. Actually (900 + 1) / 2 = 450.5. This is an insignificant difference.   
10. In this case, (Q + 1) / 2 makes a big difference—600 versus 700 bottles.   
11. If back-ordering is possible, it is possible for the safety stock to be negative.

12. Silver, Edward Allen, David F. Pyke, and Rein Peterson. Inventory Management and Production Planning and Scheduling. Vol. 3. New York: Wiley, 1998.   
13. Zipkin, P. Foundations of Inventory Management. Irwin, NY: McGraw-Hill, 2000.   
14. Nahmias, Steven. Production and Operations Analysis. Irwin, NY: McGraw-Hill, 2005.   
15. Coyle, John J., Edward J. Bardi, and C. John Langley. The Management of Business Logistics, New York: West Pub, 1996.   
16. A node is a location where inventory is held until an order is received or until the inventory is purchased.   
17. “In the lead time” means that it is in the time between when the inventory was ordered until the time it is received and available for use or sale. This last part is also important, that is, “available for use or sale.” Just because the truck pulls up and is received does not mean that the lead time is over. It is particularly important to define the lead time properly.   
18. This could be any unit of time, but whatever is used it must be consistent with the unit of time used in the lead time.   
19. Eroglu, Cuneyt, Brent D. Williams, and Matthew A. Waller. “The Backroom Effect in Retail Operations.” Production and Operations Management 22.4 (2012): 915-923.   
20. Stassen, Robert E., and Matthew A. Waller. “Logistics and Assortment Depth in the Retail Supply Chain: Evidence from Grocery Categories.” Journal of Business Logistics 23.1 (2002): 125-143.   
21. POS stands for point-of-sale. It is information about which products sold at what price in which stores and in what quantities. It used to be that at the end of the day, a retail store would know how much it sold by adding up the cash in the cash registers. Corporate headquarters would know how much revenue was generated when all of these sales were added together. They didn’t know for certain which specific SKUs were sold. Similarly, suppliers only knew how much they sold to retailers. They did not know which stores sold what and when. Suppliers to retailers sometimes call POS sell-through data and shipments to retailers sell-in data. POS is usually monitored on a daily basis but can also be monitored on a hourly or minute-by-minute basis. All SKUs in a store have POS every day even though it might be zero some days. A wholesale club might have 5,000 SKUs,

whereas a grocery store combined with general merchandise store may have 150,000 SKUs. Imagine a store with 150,000 SKUs. Each has a daily sales record, POS. If there are 1,000 of these stores, that is a total of 150,000,000 records each day.   
22. Schonberger, Richard J. Japanese Manufacturing Techniques: Nine Hidden Lessons in Simplicity. SimonandSchuster.com, 1982.   
23. Ibid.   
24. La Londe, Bernard J., and Douglas M. Lambert. “A Methodology for Calculating Inventory Carrying Costs.” International Journal of Physical Distribution & Logistics Management 7.4 (1977): 193-231.   
25. Assuming the inventory is continuous and/or discrete.   
26. We explain this difference in more detail in Chapter 3.   
27. Emmelhainz, Margaret A., James R. Stock, and Larry W. Emmelhainz. “Consumer Responses to Retail Stock-outs.” Journal of Retailing 67.2 (1991): 138- 147. Gruen, Thomas W., Daniel Corsten, and Sundar Bharadwaj. Retail Out-of-Stocks: A Worldwide Examination of Extent, Causes and Consumer Responses. Washington, DC: Grocery Manufacturers of America, 2002. Corsten, Daniel, and Thomas Gruen. “Desperately Seeking Shelf Availability: An Examination of the Extent, the Causes, and the Efforts to Address Retail Out-of-Stocks.”International Journal of Retail & Distribution Management 31.12 (2003): 605-617. Corsten, Daniel, and Thomas Gruen. “Stock-Outs Cause Walkouts.” Harvard Business Review 82.5 (2004): 26-28.   
28. This is hypothetical.   
29. This is probably still rare for companies to do this, but they should and likely eventually will.

# 3. Inventory Control

This chapter focuses on explaining inventory control1 processes and the effect of uncertainty in these processes. In inventory control, we have uncertainty in demand, lead time, and sometimes the review interval itself. When we place an order, if demand spikes, we might stockout before the inventory arrives. On the other hand, demand might be steady while lead time takes longer than expected, possibly resulting in a stockout.2 The fact is, there is uncertainty in both demand and lead time and that has a significant impact on the overall performance of an inventory control system. In addition to uncertainty in demand and lead time, there is uncertainty in execution of tasks involved in the inventory process, but we do not address this particular type of uncertainty untilChapter 5, “Discrete Event Simulation of Inventory Processes.”

# UNCERTAINTY IN INVENTORY PROCESSES

Many variables affect the actual sales of a given SKU: weather, number of shoppers in a store, stockouts of substitute products, advertisements, promotions, changing demographics, traffic congestion, social media, price, placement, assortment depth and breadth, parking lot expansions, road construction, news reports, and many others. Similarly, there are a plethora of drivers of lead time, including distance, order receiving processes, order picking processes, availability of product, order staging processes, carrier reliability, mode of transportation, and many others. So when you combine all these into the demand during the lead time, you have many sources of uncertainty.

Consider a retail distribution center ordering a particular SKU of laundry detergent from a supplier. Table 3-1 shows the demand during lead time for 60 orders:3

Table 3-1 Demand During Lead Time for a Retailer Distribution Center   

<table><tr><td>Order</td><td>DDLT</td><td>Order</td><td>DDLT</td><td>Order</td><td>DDLT</td><td>Order</td><td>DDLT</td></tr><tr><td>1</td><td>61</td><td>16</td><td>39</td><td>31</td><td>38</td><td>46</td><td>33</td></tr><tr><td>2</td><td>41</td><td>17</td><td>55</td><td>32</td><td>29</td><td>47</td><td>45</td></tr><tr><td>3</td><td>47</td><td>18</td><td>31</td><td>33</td><td>44</td><td>48</td><td>51</td></tr><tr><td>4</td><td>44</td><td>19</td><td>61</td><td>34</td><td>69</td><td>49</td><td>50</td></tr><tr><td>5</td><td>53</td><td>20</td><td>53</td><td>35</td><td>63</td><td>50</td><td>50</td></tr><tr><td>6</td><td>46</td><td>21</td><td>59</td><td>36</td><td>48</td><td>51</td><td>35</td></tr><tr><td>7</td><td>36</td><td>22</td><td>42</td><td>37</td><td>47</td><td>52</td><td>77</td></tr><tr><td>8</td><td>57</td><td>23</td><td>31</td><td>38</td><td>51</td><td>53</td><td>50</td></tr><tr><td>9</td><td>35</td><td>24</td><td>61</td><td>39</td><td>64</td><td>54</td><td>65</td></tr><tr><td>10</td><td>32</td><td>25</td><td>58</td><td>40</td><td>44</td><td>55</td><td>29</td></tr><tr><td>11</td><td>49</td><td>26</td><td>70</td><td>41</td><td>50</td><td>56</td><td>31</td></tr><tr><td>12</td><td>67</td><td>27</td><td>38</td><td>42</td><td>57</td><td>57</td><td>34</td></tr><tr><td>13</td><td>52</td><td>28</td><td>58</td><td>43</td><td>43</td><td>58</td><td>69</td></tr><tr><td>14</td><td>46</td><td>29</td><td>53</td><td>44</td><td>53</td><td>59</td><td>54</td></tr><tr><td>15</td><td>35</td><td>30</td><td>34</td><td>45</td><td>47</td><td>60</td><td>47</td></tr></table>

Assume the distribution center is serving 200 stores. The columns are DDLT or demand during lead time. After the distribution center places an order with this specific supplier, it keeps track of how many units are ordered from the stores and adds them together until the order is received and available for use. So, the uncertainty in the demand during lead time in Table 3-1 represents a combination of demand uncertainty and lead time uncertainty.4 Figure 3-1 is a graphical representation ofTable 3-1.

![](images/99b5adf27d59f85a428b3b53626d632b114bc95667c77c89aefbd06e95fc30e1.jpg)  
Figure 3-1 Demand during lead time for a distribution center

In Figure 3-1, the horizontal axis is the order number, and the vertical axis is demand during lead time. There is no pattern in the demand during lead time so the variability is due to randomness.

# Representing Uncertainty with Empirical Distributions

Figure 3-2 is a histogram of demand during lead time, where the horizontal axis is the bin number and the vertical axis is the frequency. For example, there were 2 orders where demand during lead time was 30 units or less, 10 orders where demand during lead time was greater than 30 but less than or equal to 35, and so on. This could be converted into an empirical probability distribution that could be used to represent the demand during lead time.

![](images/0fb2cd5e3ebcf328ee6abe5fcd416d433a0a52ff12d7eb886ef8911a5075586e.jpg)  
Figure 3-2 Histogram of demand during lead time

Table 3-2 illustrates how the histogram could be converted to an empirical probability distribution. For each bin, the frequency of observation is divided by the total number of observations. For example, for the bin representing 30 or less, there were 2 observations so $2 / 6 0 = 0 . 0 3$ . You could even use a bin for each actual level of DDLT observed.

Table 3-2 Empirical Distribution of Demand During Lead Time   

<table><tr><td>Bin</td><td>Frequency</td><td>Probability</td></tr><tr><td>30</td><td>2</td><td>0.03</td></tr><tr><td>35</td><td>10</td><td>0.17</td></tr><tr><td>40</td><td>6</td><td>0.10</td></tr><tr><td>45</td><td>13</td><td>0.22</td></tr><tr><td>50</td><td>13</td><td>0.22</td></tr><tr><td>55</td><td>9</td><td>0.15</td></tr><tr><td>60</td><td>6</td><td>0.10</td></tr><tr><td>More</td><td>1</td><td>0.02</td></tr><tr><td>Total</td><td>60</td><td></td></tr></table>

In that case, the histogram is Figure 3-3.

![](images/68d66942f554ef30082dd5ef3f467fe030f2de6ee92daf4ee63aa94b6426f966.jpg)  
Figure 3-3 Histogram of demand during lead time

Comparing Figures 3-3 and 3-2 shows that Figure 3-2 looks more like a normal distribution. We only have 60 observations, so it naturally doesn’t look very close to a normal distribution, but it certainly looks more like one than Figure 3-3. Table 3- 3 shows this histogram as an empirical probability distribution.

<table><tr><td>Bin</td><td>Frequency</td><td>Probability</td></tr><tr><td>29</td><td>2</td><td>0.03</td></tr><tr><td>31</td><td>3</td><td>0.05</td></tr><tr><td>32</td><td>1</td><td>0.02</td></tr><tr><td>33</td><td>1</td><td>0.02</td></tr><tr><td>34</td><td>2</td><td>0.03</td></tr><tr><td>35</td><td>3</td><td>0.05</td></tr><tr><td>36</td><td>1</td><td>0.02</td></tr><tr><td>38</td><td>2</td><td>0.03</td></tr><tr><td>39</td><td>1</td><td>0.02</td></tr><tr><td>41</td><td>1</td><td>0.02</td></tr><tr><td>42</td><td>1</td><td>0.02</td></tr><tr><td>43</td><td>1</td><td>0.02</td></tr><tr><td>44</td><td>3</td><td>0.05</td></tr><tr><td>45</td><td>1</td><td>0.02</td></tr><tr><td>46</td><td>2</td><td>0.03</td></tr><tr><td>47</td><td>4</td><td>0.07</td></tr></table>

Table 3-3 Empirical Probability Distribution   

<table><tr><td>48</td><td>1</td><td>0.02</td></tr><tr><td>49</td><td>1</td><td>0.02</td></tr><tr><td>50</td><td>4</td><td>0.07</td></tr><tr><td>51</td><td>2</td><td>0.03</td></tr><tr><td>52</td><td>1</td><td>0.02</td></tr><tr><td>53</td><td>4</td><td>0.07</td></tr><tr><td>54</td><td>1</td><td>0.02</td></tr><tr><td>55</td><td>1</td><td>0.02</td></tr><tr><td>57</td><td>2</td><td>0.03</td></tr><tr><td>58</td><td>2</td><td>0.03</td></tr><tr><td>59</td><td>1</td><td>0.02</td></tr><tr><td>61</td><td>3</td><td>0.05</td></tr><tr><td>63</td><td>1</td><td>0.02</td></tr><tr><td>64</td><td>1</td><td>0.02</td></tr><tr><td>65</td><td>1</td><td>0.02</td></tr><tr><td>67</td><td>1</td><td>0.02</td></tr><tr><td>69</td><td>2</td><td>0.03</td></tr><tr><td>70</td><td>1</td><td>0.02</td></tr><tr><td>77</td><td>1</td><td>0.02</td></tr></table>

# Representing Uncertainty with Normal Distributions

Table 3-3 could be used as the probability distribution to represent the demand during lead time. Table 3-3 is more granular and represents what actually happened. However, the fact that we had one observation of 55 units, no observation of 56 units, and two observations of 57 units means that if we were to use this distribution to represent demand during lead time, there would be no chance of 56 units. That doesn’t seem to be a reasonable assumption. So, on the other hand, we could simplify the distribution to that of Table 3-2. The challenge here is to select the appropriate intervals for the bin ranges. Different interval selections result in different empirical probability distributions. These can be useful for some purposes, but many times they are difficult to work with and are therefore approximated by a normal distribution or some other continuous distribution. In this case, we would approximate this with a normal distribution

with a mean of 49 units and a standard deviation of 12 units, since this is the mean and standard deviation of the observations in Table 3-1.

The problem with the normal distribution is that it can have negative values, which don’t make sense for demand during lead time. So, you probably should not use the normal approximation if the probability of negative values is greater than 0.01. To check this in Excel, use the function =NORMDIST(0,49,12,1) which returns a value of 0.00002, much less than 1 percent. The “0” in the argument means less than zero, “49” is the mean, “12” is the standard deviation, and “1” is a cumulative distribution. This can be read as the following: The probability that a normal distribution with a mean of 49 and a standard deviation of 12 will have a value less than 0 is 0.00002 or 2 chances in 100,000. If it is greater than 0.01, then the gamma distribution is an alternative. We discuss this distribution later in the chapter.

# INVENTORY REPLENISHMENT PROCESSES

In this chapter we use many graphs to represent inventory control systems. As a supply chain manager you want to get to the point where you can draw such graphs to illustrate your ideas or to ask questions. When two people have strong capabilities in drawing such graphs, they can communicate more effectively about subtle ideas and concepts. Unfortunately, based on the authors’ experience, this is a rare capability. When you consider how critical inventory management is to successful supply chain management, this inability in supply chain managers is probably hurting the efficiency of supply chains as well as stifling innovation. When people are vague about their descriptions of a replenishment process, a process can seem really innovative and compelling. However, some of these processes, after careful and rigorous thought, are found to have fatal flaws. We hope to help you improve your ability to rigorously discuss various aspects of replenishment processes using graphs of such processes. This will greatly improve your ability tocommunicate, create, and innovate. As a caveat, some of the discussion around the graphs may become tedious, but we believe this is necessary to gain a sufficient proficiency in communicating with graphs of inventory processes.

# Fundamentals of Inventory Replenishment Processes

With inventory models there are two things to consider: (1) continuous review versus periodic review, and (2) continuous levels of inventory versus discrete levels of inventory. In a continuous review5 system, the inventory level is continuously monitored, and as soon as a reorder point (ROP) is reached, an order can be placed. In a periodic review system, orders can only be placed at certain points in time. Inventory control systems can assume continuous levels of inventory as in gallons of fuel or discrete levels of inventory such as cases of candy bars. We begin

by looking at continuous review with continuous inventory levels and then cover all of the others later. We begin with a (Q,ROP) system shown inFigure 3-4.

![](images/9bb2dd9f9695041064848d5bbf7097a576edaee1aee9f647aa3101df6b72bd0e.jpg)  
Figure 3-4 Graphical representation of a continuous review, continuous inventory, (Q,ROP) inventory system

The horizontal axis is time and the vertical axis is number of units. Starting from time = 0, we see the on-hand stock decreasing. The slope of this line is the rate at which inventory is being depleted or the negative rate of demand. For example, the slope of the line might be – 2 units per day, so the rate of demand would be 2 units per day. In the graph you see that the slope of the line does not change, implying that the rate of demand is constant. We are beginning the discussion with the unrealistic assumption of constant rate of demand. It is useful for our purposes because once we allow for uncertain demand, everything becomes more complicated. Later we drop our unrealistic assumption. As you continue to follow the On Hand line down, you see that it eventually hits a dotted line labeled Reorder Point. The reorder point in a (Q,ROP) system is the number of units of inventory position where the order should be placed.

# Inventory Position

Recall that in this process orders are not triggered by a point in time but rather by a number of units of inventory position. Recall that inventory position is the on hand plus on order minus back-orders. Since there are no back-orders and no outstanding orders (by assumption), on hand is equal to inventory position. So, on hand has hit the reorder point. Notice that the inventory position jumps way up at the reorder point. That is because now the inventory position is on hand plus on

order. The amount on order is Q in the (Q,ROP) process. ${ \bf S } 0 ,$ the dotted line is inventory position, and the solid line is on hand. Also, notice where Lead Time is written below the x-axis. The lead time is between when the order is placed and when the inventory is received and available for use.

Notice that during the lead time the inventory position is the same slope as the on hand but shifted up by Q units.6 Also notice that at the end of the lead time, the inventory position and the on hand come back together. That is because, in this example, there are no longer any outstanding orders. The bracket ( { ) to the left of the point in time when the order is received represents the amount received, or the order quantity, Q. Notice that there are two other intervals of time noted below the x-axis, the Time Between Orders and the Time Between Replenishments. Since we have constant demand, and constant lead time, the time between replenishments and the time between orders is the same. Also, since we have constant and known demand and lead time, there is no need for safety stock, so you will notice that as soon as on hand hits zero, the replenishment arrives and is available for use.

Figure 3-5 is similar to Figure 3-4 in that it is continuous review, continuous inventory, known and constant demand and lead time, and a (Q,ROP) inventory process. In this case, we now have numbers associated with it. Again, the horizontal axis is time and the vertical axis is units. In this example, the lead time is four days $\scriptstyle ( \mathrm { L = 4 } \mathrm { d a y s } )$ , and the sales per day is 10 units per day. So this means that the sales during the lead time is 10 units per day times $4$ days or $^ { 4 0 }$ units. Therefore, to keep from running out of stock, we must place an order when the inventory position is $^ { 4 0 }$ . Hence, the reorder point is $^ { 4 0 }$ units (ROP = 40). In this example, the order quantity is 100 (Q=100 units). So (Q,ROP) = (100 units, 40 units). On the graph, the reorder point is shown as a red dashed line. Let’s start at the point in time designated as $\scriptstyle { \mathrm { { t } } = 0 }$ , where the order is placed. We call this order number one. As you can see, the inventory position goes up by 100 units. So now the inventory position is 100 units $+ \ 4 0$ units = 140 units. Now, at $\mathrm { t } = 4$ days, the order is received and the on hand and inventory position go up to 100. Now, to calculate the number of days between replenishments T we simply divide the order quantity by the average sales per day, or $\mathrm { T } = \mathrm { Q } / \mathrm { d } = 1 0 0$ units per order $/$ 10 units per day = 10 days between replenishments. So our time between replenishments is 10 days and our lead time is $4$ days, that is, $\mathrm { L } = 0 . 4 \mathrm { T }$ . The ratio of lead time to time between replenishments is an important variable we consider later in this chapter.

![](images/a1941b126201cc018ca8ec598e733ffe07b0f48cf0300f4632945cae5150edc5.jpg)  
Figure 3-5 Numerical example of a graphical representation of a continuous review, continuous inventory, (Q,ROP) inventory system

Figure 3-6 is a replenishment process identical to the one we described in Figure 3- 5 except that the lead time is 10 days instead of 4 days. Now in this situation the lead time is equal to the time between replenishments, and the ratio of lead time to time between replenishments is one. In this situation, notice that the inventory position is always 100 units (Q) above the on hand. Let’s see why. Look at t = 0 days when an order is received. At the same time the order is received, an order has to be placed because it takes just as long to receive an order as it does to go through the amount of inventory received in a replenishment.

![](images/7cdbef1c8c07dc0dd5ac019700511a66ae9d4403809c645038e6fbec9a2bfd0a.jpg)  
Figure 3-6 Numerical example of graphical representation of a continuous review, continuous inventory, (Q,ROP) inventory system where lead time is 10

Figure 3-7 is once again the same as Figure 3-5 and Figure 3-6 except that the lead time is 14 days, resulting in a lead time to time between replenishments ratio of 1.4. Since the lead time is greater than the time between replenishments, the inventory position is always greater than the on hand. Notice that at t = 0 days, an order is placed when another order is already outstanding. At t = 4 days, the previous order is received, and at t = 14 days the order that was placed at t = 0 is received. In this case the lead time and the demand are known and constant, but when they are uncertain and variable, having a lead time to time between replenishments ratio that is greater than 1 is difficult to manage. The reason for this is that you are placing orders while there are outstanding orders you have not received.

![](images/a1bc99c27b9d4641f33606d8a46119e71b3e77fda56cad7af2b38cb834852969.jpg)  
Figure 3-7 Numerical example of graphical representation of a continuous review, continuous inventory, (Q,ROP) inventory system where lead time is 14

# DEMAND DURING LEAD TIME

Demand during lead time can grow if the rate of demand grows or if the lead time grows or both. Similarly, demand during lead time can be uncertain because demand is uncertain or because lead time is uncertain or both. In practice, demand and lead time are uncertain. Let’s consider that situation now.

We are still assuming a (Q,ROP) inventory system but we are now assuming that demand during lead time is uncertain. Figure 3-8 is a probability distribution of demand during lead time.

![](images/5745b1cd1870f17b002dcf2a9e756fe87c185daca9fa5d521e144c0eee3c9f63.jpg)  
Figure 3-8 Probability distribution of demand during lead time

In Figure 3-8 the horizontal axis is demand during lead time and the vertical axis (not shown) is the probability density. The area under the curve is the probability. The total area under the curve is 1. Recall that probabilities range from 0 to 1. The expected, or forecast, demand during the lead time is designated on the probability distribution. Now, if you set the reorder point at the expected demand during the lead time, then based on how this probability distribution is drawn, you would stockout during the lead time quite often. So, you might set the ROP higher, as designated on Figure 3-8. The protection period in-stock (PPIS) metric is the area under the curve up to ROP. They way this is drawn it looks like that is around 90 percent of the area, so the PPIS = 0.90. Recall that you cannot run out of stock in a (Q,ROP) continuous review inventory system at any time except the lead time. So, for this process, PPIS is the probability of staying in stock during the lead time, which in this case is the protection period. Notice that the reorder point is made up of the expected demand during the lead time plus the safety stock. Recall that safety stock is the expected number of units on hand when the replenishment arrives and is available for use. Safety stock is used to guard against stockouts. If you increase safety stock, you increase PPIS.

If we used a normal distribution to represent the expected demand during the lead time, we would need to estimate the mean and the standard deviation of demand during the lead time. We could do this a number of ways. We could look back over time and take the mean and standard deviation of demand during the lead time. If we were to do that, we could use the Excel function

=NORMINV(PPIS,MEAN,STANDARD DEVIATION) to get the ROP that has a target PPIS, given the mean and standard deviation of demand during the lead

time. We could also use forecasting models. For example, we could forecast demand per day and then calculate the standard deviation of forecast error. We would then need to calculate the mean and standard deviation of lead time. Then to calculate the expected demand during the lead time we would multiply the forecast of demand per day by the average lead time. This would give us the expected demand during the lead time. Next to calculate the standard deviation of demand during the lead time we could use the following formula:7

$$
\sigma_ {D D L T} = \sqrt {\bar {L} \cdot \sigma_ {F E} ^ {2} + \bar {d} ^ {2} \cdot \sigma_ {L} ^ {2}}
$$

Where

σ DDLT = standard deviation of demand during lead time

= average lead time

2 = standard deviation of forecast error

= demand forecast per period

σL = standard deviation of lead time

Notice that we are using the demand forecast per period as well as the standard deviation of forecast error. One benefit to using the standard deviation of forecast error is that if you can forecast it, you do not really need safety stock. If you are using safety stock to guard against uncertainty and you can forecast demand accurately, even when it has a lot of variability, you don’t need as much safety stock as might be implied by the standard deviation of demand.

Table 3-4 gives forecast errors for forecasts of demand for 60 days and the lead times associated with 60 orders.

<table><tr><td>Forecast Error</td><td>Lead Time</td></tr><tr><td>11.49</td><td>1</td></tr><tr><td>8.15</td><td>1</td></tr><tr><td>(10.46)</td><td>1</td></tr><tr><td>(11.97)</td><td>1</td></tr><tr><td>9.83</td><td>1</td></tr><tr><td>8.46</td><td>1</td></tr><tr><td>12.17</td><td>1</td></tr><tr><td>(6.54)</td><td>1</td></tr><tr><td>(11.27)</td><td>1</td></tr><tr><td>6.95</td><td>1</td></tr><tr><td>7.18</td><td>1</td></tr><tr><td>(8.38)</td><td>1</td></tr><tr><td>(6.39)</td><td>1</td></tr><tr><td>(7.80)</td><td>1</td></tr><tr><td>(7.54)</td><td>1</td></tr></table>

Table 3-4 Forecast Errors for Forecasts of Demand   

<table><tr><td>(6.50)</td><td>2</td></tr><tr><td>7.10</td><td>1</td></tr><tr><td>(6.03)</td><td>1</td></tr><tr><td>7.67</td><td>1</td></tr><tr><td>(6.57)</td><td>1</td></tr><tr><td>6.33</td><td>1</td></tr><tr><td>(6.50)</td><td>1</td></tr><tr><td>7.65</td><td>1</td></tr><tr><td>6.09</td><td>1</td></tr><tr><td>10.73</td><td>1</td></tr><tr><td>6.61</td><td>1</td></tr><tr><td>(6.49)</td><td>1</td></tr><tr><td>6.18</td><td>1</td></tr><tr><td>(7.48)</td><td>1</td></tr><tr><td>(8.60)</td><td>1</td></tr><tr><td>(7.60)</td><td>1</td></tr><tr><td>7.76</td><td>1</td></tr><tr><td>(6.80)</td><td>2</td></tr><tr><td>(7.09)</td><td>1</td></tr><tr><td>(7.51)</td><td>1</td></tr><tr><td>(7.93)</td><td>1</td></tr><tr><td>9.90</td><td>1</td></tr><tr><td>6.26</td><td>1</td></tr><tr><td>(7.39)</td><td>1</td></tr><tr><td>6.73</td><td>1</td></tr><tr><td>(6.15)</td><td>1</td></tr></table>

If you calculate the standard deviation of forecast error you will find that it is 8 units per day; if you calculate the average and standard deviation of lead time, you will find that it is 1 day and 0.18 days, respectively. Suppose the forecast is

currently 49 units per day, then the standard deviation of demand during the lead time is

$$
\begin{array}{l} \sigma_ {D D L T} = \sqrt {\bar {L} \cdot \sigma_ {F E} ^ {2} + \bar {d} ^ {2} \cdot \sigma_ {L} ^ {2}} \\ \sigma_ {D D L T} = \sqrt {1 \bullet (8 ^ {2}) + (4 9 ^ {2}) \bullet (0 . 1 8 ^ {2})} \\ \end{array}
$$

This gives 12 units per day. Now, the forecasted demand during lead time is the forecast of 49 units per day, times the expected lead time of one day, so the forecasted demand during the lead time is 49. We could then use the Excel function =NORMINV(PPIS,MEAN,STANDARD DEVIATION) to get the ROP. So, if we want a PPIS = 0.95, then =NORMINV(0.95,49,12) returns 69 units. That is, if we have a (Q,ROP) process and we order when the inventory position is 69 units, then we will be in stock during the protection period 95 percent of the time.

You do not need to use the formula

$$
\sigma_ {D D L T} = \sqrt {\bar {L} \cdot \sigma_ {F E} ^ {2} + \bar {d} ^ {2} \cdot \sigma_ {L} ^ {2}}
$$

if you observe demand during lead time for each order, as we did inTable 3-1.

In that case, we can directly use the average and standard deviation we calculated from the Table 3-1. Recall that for Table 3-1, the average was 49 and the standard deviation was 12. So, if we want a PPIS = 0.95, then =NORMINV(0.95,49,12) returns 69 units. That is, if we have a (Q,ROP) process and we order when the inventory position is 69 units, we will be in stock during the protection period 95 percent of the time.

Figure 3-9 shows a graph of on-hand inventory with a probability distribution of demand during lead time superimposed upon it.

![](images/51d1c65c27aa2b50497c75041b3cd69206f91eda99f2049553f15d26e4b87136.jpg)  
Figure 3-9 Graph of on-hand inventory with a probability distribution of demand during lead time superimposed upon it

As we move the reorder point up on the graph, more and more of the distribution of demand during lead time is encompassed. Looking at the probability distribution, the PPIS is the area under probability distribution curve from the ROP to the horizontal axis.

Figure 3-10 is another example that illustrates the expected demand during lead time as well as the safety stock.

![](images/964314d0d43a0dd63e2acec068d1d9ee5133f117e290a4d3413bcdbc564e3974.jpg)

Figure 3-10 Expected demand during lead time and safety stock

You can see from this graph that if the ROP were kept constant and the expected demand during the lead time increased, it would effectively reduce safety stock, assuming the amount of uncertainty remained the same or increased.

Figure 3-11 illustrates the (T,OUL) replenishment process. The horizontal axis is time and the vertical axis is units, in this case, bars of soap. The dashed line across is the order up to level (OUL); q1 is the first order, and q2 is the second order; the dotted line is the point in time where a review is made; the bold dotted line is when a replenishment is received and available for use; the bold double-headed arrows represent the lead time; and the regular double-headed arrows represent the time between reviews. Regarding the graph lines, the solid squiggly line represents onhand inventory; and the dash-dotted graphed line represents inventory position.

![](images/a6924df2cda881a8494d1adf224b40b05fe2add9ee7ef324e77f664ab4c59c2b.jpg)  
Figure 3-11 (T,OUL) replenishment process

Starting half way through the review interval you can see that there is no outstanding order and that on hand is decreasing. The squiggly is not straight because it shows that demand is varying over time. When we get to the first review point, q1 is ordered. You can see that inventory position is greater than on-hand inventory during the lead time. At the end of the lead time the inventory position and on hand come back together and on hand is increased by q1. This process

continues. You can see that in the second replenishment cycle the on-hand inventory is decreasing at a lower rate than in the first replenishment cycle. That is because demand is not as high. Consequently, less is ordered at the second review. As you can see, q2 < q1.

![](images/6da2075e2293dd4e8ad30da3a95a06a5789a337c95800efac3bc75f4237cc5f0.jpg)  
Figure 3-12 illustrates the point that, unlike the (Q,ROP) process, in the (T,OUL) process you can run out of stock at any time during T and L.8   
Figure 3-12 With the (T,OUL) process you can run out of stock at any time during T and L.

Looking at Figure 3-12 when q2 is ordered, we see that sales picked up dramatically, causing a stockout very quickly. Then at the end of L, we received the order of q2. At that point we wished we would have ordered much more, but it is too late. We again stockout quickly after receiving q2 because demand is still high. We remain out of stock through the next review, until the end of the next lead time. This demonstrates that the protection period for the (T,OUL) process is T+L. Hence, when we set safety stock we must do it with respect to the entire protection period.

Next, to estimate the standard deviation of demand during the lead time plus the review interval we could use the following formula:

$$
\sigma_ {D D L T} = \sqrt {\left(\bar {L} + \bar {T}\right) \cdot \sigma_ {F E} ^ {2} + \bar {d} ^ {2} \cdot \left(\sigma_ {L} ^ {2} + \sigma_ {T} ^ {2}\right)}
$$

Where

σDDLT = standard deviation of demand during lead time

= average review interval

$\overline { { L } } = a v e r a g e l e a d t i m e$ = average lead time

2 = standard deviation of forecast error

$\overline { { d } } = d e m a n d f o r e c a s t p e r p e r i o d$

σT = standard deviation of review interval

σL = standard deviation of lead time

We could then use the Microsoft Excel function =NORMINV(PPIS,MEAN of T+L,STANDARD DEVIATION over T+L) to get the OUL.

We have been assuming a normal distribution; however, one could also assume a gamma distribution. The advantage of the gamma distribution is that it starts at zero, whereas the normal distribution goes from negative infinity to positive infinity.

There are two parameters you need for the gamma distribution, alpha (α) and beta (β).

$$
\begin{array}{l} \alpha = \frac {\mu^ {2}}{\sigma^ {2}} \\ \beta = \frac {\sigma^ {2}}{\mu} \\ \end{array}
$$

If you are calculating ROP, the estimates of alpha and beta should be based on L. If you are calculating OUL, the estimates of alpha and beta should be based on T+L. You could then use the Excel function =GAMMAINV(PPIS,ALPHA,BETA) to get ROP or OUL. For slower moving SKUs, the gamma distribution is probably better than the normal distribution for technical reasons we do not explore here.

Returning to the earlier example of the (Q,ROP) process if we use the gamma distribution we have the following:

$$
= G A M M A I N V \left(0. 9 5, \frac {4 9 ^ {2}}{1 2 ^ {2}}, \frac {1 2 ^ {2}}{4 9}\right)
$$

This returns 70 units. Recall the normal returned 69 units. However now let’s consider a mean of 1 and a standard deviation of 5. In this case the normal distribution gives an ROP of 5, and the gamma gives an ROP of 9. Worse, this normal distribution would have more than 40 percent of the observations below zero, whereas the gamma has no observations below zero.

You might also want to use a discrete probability distribution such as the Poisson. The problem is that in Excel, there is not an inverse function so you have to create a table. Suppose you have a Poisson distribution with a mean demand during lead time of 0.5 units. Then to calculate your PPIS in Excel for a given level of demand during lead time DDLT you would use =POISSON(DDLT,mean,1). So in this example, if you wanted to know the PPIS for a DDLT of 2, then =POISSON(DDLT,0.5,1) would return 0.986. You could create a table like Table 3- 5.

Table 3-5 Cumulative Poisson Distribution   

<table><tr><td>Demand</td><td>Cumulative Poisson</td></tr><tr><td>0</td><td>0.60653066</td></tr><tr><td>1</td><td>0.90979599</td></tr><tr><td>2</td><td>0.98561232</td></tr><tr><td>3</td><td>0.99824838</td></tr><tr><td>4</td><td>0.99982788</td></tr><tr><td>5</td><td>0.99998584</td></tr></table>

From the table you could find the PPIS from the Cumulative Poisson column and then find the corresponding demand during lead time in the Demand column to find the ROP.

You probably noticed that =POISSON(DDLT,mean,1) does not require standard deviation. The reason for this is that the Poisson distribution has a variance that is equal to the mean. Also, in =POISSON(DDLT,mean,1), the last argument, “1”, tells Excel that we are looking for the cumulative Poisson distribution. If we put a zero

in instead, it would return the probability of that observation, not the cumulative probability. This is shown in Table 3-6.

Table 3-6 Probability Mass   

<table><tr><td>Demand</td><td>Cumulative Poisson</td><td>Probability</td></tr><tr><td>0</td><td>0.60653066</td><td>0.60653066</td></tr><tr><td>1</td><td>0.90979599</td><td>0.30326533</td></tr><tr><td>2</td><td>0.98561232</td><td>0.07581633</td></tr><tr><td>3</td><td>0.99824838</td><td>0.01263606</td></tr><tr><td>4</td><td>0.99982788</td><td>0.00157951</td></tr><tr><td>5</td><td>0.99998584</td><td>0.00015795</td></tr></table>

So, if we set ROP to 2, we will have a PPIS of 0.986. The probability of selling 2 during the lead time is found in the last column, 0.076.

In reality, many hybrid replenishment processes exist. Let’s first consider a hybrid to the (T,OUL) replenishment process. Suppose we took an existing (T,OUL) process and added a reorder point to it. So, the idea would be that when we got to a review point, we would only order the difference between the inventory position and the OUL if the inventory position were below the ROP. Would the new (T,OUL,ROP) process have more, less, or the same average inventory level? Without the ROP, we would order at every review time, but with the ROP we might not order at some of the review times. Consequently, we would expect less inventory on average if a ROP were added to an existing (T,OUL) process. There are many other hybrid processes as well. Many of them are difficult to model, so it is good to understand these two example replenishment processes (T,OUL) and (Q,ROP) and to think about how variations affect inventory levels and protection periods in particular. When a new process is created, it is always good to think carefully about how new steps affect risk of failure and the protection period in general.

As we have already mentioned, being able to represent your ideas in an inventory graph can facilitate careful and rigorous thinking about how the process will perform and where it will have potential failures. When you draw these graphs you can use them to brainstorm various scenarios that might occur. This can help you think through how various steps affect the protection period. It can be more helpful if you have a colleague who is also competent in inventory management and who can also use inventory graphs to discuss new inventory systems or changes to existing systems. In addition to drawing inventory graphs, it is also useful to have someone who can build a discrete event simulation model of the process.

Discrete event simulation can be done in Excel or a discrete event simulation software package. It allows you to model business processes such as replenishment processes and allows for uncertainty to be brought into things like demand and lead time. After a lot of discussion with the inventory graphs, carefully designed flow charts can be created. These are used to then create the discrete event simulation. In the process of developing the discrete event simulation of the inventory process, questions will arise about details of how the process works. The actual development of the discrete event simulation requires a great deal of specificity. Usually the first few times these models are run, problems occur because something has not been specified. This leads to additional refinement of thinking about the process that is being created or modified. In the previous discussion about (T,OUL) and (Q,ROP) processes, we gave specific formulas for estimating OUL or ROP. Even for these processes, for many distributions, we cannot write a specific formula for OUL or ROP. In those cases, discrete event simulation is needed. It gets even more complicated for many hybrid processes, and then discrete event simulation is about the only alternative. There are many different levels of skill in discrete event simulation. However, it is useful for someone involved in inventory management to at least be able to make rough cut discrete event simulation models in Excel.

# EXPECTED UNITS OUT PER REPLENISHMENT CYCLE

We now return to the (Q,ROP) process and consider the optimal order quantity, but first we must consider the total cost of a given order quantity. For a given order quantity, the expected cost of carrying cycle stock is (Q/2)hc.9 In addition, the expected cost of carrying safety stock is (ROP – EDDLT)hc. The number of orders placed per year is (D/Q), so if the cost of each order is S, then the annual ordering cost is (D/Q)S. During each lead time there is a chance of stocking out and losing sales. The expected number of units out of stock per replenishment cycle is

$$
\mathrm {U} (\mathrm {R O P}) = \int_ {x = R O P} ^ {\infty} (x - R O P) f (x) d x
$$

This is called the loss integral.10 We show you how to calculate this with a normal distribution in Excel.

$$
\begin{array}{l} \mathrm {U} (\mathrm {R O P}) = \int_ {x = R O P} ^ {\infty} (x - R O P) f (x) d x \\ = \sigma_ {D D L T} N O R M D I S T (Z, 0, 1, 0) - (R O P - E D D L T) (1 - N O R M D I S T (Z, 0, 1, 1)) \\ \end{array}
$$

In this formula, Z is the number of standard deviations above the mean demand during lead time that is represented by the ROP. If you use

$= \mathrm { N O R M D I S T } ( \mathrm { R O P } , \mathrm { E D D L T } , \sigma _ { { D D L T } } , 1 )$ to find the PPIS, you can then use   
=NORMSINV(PPIS) to find Z. Then you can apply the loss integral formula.

Using the example from Table 3-1, suppose we set ROP to 52 units.

$$
= \text {N O R M D I S T} (\text {R O P}, \text {E D D L T}, \sigma_ {D D L T}, 1)
$$

$$
= \text {N O R M S I N V (P P I S)}
$$

$\mathbf { \Sigma = N O R M D I S T { \left( 5 2 , 4 9 , 1 2 , 1 \right) } }$ returns a value of 0.5987. Then using   
$\mathbf { \Sigma = N O R M S I N V } ( 0 . 5 9 8 7 )$ we get 0.25, which is the value of Z.

Now, to get the expected number of units out of stock per replenishment cycle, we have

$$
\begin{array}{l} \mathrm {U} (\mathrm {R O P}) = \int_ {x = R O P} ^ {\infty} (x - R O P) f (x) d x \\ = \sigma_ {D D L T} N O R M D I S T (Z, 0, 1, 0) - (R O P - E D D L T) (1 - N O R M D I S T (Z, 0, 1, 1)) \\ = 1 2 * N O R M D I S T (0. 2 5, 0, 1, 0) - (5 2 - 4 9) (1 - N O R M D I S T (0. 2 5, 0, 1, 1)) \\ \end{array}
$$

This returns a value of 3.4 units per replenishment cycle. Now, suppose the expected cost of a unit out of stock is $10 per unit out of stock. Then every time we place an order our expected cost of lost sales is about $34. This is an additional ordering-related cost. Suppose you only use truckload11 for transportation and that each truckload costs $150. Other ordering related costs are $20, including accounts payable variable costs, receiving, and so on. Then the total cost associated with placing an order is $\$ 150+\$ 34+\$ 320=\$ 204$ per order.

# TOTAL ANNUAL COST AS A FUNCTION OF ORDERQUANTITY

Since there are (D/Q) replenishments per year,12 the expected number of units out of stock per year is (D/Q)U(ROP). Suppose the cost per unit is m, then the expected cost of out of units out of stock per year is m(D/Q)U(ROP). The in-transit holding cost is $( \mathrm { L } / 3 6 5 ) ^ { * } \mathrm { D ^ { * } h c }$ . If lead time is in days, then 365 days is used for the denominator; if lead time is in weeks, then 52 weeks is used for the denominator, and so on. So the expected cost is

$$
C (Q) = D c + \left(\frac {D}{Q}\right) \left(S + m U (R O P)\right) + \left(\left(\frac {Q}{2}\right) + (R O P - E D D L T) + \left(\frac {L D}{3 6 5}\right)\right) h c
$$

We now discuss where transportation costs fit into this analysis. Truckload (TL) costs are based on point-to-point service. That is, the amount charged for the transportation is based on the rate a carrier changes from point A to point B. If TL is used, the same cost is incurred regardless of how much is shipped as long as it is less than the TL capacity. In this case, the cost of a TL is added to the ordering cost because each time an order is placed, the transportation cost of a TL must be paid. On the other hand, if less than truckload (LTL) is used, then the cost is based on the weight. LTL rates13 are first based upon product class from National Motor Freight Classification (NMFC) published by the National Motor Freight Traffic Association (NMFTA). Then the carrier’s tariff is used based on the origin and destination. Next the rates are discounted by the carrier. Finally the cost is based on the weight shipped. Consequently, transportation is based on weight shipped, which can be translated into a cost per unit. As a result, the transportation cost is added to the value of the item, c. So, if TL is used, transportation costs are a part of the ordering cost, whereas if LTL is used, transportation costs are a part of the unit cost. In general, if the transportation cost is based on the order not on the quantity, the transportation cost goes in the ordering cost, whereas if it is based on the amount shipped, it goes in the unit cost.

Taking the derivative of the total cost function above with respect to Q, and setting it equal to zero, we have

$$
\frac {\partial C}{\partial Q} = \frac {h c}{2} - \left(\frac {D}{Q ^ {2}}\right) (S + m U (R O P)) = 0
$$

Solving for Q, we have the EOQ.14

$$
Q = \sqrt {\frac {2 D (S + m U (R O P))}{h c}}
$$

Taking the second derivative we find

$$
\frac {\partial^ {2} C}{\partial Q ^ {2}} = 2 \left(\frac {D}{Q ^ {3}}\right) (S + m U (R O P)) > 0
$$

Meaning that the function is convex, so we have found a global, unique minimum.

All of this can be done with discrete empirical distributions as well.

The optimal solution may result in using TL but not filling the truck all the way. That is, it might be less expensive to use TL than LTL, and, at the same time, it is not optimal to utilize the transportation to 100 percent. Usually, however, more than one item is shipped on the truck.

When evaluating ordering decisions and transportation decisions, there is a tradeoff between inventory holding costs and transportation costs that must be taken into account.

Let

$$
I = \left(\frac {Q}{2}\right) + \left(R O P - E D D L T\right) + \left(\frac {L D}{3 6 5}\right)
$$

and

$$
B = S + m U (R O P) \text {t h e n}
$$

$$
C (Q) = D c + \left(\frac {D}{Q}\right) B + I h c
$$

So B is the fixed cost of ordering, and I is the amount of inventory.

Figure 3-13 illustrates the cost trade-offs associated with various levels of Q in a (Q,ROP) continuous review replenishment process.

![](images/6a7b06a7164caa4a4256d21541806070bbbc80a2c4f2756d0e432f57095d1cfc.jpg)  
Figure 3-13 Cost tradeoffs

Generally, the cost curve C(Q) is relatively flat at the bottom. Hence, being off target doesn’t have a large impact on total cost. Being off the optimal order quantity in terms of ordering too much has a slow rate of growth in cost, whereas, ordering too little can increase total cost dramatically at some point. As Q increases, the component of Ihc that is increasing is only the cycle stock, not the safety stock or the in-transit stock. Furthermore, Ihc increases linearly. However,

as Q decreases, $\left( { \frac { D } { Q } } \right)$

The following example is important because it illustrates much of what has been talked about in this chapter, but it also shows an important caveat when using the EOQ or other optimization models. It also brings transportation costs into the discussion. So, the following example is not just an illustration of how to use what we have learned, it actually contains new material that is easiest to explain in the context of an example.

A regional retailer, Value Dime and Five has one distribution center that serves 500 stores. It only sells one SKU of toilet paper, its private label (Hunter TP) 2 ply extra coarse toilet paper with 543 sheets per roll (white with bold rough embossing). It replenishes stores in case pack quantities, and each case contains 80 rolls. Value Dime and Five only buys it by the truckload, which holds 560 cases, and pays $40 per case. Demand during lead time is approximately normally distributed with a mean of 80 cases and a standard deviation $\big ( \sigma _ { D D L T } \big )$ of 30 cases. Since the lead time is usually a day and average daily demand faced by the distribution center is 80, Value Dime and Five orders when inventory position is 100. This might seem

strange, but the company has a good reason for it. Stores typically have plenty of inventory, so even if Value Dime and Five is late on filling an order from a store, the stores usually don’t run out of stock. Any orders that can’t be filled when received from a store are filled later, as soon as the inventory is available in the distribution center. The transportation cost per truckload is $400. The owner of Value Dime and Five recognizes that transportation costs are high, so from an efficiency perspective he wants to maximize truck utilization and he only buys full truckloads. Based on his weighted average cost of capital and damage analysis, he estimates his inventory carrying cost factor to be about 0.25 of the value of inventory per year. He estimates all other costs of ordering associated with purchasing, accounts payable, receiving, and so on to be about $50 per order. For each case that is back-ordered by a store because the distribution center doesn’t have it in stock, the cost is about $5 per case and is the result of administrative workarounds. The terms of sale are FOB Origin, Freight Prepaid because Value Dime and Five has a much larger transportation spend, allowing it to get better deals on transportation rates. Since it is FOB Origin, Value Dime and Five owns the inventory in transit. Value Dime and Five estimates its in-transit inventory carrying cost factor to be about 0.23 of the value of inventory per year. Value Dime and Five has a new analyst who is pushing the idea that the company should not focus on maximizing transportation utilization, but rather should focus on minimizing total cost. The analyst is proposing the company use the economic order quantity model in determining how much to order at a time rather than just ordering a truckload. Value Dime and Five is open every day of the year.

Average daily demand for the distribution center is 80 cases per day, so annual demand is 80 × 365 = 29,200. Since Q = 560 cases and D = 29,200 cases per year, the expected number of orders per year is $\mathrm { D } / \mathrm { Q } = 5 2$ . We begin by looking at costs associated with ordering. Given the expected number of orders per year, the annual ordering cost will be 52 × $50 = $2,600 per year, and the annual transportation cost will be 52 × $400 per truckload = $20,800 per year. The next component we need to consider that occurs each time an order is placed is the back-ordering cost. To calculate the expected number of cases back-ordered per replenishment cycle, we first need to make sure we can use the normal distribution. Many tests exist to check this, but we are simply looking to make sure that no more than 1 percent of the probability density is below zero. To do this we use the following in Excel.

$$
\begin{array}{l} = \text {N O R M D I S T} (0, \text {E D D L T}, \sigma_ {D D L T}, 1) \\ = \text {N O R M D I S T} (0, 8 0, 3 0, 1) \\ = 0. 0 0 4 \\ \end{array}
$$

This shows that less than 1 percent of the probability density is below zero; in fact, less than a half of 1 percent is below zero in this case.

We now calculate the expected number of cases back-ordered per replenishment cycle. First we must calculate the PPIS metric.

$$
= \text {N O R M D I S T} (\text {R O P}, \text {E D D L T}, \sigma_ {D D L T}, 1)
$$

=NORMDIST(100,80,30,1) returns a value of 0.75. This means they should run out of stock during the lead time about 25 percent of the time. Of course the lead time is only one day and stores tend to have plenty of inventory, based on the example. Then, using PPIS we can find Z, which we need in the calculation of the loss integral.

$$
= \text {N O R M S I N V} (\text {P P I S}) = \text {N O R M S I N V} (0. 7 5) \text {w e g e t} 2 / 3 (0. 6 6), \text {w h i c h i s t h e v a l u e o f Z}.
$$

Now, to get the expected number of units out of stock per replenishment cycle, we have

$$
\begin{array}{l} \mathrm {U} (\mathrm {R O P}) = \int_ {x = R O P} ^ {\infty} (x - R O P) f (x) d x \\ = \sigma_ {D D L T} N O R M D I S T (Z, 0, 1, 0) - (R O P - E D D L T) (1 - N O R M D I S T (Z, 0, 1, 1)) \\ = 3 0 * N O R M D I S T (0. 6 6, 0, 1, 0) - (1 0 0 - 8 0) (1 - N O R M D I S T (0. 6 6, 0, 1, 1)) \\ \end{array}
$$

This returns 4.5 cases per replenishment cycle. For each case back-ordered, there is a $5 cost, so the cost of back-ordering per replenishment cycle is $4 { \cdot } 5 \times \$ 5=923$ per cycle. Since there are 52 orders per year, the annual cost is $5 2 \times \$ 23=3,459$ .

So the total ordering related costs, ordering costs plus transportation costs, plus back-ordering costs are $\$ 2,600+\$ 300+456,7$ per year. Clearly, the preponderance of the ordering related costs are transportation costs in this example, but there are many situations where, especially when there are lost sales instead of back-orders, lost sales costs might be the highest of the costs. It would depend on the product characteristics and the replenishment process and parameters, but at least in this example, transportation costs are clearly dominating.

Now we look at the inventory related costs, starting with cycle stock.

Since each truckload is 560 cases, $\mathrm { Q } = 5 6 0$ cases and the expected cycle stock is $\mathrm { Q } / 2 = 2 8 0$ cases. The cost of each case is $40, so the expected investment in cycle stock is 280 cases $\times \$ 40$ per case = $11,200, and the expected annual cost of holding cycle stock is $\$ 11,200\times0.25=\ S 2,800$ .

Safety stock is (ROP – EDDLT) = 100 cases – 80 cases = 20 cases. So, the investment in safety stock is 20 cases × $40 per case = $800, and the expected safety stock holding cost is 0.25 × $800 = $200.

The in-transit stock is (1 day/365 days) × 29,200 cases per year = 80 units. So the investment in in-transit stock is 80 units × $40/case = $320 per year, and the expected in-transit stock is $320 per year × 0.23 = $736 per year. So the total holding costs are $\$ 2,800+\$ 200+\$ 3,736$ .

The total relevant inventory related cost is = ordering related costs + inventory holding costs = $24,579 per year + $3,736 per year = $28,315 per year.

Looking back at Figure 3-13, we see that since the cycle stock cost is $2,800 and the ordering-related cost is $24,579, we are clearly not ordering enough at a time. As you can see, you are ordering below the economic order quantity if ordering costs are greater than cycle stock inventory holding costs. But here is an important caution. If we went to ordering two truckloads at a time, our ordering costs would increase by the amount of a TL. As it is drawn in Figure 3-14, this wouldn’t be enough to make a difference. In fact, it turns out that a fully utilized TL is the optimal quantity in this example. Now, if the other ordering related costs dominated the transportation costs, this might not be the case.

![](images/59acb7f54334b22084e63488469fb5398022eee41ad8b891456416e7553b19c1.jpg)  
Figure 3-14 Truckloads and total cost

If we use the EOQ model and are not careful, it would recommend an order quantity that wasn’t feasible with the cost inputs. Let’s calculate the EOQ:

$$
\begin{array}{l} E O Q = \sqrt {\frac {2 D B}{h c}} \\ E O Q = \sqrt {2 * 2 9 , 2 0 0 * \frac {4 0 0 + 2 3 + 5 0}{. 2 5 * 4 0}} \\ E O Q = 1, 6 6 1 \text {c a s e s} \\ \end{array}
$$

So the EOQ is recommending ordering 1,661 cases per order. But that is 1,661 cases per order / 560 cases per TL = 3 truckloads. However, the total cost at three truckloads is higher than it is at one truckload. Figure 3-14 shows because transportation costs dominate so much, one full truckload really is the best solution. In Figure 3-14 notice that until the order quantity equals one truckload, the annual ordering cost curve is decreasing as would be expected, but then it jumps up by $400, the cost of a truckload. The EOQ is recommending three truckloads, but that is not feasible at $400, rather, three truckloads is $1,200.

Continuing with this example, we are saying that one truckload is optimal. However, this is true if we don’t allow for the possibility of the use of other modes. If rail is a possibility, then several truckloads fit in a railcar. For that to be an option, the origin and destination need to be near a rail siding. Using rail would certainly increase lead time, but in this case, it doesn’t seem to be as big of a problem. Currently they are not holding very much safety stock at the distribution center, so they could easily double or triple their safety stock without making much of a difference on total cost. In fact, they could and probably should consider using intermodal transportation, which would increase the lead time but decrease the transportation cost, although it wouldn’t increase the transportation unit capacity. The obvious goal here is to reduce transportation costs.

Now, let’s keep everything else the same in this example, except increase the cost per unit to $1,000. Clearly we are not talking about toilet paper now, but this would change the EOQ to 332 cases, which is less than a full truckload (60 percent utilization = 332 cases per order / 560 cases per truckload). In this case it is optimal to underutilize the transportation capacity.

# Fill Rate

Let’s go back to Figure 3-13. Now, if you decrease Q, you are replenishing more frequently and being exposed to more stockouts during the lead time, so the

expected number of units out of stock increases. That is, lost sales increase. Consequently, a firm might want to increase safety stock to hit the same fill rate. Keep in mind, if Value Dime and Five decreases Q, cycle stock will decrease. So, if Value Dime and Five has to increase safety stock, the question is will it have to increase it more than the decrease in cycle stock? Also, when safety stock is increased, ROP is increased, so U(ROP) decreases. So, let’s keep track of what is going on here. Q is decreased, resulting in a lower fill rate (more lost sales) and lower cycle stock. To address the lower fill rate, safety stock is increased by increasing ROP, which in turn reduces U(ROP). The bottom line is that because the safety stock increase is reducing U(ROP), the increase in safety stock needed to offset the increase in the cost of lost sales is not as much as it otherwise would be.

![](images/4c77d11e06d890477bc85a04cc91572998795f667a5a7911f9c8240a3af80f98.jpg)  
Figure 3-15 shows Q* is reduced to Q’ (labeled as “1” on the horizontal axis), reducing the order quantity from its optimal level.   
Figure 3-15 Optimal order quantity is reduced

This increases the cost as labeled on the vertical axis “1”. Now, as a result of the reduction in fill rate, safety stock is increased (labeled “2”). Notice that the inventory cost line shifts up. This is because, for any level of cycle stock, we have more safety stock. But the (D/Q)B equation shifts down because B is reduced. This results in a new optimal order quantity. As drawn the total cost looks lower than it was for the original EOQ, Q*. However, it might be higher or it might be lower, depending on the interaction between safety stock and fill rate. The point is, the EOQ takes all of the other costs as given and then optimizes. There are two problems with this: (1) The other costs might not be at their optimal levels, and (2)

it ignores the fact that over time, competitors might increase service levels, increasing the optimal level of service for the focal firm.

# Trade-off Analysis

Neoclassical economic theory applied to inventory questions would propose that an equilibrium exists between various costs. That is, when one of the costs increases, firms respond by increasing other costs that are traded off against them. For example, if inventory costs increase, they would increase transportation spending to minimize the amount of inventory held; if transportation costs increase, they spend more on inventory to minimize those transportation costs. However, there is ample evidence to suggest that competition actually induces disequilibrium. That is, the process of competition itself is disequilibrating, because firms seek a comparative advantage in their inventory management to achieve a competitive advantage in market position. The competition they engage in teaches firms which inventory approaches work best, because competitors that choose effective or efficient inventory management methods achieve superior performance.

When they suffer from inferior financial performance, firms recognize their inferiority in terms of efficiency, value, or both, which then highlights their inferior resources. If they recognize that their disadvantage emanates from inventory management, firms likely (1) try to purchase or build the same inventory management transaction system their competitors use, (2) try to purchase or build the same inventory management decision support system their competitors use, (3) purchase or build more innovative inventory management transaction systems or decision support systems, (4) copy or create more innovative business processes, (5) copy or create superior management capabilities, (6) hire managers away from competitors, (7) create an organizational culture similar to that of their competitors, and/or (8) copy or innovate on their inventory positioning. In this process of working to match or beat the competition, firms constantly face the threat of inferior performance, so they all try to match or beat the competition. This results in what seems like a constant release of new versions of inventory management systems, ongoing recruitment of logistics executives from other leading firms, persistent publication of new inventory management ideas in trade and academic publications, and perpetual hiring of management consulting firms that focus on inventory management. On the other hand, in the short run, optimal inventory levels probably do exist, but one must be continually revising inventory policies in light of competition and consumer behavior.

Figure 3-16 shows the trade-off between inventory holding costs and ordering costs when LTL is used.

![](images/ae5e36265facf38c1b84490c3c23fa2237885213be329e96fd8086ca147fc5ea.jpg)  
Figure 3-16 Trade-off between inventory holding costs and ordering costs when LTL is used

On the horizontal axis, we see the intervals based on LTL weight breaks. For LTL, between an origin and destination, the transportation rate increases at a decreasing rate. Consequently, the unit cost of the item follows the same patterns and so does the inventory holding cost per unit of inventory. L5C stands for “less than 500 lbs.,” 5 C stands for “above 500 lbs.,” 1 M stands for “greater than 1,000 lbs.,” and so on. These are typical weight breaks in LTL. This causes the inventory holding cost curve to be concave to the origin. In Figures 3-15 and 3-16, which did not involve LTL, inventory costs were linear in Q. This effect that LTL has causes the optimal order quantity to be higher than the point where inventory holding costs are equal to ordering costs, as in Figures 3-15and 3-16.

In Figure 3-17, the vertical dashed line is where we switch from LTL to TL. Now our transportation cost is not a part of the unit product cost c because it doesn’t matter how much you put in the truck, you still pay for the truckload. So when this happens, the TL cost becomes an ordering cost because every time you order, you must pay for a TL. So, the Ihc shifts down to the bold Ihc, and the (D/Q)B shifts up to the bold (D/Q)B. If this is the optimal place to shift to TL, the total cost should not go up as fast after this quantity.

![](images/666599b2086f29f9ea84b4b235ae1d8dca6efc9c552a2d9bcbeaa62581075db1.jpg)  
Figure 3-17 From LTL to TL

In Figure 3-18 we see the result of reducing the ordering cost per order from B to $\mathrm { B ^ { \prime } } ;$ namely, it reduces the optimal order quantity.

![](images/085ed8e225f25614d91abf82acbce754ca38168d06201550a37769ec6e5cbe4a.jpg)  
Figure 3-18 Reduction in the optimal order quantity

Notice that the entire ordering cost curve shifts down. If firms are attempting to reduce setup costs, make purchasing more efficient, reduce invoice match rate errors,15 improve the efficiency of receiving, accounts payable, and other related processes, then we should expect B to be reduced. Better transportation processes for reduction in TL costs, such as intermodal, can also reduce B. Improved execution that results in lower expected number of units out of stock per replenishment cycle for a given level of ROP will reduce B. B can also be reduced if the cost of a stockout per unit of out of stock is decreased. This can occur if substitutes are available that did not used to be available, the margin on items decreases, competition among firms selling the product decreases, and other events affect the expected cost of lost sales per unit of out of stock.

![](images/f31deb7039277e96bcc3b93d1e7f7768a738cd58cfdcd75464fa483e8200924e.jpg)  
Figure 3-19 shows a company whose cost of holding inventory is being reduced. That is, the cost per unit is reduced or the inventory holding cost is going down.   
Figure 3-19 Cost of holding inventory reduced

The cost per unit could be reduced through more efficient acquisition, better negotiation, improved production processes, more competition in the market providing the product, and others. The inventory holding cost factor could be reduced as a result of more access to capital, thus lowering the cost of capital, more efficient use of storage space, less product damage while in storage, less pilferage and spoiling, and so on. In Figure 3-18 and Figure 3-19, we have process improvement leading to changes in the optimal order quantity. In Figure 3-18 we

see process improvement leading to a reduction in the optimal order quantity, whereas in Figure 3-19 we see process improvement leading to an increase in the optimal order quantity. Hence, we cannot provide an unequivocal result that firms that are improving their processes should also be reducing inventory. That is clearly not necessarily true based on our discussion so far. If the effects of process improvement on ordering costs are strong enough, they may overcome the effects of process improvement on inventory holding costs and result in the optimal order quantity being reduced. But that is not generally true.

# QUANTITY DISCOUNTS

Earlier when we solved the total cost function for the optimal order quantity, the economic order quantity, the term representing the annual purchase cost, Dc (which is annual demand D times cost per unit c), fell out when we took the first derivative with respect to the order quantity, Q, because c was not a function of Q. However, if there are quantity discounts, then c is a function of Q. Many times the unit cost is referred to as a variable ordering cost as opposed to the fixed ordering cost per order, S. Quantity discounts can be applied in several ways, but we discuss two of them: (1) all units quantity discount and (2) incremental units quantity discount. With an all units quantity discount, the price of all units decreases if the order quantity is greater than some designated amount, making the total cost function discontinuous. With the incremental units quantity discount, only the units above a certain quantity have the lower price applied to them, so the cost function has a kink in it, but it is not discontinuous.

For simplicity our analysis of the quantity discount considers the variable ordering cost, the fixed ordering cost, and the cycle stock holding cost. In addition, we only consider one price break for the quantity discount, but the analysis for multiple price breaks in the quantity discount is essentially just a straightforward extension of this analysis. Hence, our total cost function is the following:

$$
C (Q) = D c + \left(\frac {D}{Q}\right) S + \left(\frac {Q}{2}\right) h c
$$

There are three key cases we want to consider, as illustrated in Figure 3-20, Figure 3-21, and Figure 3-22.

![](images/5ce37eb6f887e5a3a1fbaca7b9fb7a26564088913be07d6ccddbd22c399ac573.jpg)  
Figure 3-20 Quantity discount below EOQ

![](images/4dcaa284d8abdc421a8ea1d63b196904be5f52c1ac7078f1f2beeb95c9f4ff98.jpg)  
Figure 3-21 Quantity discount above EOQ

![](images/1790c81b2dd4dd56f55ff89f47ef532f376e1496e8bee273e71727cabf479cc7.jpg)  
Figure 3-22 EOQ lower than quantity discount

The vertical line in Figure 3-20 is the point of discontinuity of the total cost function and is where the price break occurs. In Figure 3-20 it is clear that taking the quantity discount makes sense. You can see from the graph that even without the quantity discount, it would have been optimal to order a quantity above the price break. This price break is not effective in terms of incenting this firm to behave differently. The firm simply can order at a lower price.

In Figure 3-21 the price break is effective because the price break incents the firm to order more than it would otherwise. As you can see from the graph, the total cost at the price break is lower than the total cost at the EOQ level without the price break.

Finally, the price break in Figure 3-22 is not effective in the sense that it does not incent the firm to order more. It is less expensive for the firm to order the EOQ without the discount than to order an amount high enough to receive the price break.

# ENDNOTES

1. Over the years one of the authors has studied and taught from a number of textbooks on inventory theory. Some of his favorites, which he has learned the most from include the following: Hadley, George, and Thomson M. Whitin. Analysis of Inventory Systems. New York: Prentice Hall, 1963. Zipkin, P. Foundations of Inventory Management. Irwin, New York: McGraw-Hill, 2000. Silver, Edward

Allen, David F. Pyke, and Rein Peterson. Inventory Management and Production Planning and Scheduling. Vol. 3. New York: Wiley, 1998. Nahmias, Steven.Production and Operations Analysis. New York: McGraw-Hill, 2005. Porteus, Evan L. Foundations of Stochastic Inventory Theory. Palo Alto, CA: Stanford University Press, 2002. This book is different from each of those books because this book has a much more applied orientation; however, we are indebted to these great works.

2. We use the terms stockout and out-of-stock interchangeably.

3. The idea here is that the difference in demand during lead time between all of these observations is a result of randomness. That is, we are assuming there is no seasonal variation, trend, or other causal factors such as changes in prices or competitive responses. However, later in this chapter we discuss competitive effects on inventory management.

4. Up to this point, and at future points, we are talking about demand during lead time. However, we also consider situations where we estimate demand and lead time separately.

5. It is called continuous review, but it should probably be calledcontinuous review and continuous response.

6. Later in this chapter, we see that inventory position can be above on hand even before the order is placed. This happens when the lead time is longer than the time between orders.

7. This formula comes from taking the variance of a random sum of random

∑x variables. The random sum of random variables is given by where L is the random variable representing lead time, and Xi is the random variable representing

8. Recall in the (Q,ROP) process you could only stockout during L.

9. The inventory carrying cost is h, so hc is the cost of carrying one unit of inventory for one year. If the average inventory for the year is multiplied by c, then you have the average investment in inventory.

10. Hadley, George, and Thomson M. Whitin. Analysis of Inventory Systems. New York: Prentice Hall, 1963.

11. We will assume that you use truckload carriers even if the truck is not utilized to 100 percent of capacity.   
12. D is the expected annual demand.   
13. Defee, C. Clifford, Joe B. Hanna, and Robert Overstreet. “LTL Pricing: Looking Back to the Future.” Journal of Transportation Management 22.2 (2011): 45-58.   
14. Wilson, R. H. “A Scientific Routine for Stock Control.” Harvard Business Review 13.1 (1934): 116-129.   
15. Invoice match rate errors occur when at least two of the following do not match: invoice, receiving document, and purchase order. When these do not match, they must be reconciled, and this can be labor intensive. A certain percentage of orders have invoice match rate errors. If business processes can be improved to reduce the percentage of errors that occur, the cost of accounts payable per order is reduced.

# 4. The Link Between Inventory Management and Forecasting

As we discovered in Chapter 3, “Inventory Control,” there is a need to forecast demand over the protection period. For inventory management purposes, demand is often forecasted on a daily or weekly basis and combined with the lead time and/or the review interval to come up with the forecast of demand over the protection period. Inventory process performance is impacted in part by forecasting performance because the optimal timing or quantity of when inventory should be ordered and how much should be ordered depends upon the magnitude and uncertainty of demand, both of which are contingent upon the forecasting method and accuracy.

Forecasting is a vast field1 ranging from macroeconomic forecasting of GDP, interest rates, and inflation, to forecasting of long-term demographic trends, the weather, and the outcomes of political elections. However, in this chapter we focus primarily on short-term forecasting, because this is the crux of most inventory management performance challenges, especially for replenished items. For nonreplenished items, such as fashion apparel, forecasts must be made many months into the future for a selling season that might last a few weeks. In that case, the crux of inventory management is a longer term forecast. In this book we do not address long-term forecasting.

Although in this chapter we set out to discuss various forecasting methods used in managing inventory, we also set out to help you understand what is actually going on with forecasting. We want to remove some of the mystery behind forecasting. Forecasting seems scientific because of the mathematics, probability theory, statistics, and so on, involved in it. However, successful forecasting requires knowledge and understanding of the methods, which ones perform well under

various conditions, which ones do not, and why they do not perform well. Technology, databases, data, and software can improve forecasting and are necessary, but they are not sufficient for accurate forecasts. Technology in the hands of a skilled forecasting analyst who is knowledgeable of the domain for which the forecast is being used can make progress toward improved forecasts. Understanding the domain requires experience in the business, knowledge of the industry, and understanding of the variables in the company and the competitors that drive sales. One challenge in forecasting is finding these rare individuals who understand forecasting technology, forecasting methods, databases, and the data per se, and also have sufficient business domain knowledge. In reality, it takes a team of individuals, each of which has at least one of these skills, collaborating to develop the forecasting method and resolve forecasting problems.

# UNCERTAINTY IN DEMAND AND FORECASTING

We begin with a highly stylized example to illuminate an important point. Imagine that one and only one person, Julie, shops at a particular retail store for a certain type of candy, a peppermint blueberry fizz hard candy, called Pepfiz. Every day before Julie goes to this store, she rolls a six-sided die with numbers 1 through 6 on each of the six sides. The number that comes up on the die is the number of pieces of candy she buys when she goes to the store, but of course the store replenishment manager does not know what is going on. If the store replenishment manager knew how demand was being generated, he would know that the best forecast is 3.5—the expected value of the roll of a die. Let X be a random variable representing the

$$
\sum_ {i} ^ {6} x _ {i} p _ {i}
$$

demand,2 then the expected value is where $x _ { \mathrm { i } }$ is the ith outcome of the random variable and $p _ { \mathrm { i } }$ is the probability of that outcome.

$$
\mathrm {E} (\mathrm {X}) = \sum_ {i = 1} ^ {6} x _ {i} p _ {i} = 1 \mathrm {x} (1 / 6) + 2 \mathrm {x} (1 / 6) + 3 \mathrm {x} (1 / 6) + 4 \mathrm {x} (1 / 6) + 5 \mathrm {x} (1 / 6) + 6 \mathrm {x} (1 / 6) = 3. 5
$$

A forecast of 3.5 units is the best forecast. In the long run, no other forecast would be better. Unfortunately, the replenishment manager doesn’t know how demand is being generated.

Figure 4-1 shows the purchases over the past month.3

![](images/045ec3b05ebb875cfb5cf9b680756a3199794d8b290152cc015e474aef28f6bf.jpg)  
Figure 4-1 Average POS

The solid lines in Figure 4-1 are the actual purchases (POS), and the dashed lines represent the average. In this case, a simple average is the best forecast. A simple average is just the average of all POS, starting from the beginning, and ending with the most recent observation. Let xibe the ith observation of a total of n observations; then the simple average is

$$
\text {s i m p l e a v e r a g e} = \frac {\sum_ {i = 1} ^ {n} x _ {i}}{n}
$$

By about ten days, in this case, the simple average is close to the mean of the probability distribution. However, if you look at the first nine days, you might think there is a positive trend even though there is not. In fact, a number of forecasting methods would actually suggest a trend using the first nine days of this data.

Figure 4-2 also comes from the same distribution. But in this case, the first few days look like there is a negative trend. However, it doesn’t take long for the simple average to get close to the mean of the distribution.

![](images/838d4b16547ff9245761e48cf7db5ae05c707f490f1e0c61b51702a33b673a1d.jpg)  
Figure 4-2 Appearance of a negative trend at first

Now let’s assume the replenishment manager does know how the demand is being generated. For simplicity, let’s also assume that the lead time is overnight and certain. That is, at the end of each day, any pieces of candy sold during the day are replaced the next morning.4Table $\mathbf { 4 } { \cdot } { \mathbf { 1 } }$ shows the cumulative probability distribution of demand. The cumulative probability up to a demand during lead time of three units is $1 / 6 + 1 / 6 + 1 / 6 = 0 . 5 . \mathrm { S } 0$ , if the manager stocked up to three pieces of candy each day, the manager would be in stock half the time; that is, the PPIS = 0.5.

Table 4-1 Cumulative Probability of Demand During Lead Time   

<table><tr><td>DDLT</td><td>Cum Prob</td></tr><tr><td>1</td><td>0.17</td></tr><tr><td>2</td><td>0.33</td></tr><tr><td>3</td><td>0.50</td></tr><tr><td>4</td><td>0.67</td></tr><tr><td>5</td><td>0.83</td></tr><tr><td>6</td><td>1.00</td></tr></table>

Using Table 4-1, the replenishment manager could determine his PPIS by selecting his OUL. This is really a (T,OUL) replenishment process where T = 1 day and L = 0. That is, before the store opens, the manager review and replenish from the

backroom.5 Let’s suppose he chooses a PPIS = 0.83; then he sets the OUL = 5. What is the safety stock? Recall that safety stock is the expected number of units on hand when the replenishment arrives and is available for use. Expected demand is 3.5, so if we have 5 units at the beginning of the replenishment interval, the expected number of units on hand at the beginning of the next day, when the replenishment arrives and is available for use, is 5 – 3.5 = 1.5 units.

Although we have much more to say on this topic, the bottom line is that the connection between forecasting and inventory management is that we attempt to understand the distribution of demand to set replenishment policy parameters and thus achieve various metric targets, such as PPIS and ILFR.6

# TIME SERIES METHODS

As we have mentioned, under these circumstances, just using a simple average is the best way to forecast. The problem is we don’t know when we begin forecasting which method is best.

Now, imagine that after 30 days, Julie starts rolling two dice, adds the results, and purchases the corresponding number of pieces of candy.

![](images/5f19b9f08779ae051f5178f68ca2ebcb33fc8120b53454aef740debd818237ae.jpg)  
Figure 4-3 is a discrete event simulation of this demand process, where from day 1 to day 30 demand is the roll of one die and from day 31 to day 60 demand is the sum of the rolls of two dice. As mentioned earlier, the expected value for the first 30 days is 3.5; for the second 30 days, the expected value of demand is 7 units.   
Figure 4-3 Roll two dice and add

# Moving Average

The solid line is POS, and the dotted line is the simple average. Notice that by day 60, the simple average is at about 5 units, well below the expected value of 7 units. The dashed line is a ten-day moving average.7 The ten-week moving average is given by the following:

$$
\text {T e n - d a y m o v i n g a v e r a g e} = \frac {\sum_ {i = n - 9} ^ {n} x _ {i}}{1 0}
$$

Notice in Figure 4-4 that the ten-day moving average catches up more quickly than the simple average. However, let’s look at just the first 30 days.

![](images/727a3e3d82bd4545494e841609f275244cb850e6a57694f59f90a9faa7440bb2.jpg)  
Figure 4-4 Ten-day moving average, average, and POS

Figure 4-4 is day 11 to day 30. The solid line is POS, the dotted line is the simple average, and the dashed line is the ten-day moving average. Comparing Figures 4- 2 and 4-3 reveals the trade-off between the two forecasting methods—namely, although a ten-day moving average adapts more quickly to the change in the underlying demand, it overreacts to random changes, compared to the simple average. InFigure 4-4 we see the ten-day moving average is more erratic than the simple average. If the underlying demand process doesn’t change, the simple moving average does very well, but if there is a change in the underlying process, the simple moving average adapts more slowly than the moving average.

![](images/676cff9cade83aeb8e5df06147e3d022a7fbacde3981186828465bac03427e29.jpg)  
Figure 4-5 illustrates the point even further. Again, this is a discrete event simulation of days 11 through 30. The solid line is POS, the dotted line is the simple average, the dash-dotted line is the five-week moving average, and the dashed line the ten-day moving average. In Figure 4-4we saw that the ten-day moving average was more erratic than the simple average; in Figure 4-5 we see that the five-day moving average is more erratic than the ten-day moving average.   
Figure 4-5 Comparison with five-week moving average

# Naïve Forecast

If we go to a one-day moving average, it really isn’t a moving average, it is just taking what happened the previous day as the forecast. This is referred to as a naïve forecast (see Figure 4-6).

![](images/3f9a10ec757d8244ee1ad9b200748e0015ba29b19d1d7c6d75c1a0d79cac2377.jpg)  
Figure 4-6 Naïve forecast

In Figure 4-6, the solid line is the POS and the dotted line is the naïve forecast. As you can see, the naïve forecast simply trails the POS by a day. The performance of the naïve forecast is a good benchmark for comparing to other forecasts, because if a forecasting method cannot do better than the naïve forecast, it must not be very good.

# Simple Average

One problem with a simple average is that a serious outlier will have an effect on the forecast for a long time. In Figure 4-6, there are no outliers.

Figure 4-7 is an example of where there is a spike in demand on the first day. This could simply be a data error. This is also included in the five-day moving average but is out of the calculation for the five-day moving average by day 7. However, it remains in the calculation of the simple average forever. Eventually its effect is negligible, but throughout the range on Figure 4-7, it has an impact. You can see that the simple average is above the five-day moving average and the sales from day 7 through day 16. This illustrates a problem with the simple average—outliers have a lasting impact that can bias the forecast for many periods into the future.

![](images/128a1d10c791ee5fb4c34d14d133e1714faa43edf1cffe8fbad64c737ff4d2b7.jpg)  
Figure 4-7 Outlier

# Over Fitting Observations

Here are the methods we have considered so far: naïve, n-day moving average, and simple moving average. We look at others as well. Some forecasting methods are mathematically complex. The uninformed can be drawn to these methods because they are impressive. However, research has shown that in many situations, simple models perform better.8 This is due in part to the notion of over fitting the data. A time series of sales data has two components, one of which can be explained, and the other is random. The problem is that it is possible to fit random fluctuations and then project them into the future, which actually makes the forecast perform more poorly.

Figure 4-8 compares sales data generated by rolling a die with a simple average and a sixth degree polynomial, which is written out above at the top of the graph.9

![](images/a68a7ceb8729ecfe429fecd4f47144e0c4242bb636b63e1607d790040e2167ae.jpg)  
Figure 4-8 Overfitting

The x’s in the sixth degree polynomial are for the day. So, for example, if you were to put a 1 into all of the x’s and evaluate the equation, you would get a forecast of two pieces of candy. The sixth degree polynomial is much more impressive than the simple average, and it is a better fit of the sales data; however, we already know that the best forecast is 3.5 pieces of candy. The real question is: How will this forecast into the future? With the simple average, the most recent forecast is the forecast of each period into the future. In this example, the most recent forecast of the simple average model is 3.2 pieces of candy; therefore, the forecast of the 30th day out is 3.2 pieces as is the 60th day out.10 Now, if you want to forecast day 30 with the sixth degree polynomial, you put a 60 in the x variable, and you get a number that is around negative six million. In fact, this sixth degree polynomial quickly goes negative when it is outside the data that it was fit to. So, this seems like a paradox: The sixth degree polynomial fits the data much better than the simple average, but when the sixth degree polynomial is projected into the future, it quickly performs horribly. It performs horribly because it was fitting randomness. You can’t forecast randomness.

# Hold Out Data

This also helps to illuminate an important point: Forecasting models should be judged based on how well they forecast hold out data, not on how well they do on the data they were fit to. In this case, we see that the sixth degree polynomial does well on the data it was fit to, but it shouldn’t be judged based on that. Rather, the models should be judged based on how well they perform on future sales data, also

referred to ashold out data. This is an important concept to remember. The other important concept to remember is that we should compare the performance of forecasting models to the naïve model as well.

There is always a trade-off with hold out data. For example, if I have one year of data, I might want to use all of it to create a forecasting model, and this is fine; however, for purposes of comparing the model to other models, we need to have hold out data. Suppose I fit the data on 364 days and use one day of sales data as hold out data. This seems insufficient. On the other hand, suppose I use the first half of the year to fit the model and the second half of the year as hold out data. If there is no trend and seasonality, that might work well. If there is trend, this also might work well. If there is seasonality, we might need all of the data, and more. So, unfortunately, there is no unequivocal answer, but one good solution is to compare the models on varying degrees of hold out data. If one model consistently does the best with varying degrees of hold out data, then we can have more confidence that the model actually performs better.

From an inventory management perspective, if you can forecast accurately, you do not need much safety stock. So, in this case, over fitting with the sixth degree polynomial can make it look like very little safety stock is needed. Consequently, over fitting can result in lower PPIS than desired. The simple average, on the other hand, in this example, will have a more accurate assessment of the level of demand as well as the level of randomness. In fact, in this example, the level of demand is 3.5 pieces of candy per day. There is no trend or seasonality, only level demand. The variance from 3.5 pieces is randomness. This is another reason why you want to make sure you don’t over fit—over fitting produces both an erroneous level of demand as well as an erroneous assessment of the level of randomness. The amount of safety stock should be a function of the amount of randomness as well as the desired fill rate.

# Measuring Uncertainty

Later in this chapter, we discuss other methods of forecasting and how they relate to inventory management, but first we need to talk about assessing the level of randomness, which is a function of how well you can forecast demand from the historical sales data. We need to do this because there is a relationship between how much safety stock we need and how much randomness there is.

Before we do that, it is important to distinguish between variability and randomness. For example, suppose a certain type of cinnamon roll in a grocery store sells 90 percent of its volume on Saturday. So, suppose you sell 0 units on Sunday, 2 units per day from Monday through Friday, and 90 units on Saturday. Also, suppose this holds day in and day out throughout the entire year. Well, there is a lot of variability throughout the week, but there is perfect predictability, so

there is no need for safety stock.11 So, we need to know how much uncertainty there is in sales data. In other words, we need to know how predictable the sales are based on the sales data. To that end, we now discuss measures of uncertainty based on forecasts of sales.

There are many measures of forecast error, but we are going to look at bias, mean absolute deviation (MAD), mean absolute percent error (MAPE), and standard deviation of the forecast error $\left( \sigma _ { \scriptscriptstyle F E } \right)$ . Before talking about measuring forecast error (FE), we need to define forecast error for one forecast. The forecast error for period i is defined as $F E _ { i } = a _ { i } - f _ { i }$ where ai is the actual realized sales for period i and fi is the forecast for period i.

$$
\text {b i a s} = \frac {\sum_ {i = 1} ^ {n} F E _ {i}}{n}
$$

On average, if bias is positive, it means that we are under forecasting, whereas, if it is negative, we are over forecasting. If bias is positive, it is possible that there is a positive trend that is not being accounted for in the forecasting model, whereas if bias is negative, it is possible that there is negative trend. If it oscillates in regular intervals, there may be seasonality that is not being taken into account by the forecasting model. It is not a good measure of the overall accuracy because positive forecast errors are cancelled by negative forecast errors. MAD overcomes this because the absolute value is taken of each forecast error. MAD is the average magnitude of the error, regardless of the direction of the error.

$$
M A D = \frac {\sum_ {i = 1} ^ {n} \left| F E _ {i} \right|}{n}
$$

So, suppose bias = 2 and MAD = 4. That means that, on average, the forecasting technique is under forecasting by two units, but overall the forecast is off by four units. The problem with this is that we cannot compare different SKUs. For example, suppose one SKU has a MAD of 10 but sells on average 100 units per day and another SKU has a MAD of 10 but sells a 1,000,000 units per day. Clearly the latter forecast is more accurate than the former. So MAD is not good for comparing different SKUs. MAPE overcomes this problem.

$$
M A P E = \frac {\sum_ {i = 1} ^ {n} \left| \frac {F E _ {i}}{\left(a _ {i} + f _ {i}\right) / 2} \right|}{n}
$$

$$
\underline {{a _ {i} + f _ {i}}}
$$

Most textbooks use ai instead of but if there are days of zero demand, this causes MAPE to be undefined. The nice thing about MAPE is that you can compare different SKUs. In addition, MAPE is intuitive.

Finally, we consider the standard deviation of the forecast error $\left( \sigma _ { \mathit { F E } } \right)$ , which is useful for setting safety stock. Although this is possibly the least intuitive of the forecast error metrics, it is most useful for measuring the amount of uncertainty in a forecast such that the measure can be used in setting safety stock and estimating the expected units out of stock per replenishment cycle.

Figure 4-9 shows four discrete event simulations of demand based on the roll of a die for 60 days, using a simple average forecast and measuring error with MAPE and bias. Notice how quickly MAPE moves closely to about 10 percent in every discrete event simulation, whereas bias is much more unstable. In the upper-left corner, bias is negative for the entire 60-day horizon, whereas in the lower-left corner, bias is positive for the entire 60-day horizon.

![](images/72a3a8ed9651e1a1697d8d4f72d9e5e5e9b76b0fdca5b0ac4e1a1af1d7ef5a14.jpg)

![](images/935ab84b61d7e787fda28566ad927f00cc21223f18eb8e38c06c8738855b581e.jpg)

![](images/eee1cfa88c940b698a16a2b6b3329fd39d0321cd16d3286894d887e27ffd2b0c.jpg)

![](images/939dc9e9c626723b3abec8a5b6dccda69f8543fff0bf9565186ad78fd138cd1a.jpg)  
Figure 4-9 Bias, MAPE, and simple average

Figure 4-10 shows four discrete event simulations of demand based on the roll of a die for 60 days, using a five-day moving average forecast and measuring error with MAPE and bias. This is similar to Figure 4-9but with a different forecasting

technique. MAPE is a little higher for the five-day moving average, but it is less biased, and bias converges more quickly to a steady state level.

![](images/2576463fc851f5647be1533a5aa19af9e9d7a63203aae1ac6ae8f7aeed8b3f91.jpg)

![](images/47a27c038574a277ad4248b8169b9a73d7f5876342ca0d871274eefc59951d92.jpg)

![](images/f6fdf767e1ce19784a395e2453a33043e780ac1e59e09712a10f5b256c986838.jpg)

![](images/7639fead443e8a3a11fb682d223a28d7a32fa763a06145bb47e0a381e5067149.jpg)  
Figure 4-10 Bias, MAPE, and moving average

The point of this is that there can be trade-offs among these measures of forecast error. Since they all contain unique information, or characterizations of the information, it is important to understand each of them and to avoid using them in ways that might be misleading, such as comparing two SKUs with MAD when the SKUs have different levels of demand.

# Exponential Smoothing

We now explore another class of forecasting models that are integral with inventory management, namely, exponential smoothing12 models. We begin with the simplest in this genre, first order exponential smoothing.

First order exponential smoothing weights the last forecast against the forecast error of the last period. So, for example, if the last forecast was 15 and the error that period was 5, it would adjust 15 up by some fraction of the error 5. That is, first order exponential smoothing takes the forecast and adjusts it by a fraction of how much it was off from actual sales. This fraction is referred to as that smoothing constant, usually designated by the Greek lowercase letter alpha, α, which varies between zero and one, ${ \mathfrak { a } } \in ( 0 , 1 )$ . So, if α is small, the adjustment is small, but if α is

large, the adjustment is large. If ft is the forecast for period t, and at is the actual sales for period t, then the exponentially smoothed forecast for period t+1 is

$$
f _ {t + 1} = f _ {t} + \alpha (a _ {t} - f _ {t}) \quad \alpha \in (0, 1)
$$

If there is a lot of randomness in the data, alpha should be low. If the level of demand is changing, alpha should be higher, at least for a time. For example, suppose you have a product with fairly level demand but a competitive new item is being introduced. Then alpha should be higher for a time, until the competitive effects cause the demand for the item to be at a new level. Alpha should usually be between 0.1 and 0.3, but it actually depends on the data and situation. Let’s consider the extremes. Suppose alpha is zero; then you always use the first forecast.

$$
f _ {t + 1} = f _ {t} + \mathrm {O} \left(a _ {t} - f _ {t}\right)
$$

$$
f _ {t + 1} = f _ {t}
$$

$$
f _ {t + n} = f _ {t}
$$

On the other hand, suppose alpha is equal to one; then you have the naïve forecast.

$$
f _ {t + 1} = f _ {t} + 1 \left(a _ {t} - f _ {t}\right)
$$

$$
f _ {t + 1} = f _ {t} + a _ {t} - f _ {t}
$$

$$
f _ {t + 1} = a _ {t}
$$

One challenge associated with using first order exponential smoothing is that you have to start with a previous forecast. So, for the first forecast you need a previous forecast. If you have data, you could use an average. If you don’t have data, you could make an estimate with your judgment or you could get a panel of experts and use an average of their estimates. Whatever you start with will have a significant impact for quite a while,especially if you are using a low alpha. For example, suppose you are forecasting POS generated from the roll of a die, but as before, you do not know how the demand is being generated. Suppose you start with an estimate of one piece and are using an alpha of 0.1.

Figure 4-11 is a graph of the forecast error over 60 days. You can see that for the first third, the bias is positive; that is, we are over forecasting. That is due to the fact that we started with an estimate that was too low to begin with and since alpha is low, it took about 20 days, in this example, to overcome this low initial estimate. Now, let’s change the alpha to 0.5.

![](images/5b7bc168b5038d7537873483734fd11a34edc4c349de23a05bd829741f54712a.jpg)  
Figure 4-11 Forecast error with exponential smoothing

In Figure 4-12, there is no clear bias in the first 20 days. This is a result of having a higher alpha; it allows the forecast to adjust more quickly.

![](images/2385b84773e12c236149391307c72c99731d59d5c0db55ed5170351d7ef0ef20.jpg)  
Figure 4-12 Forecast error with a higher alpha

Figure 4-13 shows a discrete event simulation run if we start with a forecast of 6 and have alpha set to 0.1. You can see that, again we have a clear bias in the first third of the forecasts since the forecast errors are on average below zero.

![](images/0bbe70c653544cc9d7b923ecb04c73a9dc7ce22f23863aa49492b818820e611b.jpg)  
Figure 4-13 Low alpha and impact of initial forecast

So, back to the problem of not having any data for the first forecast. One solution is to start with an estimate but to keep alpha on the higher end of the range and slowly adjust it back to a lower level.

So far we have only looked at a one period ahead forecast. What is the forecast if you are using first order exponential smoothing and you need a forecast ten periods into the future? It turns out that the most recent forecast is the forecast for all future periods. So, if the first order exponentially smoothed forecast for the next period is 34, then at this point in time, the first order exponentially smoothed forecast for period 20 is 34 units. Of course, as we move forward in time, this will change. By the time we get to period 19, the forecast for period 20 might be different from 34 units, but that is what it would be in the current period given that the forecast for the next period is 34 units.

Let’s look at an example. Suppose the forecast for the current period is 20 but actual sales was 30 and that alpha is 0.1. Then the forecast for the next period is

$$
f _ {p e r i o d 2} = f _ {p e r i o d 1} + 0. 1 ^ {*} \left(a _ {p e r i o d 1} - f _ {p e r i o d 1}\right)
$$

$$
f _ {\text {p e r i o d} 2} = 2 0 + 0. 1 ^ {*} (3 0 - 2 0)
$$

$$
f _ {\text {p e r i o d} 2} = 2 0 + 1 = 2 1
$$

That is also the forecast for the period after that:

$$
f _ {\text {p e r i o d} 3} = 2 1
$$

However, suppose now that we come to the end of the next period and actual sales turned out to be 11.

$$
\begin{array}{l} f _ {\text {p e r i o d} 3} = f _ {\text {p e r i o d} 2} + 0. 1 ^ {*} \left(a _ {\text {p e r i o d} 2} - f _ {\text {p e r i o d} 2}\right) \\ f _ {\text {p e r i o d} 3} = 2 1 + 0. 1 ^ {*} (1 1 - 2 1) = 2 1 - 1 = 2 0 \\ \end{array}
$$

So, the Period 3 forecast at the end of Period 1 is 21, but the Period 3 forecast at the end of Period 2 is 20. In addition to making a decision about the initial forecast and the level of alpha, another question that has to be addressed in first order exponential smoothing is the following: How often should the forecast be updated? In the example we just examined, it was being updated every period, but that may not be practical nor optimal. It might not be practical because you cannot change your order every period, for example. It might not be optimal because it creates too much erratic behavior in the system. Again, this is an issue that can be analyzed with discrete event simulation.

The alpha that yields a bias closest to zero may not be the same as the one that minimizes the standard deviation of forecast error over a given period of time. A high bias, meaning you are under forecasting, may result in an expected demand during the protection period being too low, resulting in more stockouts. An alpha that is too high will cause the standard deviation of forecast error to be high, resulting in more safety stock. The point here is that your initial estimate and your selection of alpha both have a lasting impact on the performance of your inventory management. Discrete event simulation is a great tool for assessing these decisions, their impact on forecasting performance, and the resulting impact on inventory management performance.

First order exponential smoothing assumes there is no trend or seasonality in the demand. If there is upward trend and first order exponential smoothing is used, there will be a negative bias. Increasing alpha will reduce the bias because the forecast will adjust up more quickly, but there will still be a bias. Similarly, if there is a downward trend, there will always be a positive bias, since you will on average be forecasting too high.

# Trend Adjusted Exponential Smoothing

We now consider trend adjusted exponential smoothing13 (second order exponential smoothing) to address the possibility of trend in the demand.

If there is trend in the demand, it is important to be able to estimate it for inventory management purposes, whether it be an upward or a downward trend.

In essence, second order exponential smoothing estimates an equation with an intercept and a slope. The intercept is referred to as the level of demand, and the slope is referred to as the trend component of demand. Once these are estimated, to forecast one period into the future, you simply take the level and add to it the trend. To forecast two periods into the future you take the level and add two times the trend component. To forecast n periods into the future, you take the level and add n times the trend component. Based on this, it is easy to see a potential problem with second order exponential smoothing, namely, it assumes that the trend is linear and that there is no end to it into the future. There is a way to address this that we discuss later in this chapter. The forecasting formula for second order exponential smoothing is

$$
f _ {t + n} = L _ {t} + n T _ {t}
$$

Where $L _ { t }$ is the intercept, or level component of the forecast, Tt is the slope or trend component, n is the number of periods into the future of the forecast. So, if the level is 20 and the trend is 5, the forecast for the next period is

$$
f _ {t + 1} = L _ {t} + 1 * T _ {t}
$$

$$
f _ {t + 1} = 2 0 + 1 ^ {*} 5 = 2 5
$$

However, if it is 30 days into the future, it is

$$
f _ {t + 3 0} = L _ {t} + 3 0 * T _ {t}
$$

$$
f _ {t + 1} = 2 0 + 3 0 ^ {*} 5 = 1 7 0
$$

which might very well be too optimistic. Again, we address this problem later in this chapter.

The formula we provided previously for second order exponential smoothing is insufficient because it does not address how you estimateLt, the level component of the forecast, and Tt the trend component. To estimate the level component, there is an associated smoothing constant, which we again refer to as alpha ${ \mathfrak { a } } \in ( 0 , 1 )$ . To estimate the trendcomponent, there is again another smoothing constant, which we refer to as beta $\beta \in ( \mathbf { o } , \mathbf { 1 } )$ . As with first order exponential smoothing, you must have an initial estimate of not only the level, but also the trend. And, as with first order exponential smoothing, higher levels of alpha result in more dramatic adjustment of the estimate of the level from one period to the other. Similarly, higher levels of beta result in more rapid adjustment of the trend component.

To estimate the level in second order exponential smoothing, we have the following:

$$
L = \left(a _ {t - 1} + T _ {t - 1}\right) + \alpha \left[ a _ {t} - \left(a _ {t - 1} + T _ {t - 1}\right) \right]
$$

Look back at the formula for first order exponential smoothing and notice the similarity. In this case, $( a _ { t - 1 } + T _ { t - 1 } )$ is the previous “forecast” of the current level component, and $[ a - ( a _ { t - 1 } + T _ { t - 1 } ) ]$ can be thought of as the error in the forecast of the level. That is, $a _ { t }$ is the actual level and $( a _ { t - 1 } + T _ { t - 1 } )$ was the forecast of the level and the difference is the error. So, in essence, we are taking the previous forecast of the level and adjusting by a fraction of the error, similar to what we did with the first order exponential smoothing formula.

The trend component can be thought of as a forecast in the change of the level of demand. So, the updating of the forecast in the change in the level in demand is an adjustment to the previous trend estimate based on a fraction of the error.

$$
T _ {t} = T _ {t - 1} + \beta \left(\left[ L _ {t} - L _ {t - 1} \right] - T _ {t - 1}\right)
$$

Again, it is instructive to look back at the formula for first order exponential smoothing as well as the formula for the estimate of the level in the second order exponential smoothing. You see the pattern the previous estimate plus a fraction of the error. We can think of $\left[ L _ { t } - L _ { t - 1 } \right]$ as the actual change in the level and $T _ { t - }$ 1 as the previous forecast of the change in the level. So, the difference is the error in the previous estimate.

Let’s look at an example. Suppose the previous level was 100 and the previous trend estimate was 1. Assume that the actual sales were 110 and this period was 120 and that the previous level was 111; and that alpha and beta are both 0.1.

$$
\begin{array}{l} L _ {t} = \left(a _ {t - 1} + T _ {t - 1}\right) + \alpha \left[ a _ {t} - \left(a _ {t - 1} + T _ {t - 1}\right) \right] \\ L _ {t} = (1 1 0 + 1) + 0. 1 [ 1 2 0 - (1 1 0 + 1) ] \\ = (1 1 1) + 0. 1 [ 9 ] \approx 1 1 2 \\ \end{array}
$$

$$
\begin{array}{l} T _ {t} = T _ {t - 1} + \beta \left(\left[ L _ {t} - L _ {t - 1} \right] - T _ {t - 1}\right) \\ T _ {t} = 1 + 0. 1 \big ([ 1 1 2 - 1 1 1 ] - 1 \big) = 1 \\ \end{array}
$$

Now, let’s forecast 10 periods into the future.

$$
\begin{array}{l} f _ {t + n} = L _ {t} + n T _ {t} \\ f _ {t + 1 0} = 1 1 2 + 1 0 ^ {*} 1 = 1 2 2 \\ \end{array}
$$

Suppose we wanted to forecast 365 periods out, then

$$
f _ {t + 3 6 5} = 1 1 2 + 3 6 5 ^ {*} 1 = 4 7 7
$$

This doesn’t seem reasonable. It seems that there is a point where the trend amount increases at a decreasing rate.

# Damped Trend

The way of dealing with this is through damped trend14 adjusted exponential smoothing. This uses a damping factor, $\Phi \in ( \mathbf { 0 , 1 } )$ .

$$
f _ {t + n} = L _ {t} + \left(\sum_ {i = 1} ^ {n} \varphi^ {i}\right) T _ {t}
$$

Let’s use the numbers from the previous example but apply damped trend adjusted exponential smoothing forecasting 10 periods out and let ϕ = 0.9.

$$
f _ {t + 1 0} = 1 1 2 + \left(\sum_ {i = 1} ^ {1 0} 0. 9 ^ {i}\right) * 1
$$

$$
\begin{array}{l} f _ {t + 1 0} \approx 1 1 2 + 5. 9 * 1 \approx 1 1 8 \\ \sum_ {0. 9} ^ {1 0} 0. 9 ^ {i} \approx 5. 9 \\ \end{array}
$$

Notice that , so instead of multiplying by 10, we multiply by 5.9. Now let’s forecast out 365 periods.

$$
\begin{array}{l} f _ {t + 3 6 5} = 1 1 2 + \left(\sum_ {i = 1} ^ {3 6 5} 0. 9 ^ {i}\right) * 1 \\ f _ {t + 3 6 5} = 1 1 2 + 9 * 1 = 1 2 1 \\ \end{array}
$$

Recall before we were multiplying by 365. Now, the damping factor selected has a large impact on how quickly this sum converges. If we would have set $\Phi = 0 . 9 8$ , then we would have multiplied by 49 instead of 9, but that is still significantly less than 365.

$$
\left(\sum_ {i = 1} ^ {n} \Phi^ {i}\right)
$$

The vertical axis of Figure 4-14 is , the horizontal axis is n, and the lines, starting with the lowest line represents $\Phi = 0 . 9 \ . 0 . 9 1 , 0 . 9 2 , 0 . 9 3 , 0 . 9 4$ , and 0.98, respectively. You can see that for ϕ = 0.9 .0.91, 0.92, 0.93, and 0.94 they begin to converge fairly quickly, around 30 to 45 periods out. Although for $\Phi = 0 . 9$ it is at about 37, at $\mathtt { n } { = } 3 6 5$ it is at 49. This method is important for the prevention of ridiculously high forecasts way out into the future.

![](images/e6f15639dcf056da4d98e32850346b7f50012eee7a2b5698963f5473731d7bff.jpg)  
Figure 4-14 Damping factor

# Seasonally Adjusted Forecasts

We now look at seasonality.15 Seasonality exists when demand increases significantly at particular intervals of time each year. Seasonality can be a complex phenomenon because it is sometimes caused by dates, such as Christmas; other times it is the result of causal variables, such as increased temperatures; and sometimes both dates and causal variables.Let’s look at some specific examples. The demand for candy increases at Halloween because candy is part of the celebration of the holiday. The demand for bottled water increases when the temperature increases because people consume more water when the temperature goes up. However, people also consume more bottled water on Independence Day because people buy it to be available for Fourth of July parties, but even more is consumed if it is particularly hot outside. If you forecast the seasonality of bottled water sales strictly with dates (e.g., summer), and then it turns out to be an unusually cool summer, you will probably over forecast the demand for bottled

water. So, for bottled water, you probably want time and temperature in the equation.

Forecasting seasonality with time requires a time series forecasting method that directly addresses seasonality. Forecasting seasonality with a causal variable such as temperature requires a method such as regression, which we discuss later in this chapter. Using both a time series forecasting method combined with a causal method such as regression can be done by using a linear combination of the two, which we also discuss later in this chapter.

One simple way of forecasting quarterly demand with seasonality is with seasonal factors applied to annual forecasts. For example, you could forecast annual demand and not have to worry about seasonality because seasonality occurs within the year. So, with this approach you look back over several years and see what percentage of the demand occurs in each quarter. Suppose you did this and found that annual demand is divided between the first, second, third, and fourth quarters, by 10 percent, 40 percent, 30 percent, and 20 percent, respectively. Then you would forecast annual demand with second order exponential smoothing if there were trend, and then apply the seasonal factors. Suppose that you forecast annual demand to be $100 million, then you would allocate $10 million to the first quarter (10% × $100 million), $40 million to the second quarter (40% × $100 million), $30 million to the third quarter (30% × $100 million), and $20 million to the fourth quarter (20% × $100 million). Of course, this method only works if the seasonal factors are stable from year to year.

You can also have a type of seasonality that is within the week. For example, many grocery items sell more on the weekend than they do during the regular week. This is due in part to the fact that more people shop on the weekend. However, some grocery items sell more evenly throughout the week; it depends on the product, the location, and the retailer. Consider a product bags of ice. People tend to buy these on the weekend for parties, special events, and so on. Perhaps as much as 80 percent of the product is sold in some stores on the weekends in the summer. Then you could use such a seasonal factors approach to forecasting demand throughout the week. Now, it could be that you would sell more product ice in the summer than in the winter. In that case you might want to forecast at a weekly level, including annual seasonality, and then allocate the weekly demand by day using a type of within-week seasonal factor. The accuracy of this would depend on (1) the stability of the within-week seasonal factor, and (2) the accuracy of the weekly forecast.

We now look at an exponential smoothing approach to seasonality calledadditive seasonality exponential smoothing without trend. With this method, rather than having a static estimate of the seasonal factors and the static estimate of the level of demand, these are updated. This method updates the level estimate and the seasonal estimates similarly to the way the estimates of the levels were estimated in

the first order and second order exponential smoothing methods, and also similarly to the way the trend estimates were updated in the second order exponential smoothing method. Let p = number of periods between seasons, Lt = level estimate for period t, St = incremental season demand for period $t ;$ then the level estimate is given by

$$
L _ {t} = L _ {t - 1} + \alpha \left[ \left(a _ {t} - S _ {t - p}\right) - L _ {t - 1} \right]
$$

So, we take the previous estimate of the level of demand and adjust it by a fraction of the error. We can think of $a _ { t } - S _ { t \mathrm { ~ - ~ } p }$ as the actual level based on the actual demand and the incremental seasonal demand from the previous season, and $L _ { t }$ – 1 as the previous estimate of the level.

Now we look at the update of the incremental seasonal demand.

$$
S _ {t} = S _ {t - p} + \beta \left[ \left(a _ {t} - L _ {t}\right) - S _ {t - p} \right]
$$

So, the previous estimate of the incremental seasonal demand p periods ago is updated by a fraction of the error in the estimate. We can think o $\mathrm { f } a _ { t } - L _ { t }$ as the actual incremental seasonal demand and $S _ { t - p }$ as the estimate, so $( a _ { t } - L _ { t } ) - S _ { t - p }$ is the error.

Finally, to estimate the demand for the next periods, we use the following formulation:

$$
F _ {t + n} + L _ {t} + S _ {t + n - p}
$$

Suppose $L _ { t } = 3 0 0$ and you want to forecast out to the next period, so n=1. Suppose the number of periods between seasons is 12 months (p=12), and $S _ { t + 1 - 1 2 } = 1 0 0$ , then

$$
F _ {t + 1} = 3 0 0 + 1 0 0 = 4 0 0
$$

Now, let’s look at the previous example again: Forecast annual demand to be $100 million, then you would allocate $10 million to the first quarter (10% × $100 million), $\$ 40$ million to the second quarter (40% × $100 million), $30 million to the third quarter (30% × $100 million), and $20 million to the fourth quarter (20% × $100 million). The current level of demand is $100 million per year $/ 4$ quarters = $25 million / quarter. So, $L _ { t } = 2 5$ . Then we have $S _ { t + 1 - 4 } = 1 0 - 2 5 = - 1 5 , S _ { t + 2 - 4 } = 4 0 -$ $2 5 = 1 5 , S _ { t + 3 - 4 } = 3 0 - 2 5 = 5 , \mathrm { a n d } S _ { t + 4 - 4 } = 2 0 - 2 5 = - 5$ .

Now, let’s suppose the actual demand for the first quarter turned out to be $15 million and α = 0.1 and $\beta = \mathbf { 0 . 1 }$ .

$$
L _ {Q 1} = 2 5 + 0. 1 \left[ (1 5 + 1 5 - 2 5) = 2 5 +. 5 = 2 5. 5 \right.
$$

And

$$
S _ {Q 1} = - 1 5 + 0. 1 \left[ (1 5 - 2 5. 5 + 1 5 \right] = - 1 5 +. 4 5 \approx - 1 4. 5
$$

So we see that since the actual demand turned out to be $5 million higher than the previous year, it reduced the magnitude of the negative seasonal factor and increased the estimate of the level by about half a million each in the positive direction. So if we want to forecast for Q2

$$
F _ {Q 2} = 2 5. 5 + 1 5 = 4 0. 5
$$

This is half a million higher than Q2 of the previous year. Keep in mind, this increase is the result of the fact that Q1 of this year was $5 million higher than Q1 of last year.

We now look at third order exponential smoothing with damped trend, a variation

on Wwie od W dgine $\sum ^ { p } S _ { i } = p$ For pes ,  ae $\mathrm { p } { = } 4 { \mathrm { : } }$ possibility is $S _ { 1 } = . 5 , S _ { 2 } = 1 . 5 , S _ { 3 } = . 3$ , and $S _ { 4 } = 1 . 7$ . Notice that these add to $4 \cdot$ .

$$
\begin{array}{l} L _ {t} = \left(L _ {t - 1} + T _ {t - 1}\right) + \alpha \left[ \left(\frac {a _ {t}}{S _ {t - p}}\right) - \left(L _ {t - 1} + T _ {t - 1}\right) \right] \\ T _ {t} = T _ {t - 1} + \beta ([ L _ {t} - L _ {t - 1} ] - T _ {t - 1}) \\ S _ {t} = S _ {t - p} + \gamma \left[ \left(\frac {a _ {t}}{L _ {t}}\right) - S _ {t - p} \right] \\ \end{array}
$$

Here is the model to forecast with a linear trend (traditional application of Winter’s model):

$$
f _ {t + n} = \left(L _ {t} + n T _ {t}\right) S _ {t + n - p}
$$

Here is the model to forecast with a damped trend:

$$
f _ {t + n} = \left(L _ {t} + \left(\sum_ {i = 1} ^ {n} \varphi^ {i}\right) T _ {t}\right) S _ {t + n - p}
$$

Figure 4-15 is an example of the difference between the multiplicative seasonal model with trend and the multiplicative seasonal model with damped trend. The horizontal axis is time in quarters, going out three years, and the vertical axis is the forecast in units of sales. The solid line is the multiplicative seasonal model with trend, and the dotted line is the multiplicative seasonal model with damped trend. As you can see, the dampening of the trend also damps the degree of swings in seasonality.

![](images/b7058c326a12ac98716eeedaa6515a6f5353bd5cf0089f54e9bd849bb32675b8.jpg)  
Figure 4-15 Difference between the multiplicative seasonal model with trend and the multiplicative seasonal model with damped trend

In Figure 4-16 we have a downward trend, and we see again that the downward trend of the multiplicative seasonal trend model (solid line) is more dramatic than the multiplicative seasonal damped trend model (dotted line). In fact, as we forecast out further into the future we see less dramatic swings in the nondamped model, the opposite of what we saw with the upward trend.

![](images/e0787d3747f02b49a5aedfe3645e5149b9d1747bd2dfa5d58894087f44712573.jpg)  
Figure 4-16 Downward trend

Notice that the three equations for estimating the level, trend, and seasonal components of the time series are similar to the other smoothing models we have looked at in the sense that they start with the previous estimate and adjust the previous estimate by some fraction (the smoothing constant) of the error in the previous estimate. For example, in the level equation $( L _ { t - 1 } + T _ { t - 1 } )$ is the estimate of

the level in period $\mathrm { t , }$ but $\left( { \frac { a _ { t } } { S _ { t - p } } } \right)$ is the actual level. You see at is the actual sales for $a _ { \mathrm { t } }$ period $\mathrm { t , }$ so dividing by $S _ { t - p }$ takes the seasonal component out of the sales, leaving the actual new level. For example, if $a _ { t } = 1 0$ and $S _ { t - p } = 0 . 5$ , then this means sales for period t was 10 units and that, as a result of seasonality, this period is half of the level of demand, so dividing 10 by 0.5 inflates it to the actual level of 20 for this

period. Consequently, $\left[ \left( \frac { a _ { t } } { S _ { t - p } } \right) - ( L _ { t - 1 } + T _ { t - 1 } ) \right]$ is the error, the difference between the actual level of this period and the estimate of what the level would be this period is $\mathbf { t } - \mathbf { 1 }$ .

Let’s now look at the seasonal estimate.

$$
S _ {t} = S _ {t - p} + \gamma \left[ \left(\frac {a _ {t}}{L _ {t}}\right) - S _ {t - p} \right]
$$

Here again, we are taking the previous estimate of the seasonal factor $S _ { t - p }$ and

$$
\left[ \left(\frac {a _ {t}}{L _ {t}}\right) - S _ {t - p} \right]
$$

adjusting it by a fraction, γ, of the error . The actual sales for period t is $a _ { t } ,$ and is divided by the level to get the actual seasonal component for this period. For example, suppose that the actual sales for this period were 75 units but the level for this period was 100 units, then the actual seasonal component for this

period is $\left( \frac { a _ { \iota } } { L _ { \iota } } \right) = \left( \frac { 7 5 } { 1 0 0 } \right) = 0 . 7 5 .$

Let’s suppose that the smoothing constant for the seasonal component is $\gamma = 0 . 1$ and that $S _ { t - p } = 0 . 8 0$ .

$$
\begin{array}{l} S _ {t} = S _ {t - p} + \gamma \left[ \left(\frac {a _ {t}}{L _ {t}}\right) - S _ {t - p} \right] \\ S _ {t} = 0. 8 0 + 0. 1 \left[ \left(\frac {7 5}{1 0 0}\right) - 0. 8 0 \right] \\ S _ {t} = 0. 8 0 + 0. 1 \left[ (0. 7 5) - 0. 8 0 \right] \\ S _ {t} = 0. 8 0 + 0. 1 [ - 0. 0 5 ] \\ S _ {t} = 0. 8 0 - 0. 0 0 5 \\ S _ {t} = 0. 7 9 5 \\ \end{array}
$$

So far we have looked at four types of exponential smoothing models: (1) first order exponential smoothing, which only forecasts level, (2) exponential smoothing with trend, (3) additive seasonality with no trend, and (4) multiplicative seasonality with trend. Let’s compare these, first from the perspective of the estimate of the level component of the time series. Here they are:

First order: $f _ { _ { t + 1 } } = f _ { _ { t } } + \alpha ( a _ { _ { t } } - f _ { _ { t } } )$

Trend: $L _ { \ t } = ( a _ { \ t - 1 } + T _ { \ t - 1 } ) + \alpha [ a _ { \ t } - ( a _ { \ t - 1 } + T _ { \ t - 1 } ) ]$

Additive seasonal, no trend: $L _ { \ t } = L _ { \ t - 1 } + \alpha [ ( a _ { \ t } - S _ { \ t - p } ) - L _ { \ t - 1 } ]$

$L _ { t } = ( L _ { t - 1 } + T _ { t - 1 } ) + \alpha \Bigg [ \frac { a _ { t } } { S _ { t - p } } - ( L _ { t - 1 } + T _ { t - 1 } ) \Bigg ]$

Notice that for the first order exponential smoothing and the additive seasonality with no trend that the last estimate is only the level, but with the trend adjusted exponential smoothing and the multiplicative seasonal with trend there is the last level plus the trend. The reason for that is that the previous level plus the previous trend is the estimate of what the level would be the next period, and that is precisely what must be adjusted based on the error. Now, the additive seasonality model and the multiplicative seasonal model can include trend or not. In our exposition we did not include trend with the additive seasonal model but we did with the multiplicative model, but that was arbitrary.

Now, the trend equation for both the trend adjusted exponential smoothing and the multiplicative seasonal model with trend are the same: $T _ { t } = T _ { t - 1 } + \beta ( [ L - L _ { t - 1 } ] - T _ { t - 1 } )$ . In addition, if we would have had a trend component in the additive seasonal, it would also be this same equation.

The seasonal components are similar except in the case of additive seasonality; the seasonal component is in terms of the units demand, whereas in the case of multiplicative seasonality, the seasonal component is in terms of a ratio. Other than that they are the same:

$$
\begin{array}{l} S _ {t} = S _ {t - p} + \beta [ (a _ {t} - L _ {t}) - S _ {t - p} ] \\ S _ {t} = S _ {t - p} + \gamma \left[ \left(\frac {a _ {t}}{L _ {t}}\right) - S _ {t - p} \right] \\ \end{array}
$$

Recall that the forecast n periods ahead for the seasonal forecast was

$$
F _ {t + n} = L _ {t} + S _ {t + n - p}
$$

If it would have had linear trend, then it would have been

$$
F _ {t + n} = L _ {t} + n T _ {t} + S _ {t + n - p}
$$

Whereas, for the multiplicative seasonal with trend is

$$
f _ {t + n} = \left(L _ {t} + n T _ {t}\right) S _ {t + n - p}
$$

One thing to notice is that with the additive model with trend, regardless of the size of the trend, the seasonal quantities stay the same. That doesn’t seem reasonable. Imagine you are at 100 units per month and the seasonal factor is 10. Now imagine that at 24 months out it is forecasting 1,000 units per month. It will still have that seasonal factor of 10. On the other hand, with the multiplicative model we find that the seasonal factors are magnified as n grows. That might be reasonable to a point, but it might over magnify eventually. One solution to this is to use the damped trend. We have already shown how the damped trend is incorporated into the multiplicative model, but here is how it is incorporated into the additive model.

$$
F _ {t + n} = L _ {t} + \left(\sum_ {i = 1} ^ {n} \varphi^ {i}\right) T _ {t} + S _ {t + n - p}
$$

Seasonal indices are usually based on very little data. Suppose p=12 months for St + n – p. It is unusual to have two years of representative data. There are situations where there are many years of representative data, but that is often the exception. If you only have two years of data, they are based on few observations of those particular seasons. It is possible that the uncertainty introduced by using seasonal factors that are full of stochastic error could be worse than the benefit it brings. So you could instead use trend adjusted forecast with a high beta so that it would adjust quickly to the seasonality, but using a high beta will make it incorporate more stochastic noise into the estimate of the seasonal factor. Or you could use a level method such as first order exponential smoothing. If you have seasonality and use a level model, you might have (1) too much16 safety stock throughout the year, (2) too little cycle stock during the peak season, and (3) too much cycle stock during the trough.

The solid line in Figure 4-17 is a deterministic additive seasonal model with a level of 100. The dotted line is the same deterministic model but with a stochastic term added to it that is simulated from a normal distribution with a mean of zero and a standard deviation of 20. The only difference between the graph on the top and the graph on the bottom is that they are two different discrete event simulations from the same distribution; the deterministic model is the same in both graphs. These graphs demonstrate the challenge associated with finding the seasonal components from just two years of data—that is, with even a little stochastic disturbance, the estimates will be off.

![](images/6aca5848b7da96dbdf8f413605db34bfebc3eb2fffc1e97c47bf2e20b7364395.jpg)

![](images/5481546e94e15241a5005df6c15b4512c0917a555cc7cfa688e5f893b652ee9c.jpg)  
Figure 4-17 Seasonality with standard deviation equal to 20

Figure 4-18 is identical to Figure 4-17, except that the stochastic term has a standard deviation of 50 instead of 20.

![](images/6764ee2d7b19e23ea01226a50733fb2a853d7d29df51bbf40b7da52eaf21b347.jpg)

![](images/1f6440d66c979be669f3ffea6a7a0ead41b1108d7f3d3d93fcf797e2265ea029.jpg)  
Figure 4-18 Seasonality with standard deviation equal to 50

We can see from this that the estimates of the seasonal components would be completely unreasonable. The key point of this is that great care must be taken in applying seasonal models. In fact, in Figure $\underline { { 4 ^ { - 1 8 } } } :$ , a first order exponential smoothing model would outperform a seasonal model when forecasting into the next year. The seasonal components of the seasonal models would add more noise into the forecasting model that would detract from the forecast accuracy. Figure 4- 18 might be the level of uncertainty you would see for an item in one store where you sell about 100 units on average per month. However, if you were to average

sales from 200 stores with the same seasonality, you might be able to estimate the seasonal component of the time series more accurately.

This idea is even more exaggerated when trying to estimate both trend and seasonal components as illustrated in Figure 4-19.

![](images/28569d6ac6509d248a0775b3c6d27f2c487269fd367340e3f1b2139e4d3a4961.jpg)

![](images/8265db0f3d2b67045053cfbe3887bb69f89afdc4e76d27db1bd5d32ae9dac1a4.jpg)  
Figure 4-19 Seasonality and trend with standard deviation equal to 50

In Figure 4-19, the solid line is the same deterministic model but with a stochastic term added to it, which is simulated from a normal distribution with a mean of zero and a standard deviation of 50. As you can see again, the seasonality would be difficult to detect in both graphs. The dashed lines are the regression lines for the

corresponding lines. (The thin dashed line corresponds to the solid line, and the bold dashed line corresponds to the dotted line.) The regression model uses the month number as the independent variable and the level of line as the dependent variable. Hence, the thin dashed line is the actual trend component and the bold dashed line is the estimated trend component. In general, it is easier to estimate the trend component than seasonal components of time series. Consequently, in these two examples, using trend adjusted exponential smoothing with a damped trend, being off on the initial estimate of the trend would not have as deleterious an effect as if the trend was not damped.

As mentioned earlier, Figure 4-18 is identical to Figure 4-17, except that the stochastic term has a standard deviation of 50 instead of 20. InFigure 4-20, it is still difficult to estimate the seasonal factors, but the trend estimates are very close to the actual trend components.

![](images/16368d15a52380fa6537011882b2b0e3c5ae1acc870ff88c22dbdc25d628e222.jpg)

![](images/379da3e0b13210de0ea32b93dcf546e24c0e2dad57c7ef1ba11544a0a88cac19.jpg)  
Figure 4-20 Seasonality and trend with standard deviation equal to 20

If the trend is sufficiently pronounced, even if the demand has a lot of noise, the trend component can often be estimated relatively accurately. However, you must make sure you have sufficient data to estimate a trend. Figure 4-21 is an example of this.

![](images/d7a33f2e8198818011858d83da56bff4c64b0768190b6e51904c3db442eb3fc6.jpg)  
Figure 4-21 An illusion of trend

Figure 4-21 is simulated demand from demand that only has a level component. The level component is 10, and the stochastic term is from a normal distribution with a mean of zero and a standard deviation of 5. In this example, there appears to be a trend but obviously, based on the underlying model, there is no trend.

Figure 4-22 is simulated data from the same demand distribution fromFigure 4- 21 except that it is simulated for 40 periods. Of course this is just one discrete event simulation, but it illustrates the point that even at 40 periods, you could detect a trend that does not exist.

![](images/b084d9271c7baf6a8ef48db7caca7085110a8dd154be083201575968bd7ee9bf.jpg)  
Figure 4-22 Another illusion of trend

It sounds as if we have shown you trend and seasonal models and now we are saying you probably shouldn’t use them, but that is not the case. We are simply explaining an important caveat in using trend and seasonal models. In Figure 4-22, if we were to use damped trend, the effect of the small trend we seemed to detect (that didn’t really exist) would be minimized. However, it is a good idea to go further than just using damped trend. In forecasting it is good to use logic and other empirical data prior to developing forecasting models. Is there a reason to believe that trend and seasonality exist? Why? What is the logic? Answering these questions may require getting others involved, possibly from sales and marketing. In addition, there may be an upward trend if you are gaining market share. Such information can be obtained from companies that sell syndicated sales data such as AC Nielsen.

# CAUSAL MODELS

There are other types of time series forecasting models, but we now go on to talk some about causal models, and in particular, regression models. Building effective regression models requires more skill than building time series smoothing models. We use regression later in the book for other purposes, so it is worthwhile to learn it here for multiple reasons. Regression is a complex topic, and we just skim the surface and discuss it from an applied perspective.

# Regression

To build a regression model you must define your dependent and independent variables. Since we are forecasting sales, the dependent variable is sales. Regression finds a line that fits the data by minimizing the sum of the squared errors. Errors are forecast errors. As we discussed earlier, the forecast error for period i is defined as $F E _ { i } = a _ { i } - f _ { i } , $ where ai is the actual realized sales for period i and fi is the forecast for period i. In regression, they are not referred to as forecast errors, but are referred to as residuals, because most of the time regression is not used for forecasting but for testing hypotheses. In particular, regression minimizes the sum of the squared residuals for n observations.

$$
\min  \sum_ {i = 1} ^ {n} \left(a _ {i} - f _ {i}\right) ^ {2}
$$

Regression selects the regression coefficients to minimize this sum. In general, the forecasting regression equation is

$$
f \left(\left\{X _ {i} \right\} _ {i = 1} ^ {m}\right) = b _ {0} + \sum_ {i = 1} ^ {m} b _ {i} X _ {i}
$$

So regression chooses $b _ { \mathrm { o } } ,$ the intercept, and $b _ { i } ,$ the slope values (referred to as regression coefficients) for each of the m independent variables, to minimize the sum of the squared residuals. Many software packages, including Microsoft Excel, can be used to estimate regression equations.

We begin with one of the simplest regression based forecasting methods, trend forecasting. Figure 4-23 is the data we use to develop a regression based forecasting model.

![](images/8c550b3cf1bb7d0e73898cddcd44d2ff43aa964ef8f2ea295d301f1573b81855.jpg)  
Figure 4-23 Trended demand

Table $\mathbf { 4 - 2 }$ has the number represented in Figure 4-23.

<table><tr><td>Week</td><td>Sales</td></tr><tr><td>1</td><td>8</td></tr><tr><td>2</td><td>12</td></tr><tr><td>3</td><td>31</td></tr><tr><td>4</td><td>21</td></tr><tr><td>5</td><td>24</td></tr><tr><td>6</td><td>28</td></tr><tr><td>7</td><td>42</td></tr><tr><td>8</td><td>27</td></tr><tr><td>9</td><td>21</td></tr><tr><td>10</td><td>49</td></tr><tr><td>11</td><td>45</td></tr><tr><td>12</td><td>35</td></tr><tr><td>13</td><td>41</td></tr><tr><td>14</td><td>42</td></tr></table>

Table 4-2 Weekly Demand with Trend   

<table><tr><td>15</td><td>39</td></tr><tr><td>16</td><td>24</td></tr><tr><td>17</td><td>39</td></tr><tr><td>18</td><td>52</td></tr><tr><td>19</td><td>54</td></tr><tr><td>20</td><td>30</td></tr><tr><td>21</td><td>35</td></tr><tr><td>22</td><td>45</td></tr><tr><td>23</td><td>38</td></tr><tr><td>24</td><td>37</td></tr><tr><td>25</td><td>42</td></tr><tr><td>26</td><td>52</td></tr><tr><td>27</td><td>53</td></tr><tr><td>28</td><td>56</td></tr><tr><td>29</td><td>55</td></tr><tr><td>30</td><td>30</td></tr></table>

Using regression, we get the following forecasting model:

$$
F _ {t} = 2 2 + 0. 9 5 t
$$

That is, regression estimates the intercept to be 22 and the slope to be 0.95. So, if we were to forecast for week 31, we would get

$$
F _ {3 1} = 2 2 + 0. 9 5 (3 1) = 5 1
$$

And a forecast for week 50 would be

$$
F _ {5 0} = 2 2 + 0. 9 5 (5 0) = 7 0
$$

Regression shows that the model is statistically significant and has an R-square of 0.43, meaning that 43 percent of the variance in the forecast is explained by the week number.

There are ways with regression to estimate something similar to a damped trend. We can estimate a model of the form

$$
F _ {\mathrm {t}} = a t ^ {b}
$$

To estimate this with regression, we must first take the natural log of both sides of the equation.

$$
\ln F _ {t} = \ln \left(a t ^ {b}\right)
$$

$$
\ln F _ {t} = \ln a + \ln \left(t ^ {b}\right)
$$

$$
\ln F _ {t} = \ln a + b \ln t
$$

In this case the R-square has gone from 0.43 to 0.64, meaning the “power” form of the regression actually explains more of the variance in sales. The actual model we estimate from regression is

$$
F _ {t} = 1 2 t ^ {0. 4 2}
$$

After running the regression, 0.42 was the estimate of the slope, but to get 12, you must first raise the intercept to the power of e. The intercept was estimated to be 2.48, so e2.48 ≈ 12.

Now, let’s forecast for weeks 31 and 50 as we did before with the linear regression model.

$$
F _ {3 1} = 1 2 (3 1) ^ {0. 4 2} = 5 1
$$

This is the same forecast with the linear model. Now let’s look at the forecast for week 50.

$$
F _ {t} = 1 2 (5 0) ^ {0. 4 2} = 6 2
$$

So the forecast of week 50 with the power model is 62, whereas with the linear model it was 70. In this regard, the power model is like a damped trend. However, it is only like a damped trend when the estimate of b is between zero and one. If it is greater than one, it will make forecasts that shoot off into the stratosphere when the forecasts are very far into the future.

# Additive and Multiplicative Models

Now, sometimes you need to make forecasts that are based on price, promotional spending, advertising, the price of substitutes, and other variables. In these cases,

you might not only be interested in forecasting but also interested in testing hypotheses, such as increased promotional spending leads to higher sales. When we are testing hypotheses, we need to be more careful in using the regression model than when we are just forecasting.

Suppose we want to forecast with a model that takes into account trend, advertising spending, promotional spending, and the price of the product. We could estimate a forecasting model with regression using a multiplicative power model, such as the following:

$$
F _ {t} = a ^ {*} t _ {1} ^ {b} ^ {*} \text {A d v e r t i s i n g} _ {2} ^ {b} ^ {*} \text {P r o m o t i o n} _ {3} ^ {b} ^ {*} \text {P r i c e} _ {4} ^ {b}
$$

Alternatively, we could estimate a linear model, such as the following:

$$
F _ {t} = a + b _ {1} t + b _ {2} \text {A d v e r t i s i n g} + b _ {3} \text {P r o m o t i o n} + b _ {4} \text {P r i c e}
$$

There are several benefits of the multiplicative power model over the linear model. The first benefit is that the multiplicative power model takes into account that there may be interactions between the independent variables. That is, the effect of spending on advertising may depend on the price. The second benefit of the multiplicative power model is that many of the relationships between the independent variable and sales would not be expected to be linear but rather nonlinear. We have already discussed this with respect to time, but we would also expect it with respect to other independent variables such as advertising. That is, we would expect that as we spend more on advertising, we would get more sales, but the increase would eventually be at a decreasing rate.17 The third benefit of the multiplicative power model is that the regression coefficients can be interpreted as elasticity values. Suppose you run the regression model and find b2=0.3; then we can interpret this to mean that if we increase spending on advertising by 1 percent, there will be a 0.3 percent increase in sales.18 Similarly, ifb4=–2, then for a 1 percent reduction in price, sales will increase by 2 percent, highly elastic. This is assuming that the assumptions of regression hold and are not violated. Now to prepare for the regression, the natural log must be taken of the dependent and independent variables.

$$
F _ {t} = a ^ {*} t _ {1} ^ {b} ^ {*} \text {A d v e r t i s i n g} _ {2} ^ {b} ^ {*} \text {P r o m o t i o n} _ {3} ^ {b} ^ {*} \text {P r i c e} _ {4} ^ {b}
$$

$$
\ln F _ {t} = \ln \left(a ^ {*} t _ {1} ^ {b} * A d v e r t i s i n g _ {2} ^ {b} * P r o m o t i o n _ {3} ^ {b} * P r i c e _ {4} ^ {b}\right)
$$

$$
\ln F _ {t} = \ln a + \ln t _ {1} ^ {b} + \ln \text {A d v e r t i s i n g} _ {2} ^ {b} + \ln \text {P r o m o t i o n} _ {3} ^ {b} + \ln \text {P r i c e} _ {4} ^ {b}
$$

$$
\ln F _ {t} = \ln a + b _ {1} \ln t + b _ {2} \ln \text {A d v e r t i s i n g} + b _ {3} \ln \text {P r o m o t i o n} + b _ {4} \ln \text {P r i c e}
$$

This is similar to how we estimated the regression for the power model of trend. Now, suppose we want to take into account the Christmas season. To do so we can use a dummy variable:

$$
D = \left\{ \begin{array}{l} 1 \text {i f i t i s C h r i m a s s e a s o n} \\ 0 \text {o t h e r w i s e} \end{array} \right.
$$

So, it could be included in the equation as

$$
\ln F _ {t} = \ln a + b _ {1} \ln t + b _ {2} \ln \text {A d v e r t i s i n g} + b _ {3} \ln \text {P r o m o t i o n} + b _ {4} \ln \text {P r i c e} + b _ {5} D
$$

Notice that we did not take the natural log of D. The reason for this is that the natural log of zero is undefined. Of course b4 cannot be interpreted as an elasticity as before, but the other regression coefficients still can be interpreted that way.

# Assumptions of Regression

If we are wanting to do more than forecast with this model, such as use the elasticity estimates, or test hypotheses about whether one of these variables is statistically significant, we need to make sure the assumptions of regression are satisfied. Since this is not a book on regression, we just give some high level assumptions to consider:

1. Regression assumes that the residuals are normally distributed with a mean of zero. So, if you were to make a histogram of the residuals, they should look somewhat bell shaped.   
2. Regression assumes that the residuals are not correlated over time. If residuals are correlated over time, it is referred to as autocorrelation.   
3. Regression assumes that the variance of residuals is constant for various levels of the dependent variables. This assumption is known ashomoscedasticity. If the assumption is violated, that is, if the variance of the residuals changes for different levels of the dependent variable, it is known as heteroscedasticity.   
4. Regression assumes that the independent variables are statistically independent. If they are not statistically independent, they will be correlated. This problem is referred to as multicollinearity.   
5. There are other assumptions as well and when many of them are violated, there are a number of methods to address the violations, but these are beyond the scope of this book.

# ENDNOTES

1. One of the best repositories of information on forecasting ishttp://www.forecastingprinciples.com/.   
2. The roll of a six-sided die is a discrete uniform distribution, where each outcome is equally likely.   
3. You can simulate the roll of a die in Excel using the following function: =RANDBETWEEN(1,6). In general, =RANDBETWEEN(a,b) generates random numbers between a and b using a uniform distribution, meaning that each of the outcomes is equally likely.   
4. This could happen if they were coming out of the backroom and put on the shelf in the morning.   
5. Which has plenty of candy, in our example.   
6. Recall, ILFR is item-level fill rate.   
7. The ten-week moving average doesn’t start until the 11th week because it takes ten days of demand to get started.   
8. Armstrong, Jon Scott, ed. Principles of Forecasting: A Handbook for Researchers and Practitioners. Vol. 30. New York: Springer, 2001.   
9. You will notice R square below the equation. We discuss that later in the chapter.   
10. We are again assuming that the replenishment manager does not know how the demand is being generated.   
11. Assuming there is no uncertainty in the lead time.   
12. Brown, Robert G. Exponential Smoothing for Predicting Demand. Cambridge, MA: Arthur D. Little,1956.   
13. Holt, Charles C. “Forecasting Seasonals and Trends by Exponentially Weighted Moving Averages.” International Journal of Forecasting 20.1 (2004): 5-10.   
14. Taylor, James W. “Exponential Smoothing with a Damped Multiplicative Trend.” International Journal of Forecasting 19.4 (2003): 715-725.

15. Winters, Peter R. “Forecasting Sales by Exponentially Weighted Moving Averages.” Management Science 6.3 (1960): 324-342.   
16. Too much in the sense that if you took seasonality into account in an effective way, there would be less forecast error. The challenge is that having the seasonal component per se might introduce more forecast error.   
17. Eventually there should be diminishing returns to advertising.   
18. Alternatively, we could say that for a 10 percent increase in spending on advertising, there will be a 3 percent increase in sales.

# 5. Discrete Event Simulation of Inventory Processes

Many inventory processes are difficult or impossible to model mathematically and statistically without the use of a computer. Discrete event simulation is an easy way to model these inventory processes. Discrete event simulation is an academic discipline per se with a lot of depth and breadth, and many different software packages can be used to implement discrete event simulation. In this chapter we do not go in depth on the theory and intricacies of discrete event simulation nor the software packages to implement them. Rather, we explain how to set up a discrete event simulation of an inventory process in Microsoft Excel1and explain how modify it, analyze it, and interpret the results. Discrete event simulation not only allows for the modeling of complex inventory replenishment processes, but it also allows you to incorporate uncertainty into the demand, lead time, and other areas where uncertainty exists. You can also explicitly model process execution errors. Finally, such a discrete event simulation allows you to estimate the performance of the inventory replenishment process if parameters are changed, if execution is improved, or even if the process is changed.

The purpose of this chapter is to empower you to be able to use discrete event simulation in Excel to model inventory processes. It is a powerful tool and is easily accessible in Excel. You learn to create either a full-fledged discrete event simulation model, or at the very least a prototype. When working with discrete event simulation experts, being able to create a prototype makes it more likely that you will be able to more fully communicate the process you want to have modeled, the types of decisions you want to make, and the performance metrics and how they should be calculated. Many times there is a gap between what a manager wants modeled and what he eventually receives from an expert in discrete event simulation. What you learn in this chapter should help you close that gap. A side

benefit is that you will become much more aware of the intricacies of the inventory process you are attempting to model.

# UNDERSTAND THE INVENTORY REPLENISHMENT PROCESS

Before you begin the discrete event simulation modeling process, make sure you clearly understand why you are modeling the process. Who are the customers of the output of the modeling and analysis? What will occur if you succeed and have a clear model with decisive output? How will the results be presented? How much understanding do the customers have of inventory processes, inventory theory, and discrete event simulation?

Within discrete event simulations of inventory processes you must clearly understand how the process actually works to model it. So, the first step is documentation of the inventory process. Here is a list of questions to answer:

When can orders be placed?   
At what points in time?   
How often?   
At what inventory levels?   
How much can be ordered?   
Is there a maximum amount that can be ordered?   
Is there a minimum amount that must be ordered?   
Is there a fixed order quantity?   
Are multiples of the fixed order quantity permitted?   
Is there an order up to level?   
If the order up to level is not possible to be reached in the order increments, is the order quantity rounded up or what rule is used?   
Are orders based on a unit quantity or a dollar volume?   
What are the time increments?

Days? Weeks? Months?   
Are all products on the same time increments?   
Can the time increments be overridden?   
What is the lead time?   
Is there one supplier?   
If there are multiple suppliers, are the lead times the same?   
What is the variability of the lead time?   
What is the historical minimum and maximum of the lead time?   
Is there a good source of data for the lead time?   
Are lead times the same throughout the year or do they vary over the year?   
Is it possible to expedite orders?   
What are the components of lead time?   
What is the longest portion of lead time?   
Which element of lead time is most uncertain?   
What is transit time?   
What is demand?   
Is there data on previous sales?   
Is there information on when there were stockouts?   
Is the sales data clean or does it need to be cleaned?   
What is the empirical distribution of demand?   
Which theoretical probability distribution best represents the actual distribution of demand?   
What types of forecasting methods are used?

Are time series methods used?   
What is the number of periods in the moving average models?   
What are the smoothing constants?   
What has been the MAD, MAPE, bias, and standard deviation of forecast error?   
Are there any constraints on inventory?   
Are there space limitations?   
Are there inventory investment limitations?   
What are the performance metrics?   
How is on time delivery measured?   
How is fill rate measured?   
How is in stock measured?   
How is inventory measured?   
How can system generated orders be overridden?   
Who can override orders?   
How are decisions made to override orders?   
What are inventory costs?   
What are the elements of inventory costs?   
How are they monitored?   
What are the fixed ordering costs?   
What are the variable ordering costs?   
Are there quantity discounts?   
How are the quantity discounts achieved?   
What are the processes for receiving the quantity discounts?

What is the accuracy of inventory position?   
When does inventory position lose accuracy in the inventory replenishment process?   
How often is inventory position inaccurate?   
How often are physical inventories taken?   
What is the unit cost?   
What is the transportation cost?   
What mode of transportation is used and which carriers are used?   
What is the product commodity classification of the product?   
What is the weight and volume of the product?   
Where and when do execution problems occur in the inventory process?   
Do products always get put away when they are received?   
When do problems occur with put away?   
Are products mis-picked? What percentage of the time?   
Are products mis-shipped? What percentage of the time?   
Is product damaged?   
How often is product damaged?   
When is it damaged?   
At what point in the inventory replenishment process is inventory damaged?

This is actually a small sample of the questions that should be asked. Every situation has idiosyncrasies that we cannot anticipate, but attempting to answer these questions will help you make progress. It is important to carefully document the process and to dig deep with questions. Make sure you understand the answers and question the answers. It is also a good idea to document the process with a flow chart and then review your documentation and flow chart with experts and with those you interviewed to understand the process. At this point you will probably

discover a number of errors and misunderstandings. You many also uncover new decision processes and constraints in the inventory replenishment process. Getting perspectives from multiple people and from multiple functional areas is also helpful. Keeping a laboratory notebook facilitates the documentation process. You should note the day, who you interviewed, and take copious notes. After meetings with key informants, it is recommended to summarize the discussion with the key informant. This also helps to identify misunderstandings from the interview. After leaving the meeting with the key informant, you should also summarize the meeting in your notes. Write out any questions that come up.

# RANDOMNESS IN DEMAND

To simulate randomness we use a random number generator and the inverse of a cumulative probability distribution. Suppose you have a spinner with three numbers on it, 0, 1, and 2, and suppose that 90 percent of the area of the spinner is for the number 0, 7 percent is for the number 1, and 3 percent for the number 2. Then the cumulative probability distribution for this spinner is 0 has a 0.9 probability, 0 to 1 has a 0.97 probability, and 0, 1, or 2 has a 1.0 probability. The inverse of this cumulative probability distribution takes a number between 0 and 1 and maps it to the outcomes of the event. For example, 0.99 would be mapped to 2; 0.92 would be mapped to 1; and 0.333 would be mapped to 0. In general, it would map any number between 0 and 0.9 to 0, any number between 0.90 and 0.97 to 1, and any number between 0.97 and 1 as 2. In Excel you can generate random numbers between 0 and 1 using the function =RAND(). If you put =RAND() in a cell you get a number between 0 and 1, and if you press CONTROL + F9, it gives you a different random number. So, we could use these random numbers and the inverse of the cumulative distribution of the spinner that was just described to simulate spinning the spinner. For example, suppose we used =RAND() and it returned a 0.453. Then the inverse of the cumulative distribution of the spinner would return a 0.

# Empirical Distributions of Demand and Lead Time

One easy way to represent the probability distribution of demand within discrete event simulation is with an empirical distribution. Suppose you are simulating demand per day and based on history you find that 10 percent of the time you sell zero units, 30 percent of the time you sell one unit, 40 percent two units, and 20 percent three units. You have never sold more than four units, but there is always plenty of inventory on hand. From this, you would want to create Table 5-1 in Excel.

Table 5-1 Empirical Demand Distribution   

<table><tr><td colspan="3">Quantity of Demand</td></tr><tr><td>Cum Prob</td><td>Units</td><td>Probability</td></tr><tr><td>0</td><td>0</td><td>0.1</td></tr><tr><td>0.1</td><td>1</td><td>0.3</td></tr><tr><td>0.4</td><td>2</td><td>0.4</td></tr><tr><td>0.8</td><td>3</td><td>0.2</td></tr></table>

The middle column in Table 5-1 is the number of units demand per day and the last column is the probability of selling that many units in a given day. The last column in Table 5-1 is what we are referring to as the cumulative probability. Technically, in probability theory we would say that the cumulative probability of selling zero units is 0.1, but here we have a zero in that column. This is due to an idiosyncrasy of Excel in terms of how it reads tables, as we see later in the chapter. In effect, the Cum Prob column is shifted down one cell from what you would expect.

We would use this distribution in Excel with a random number generator from 0 to 1, and then, based on the random number generated in Excel, we would look at the cumulative probability column to pick out how many units sold for that simulated day.

We can simulate a number from 0 to 1 in Excel using the function =RAND(). Suppose we use that function and it returns a 0.15, then the simulated number of units sold will be one unit for that day because 0.15 lies between 0.1 and 0.4, for a total of a 0.3 probability. If =RAND() returned 0.05, then the simulated number of units sold for that daywould be zero units. In the cell where we want to simulate demand, we would use the function =VLOOKUP(RAND(),TABLE RANGE, COLUMN NUMBER OF UNITS OF DEMAND, COLUMN NUMBER TO LOOK UP THE RANDOM NUMBER THAT WAS GENERATED). In this case, suppose the cumulative probability of zero is in Cell A5. Then we would use =VLOOKUP(RAND(),A5:C8,2,1). We could then create a column of demand simply by copying =VLOOKUP(RAND(),$A$5:$C$8,2,1) in as many cells as we want. Notice the “$” sign before the column and row designations in the formula. This keeps them from changing when you copy them to different cells.

Table 5-2 is an example of a discrete event simulation according to the distribution in Table 5-1.

Table 5-2 Quantity Demanded   

<table><tr><td>2</td></tr><tr><td>3</td></tr><tr><td>1</td></tr><tr><td>1</td></tr><tr><td>1</td></tr><tr><td>3</td></tr><tr><td>1</td></tr><tr><td>3</td></tr><tr><td>0</td></tr><tr><td>2</td></tr><tr><td>0</td></tr><tr><td>2</td></tr><tr><td>2</td></tr><tr><td>1</td></tr></table>

We look at other distributions of demand including the Poisson, truncateddiscretized normal, and discretized gamma later in the chapter. Now we briefly examine the discrete event simulation of lead time.

Just as you can create an empirical distribution of demand, you can also create an empirical distribution of lead time. You simply keep track of the length of lead times for each order and create a table similar to Table 5-3.

Table 5-3 Empirical Lead Time Distribution   

<table><tr><td colspan="3">Lead Time</td></tr><tr><td>Cum Prob</td><td>Days</td><td>Probability</td></tr><tr><td>0</td><td>1</td><td>0.1</td></tr><tr><td>0.1</td><td>2</td><td>0.8</td></tr><tr><td>0.9</td><td>3</td><td>0.1</td></tr></table>

Table 5-3 shows that 80 percent of the time lead time was two days but 20 percent of the time it was either a day longer or shorter. The approach to using this table to simulate the lead time is the same as inTable 5-2 for discrete event simulation of the demand from the empirical distribution of demand. Table 5-4 is an example of a discrete event simulation of lead time based on Table 5-3.

Table 5-4 Lead Time

# INVENTORY SIMULATION IN EXCEL

Now let’s consider discrete event simulation of an inventory system in Excel. We simulate on a daily basis, where the replenishment system reviews every day and if the inventory position is at or below the reorder point, it orders a fixed order quantity Q. This system does not allow for back-ordering; all stockouts result in lost sales. Table 5-5 is a basic layout of the Excel spreadsheet we use to simulate an inventory replenishment system.

Table 5-5 Discrete Event Simulation of Inventory System   

<table><tr><td>6</td><td></td><td>Beginning</td><td>Replen</td><td>Quantity</td><td></td><td>Ending</td><td>Inventory</td><td>Order</td><td>Le</td></tr><tr><td>7</td><td>Day</td><td>Inventory</td><td>Received</td><td>Demanded</td><td>Sales</td><td>Inventory</td><td>Position</td><td>Placed</td><td>Ti</td></tr><tr><td>8</td><td>1</td><td>10</td><td>0</td><td>0</td><td>0</td><td>10</td><td>10</td><td>0</td><td></td></tr><tr><td>9</td><td>2</td><td>10</td><td>0</td><td>5</td><td>5</td><td>5</td><td>5</td><td>0</td><td></td></tr><tr><td>10</td><td>3</td><td>5</td><td>0</td><td>0</td><td>0</td><td>5</td><td>5</td><td>0</td><td></td></tr><tr><td>11</td><td>4</td><td>5</td><td>0</td><td>2</td><td>2</td><td>3</td><td>3</td><td>1</td><td>2</td></tr><tr><td>12</td><td>5</td><td>3</td><td>0</td><td>0</td><td>0</td><td>3</td><td>13</td><td>0</td><td></td></tr><tr><td>13</td><td>6</td><td>3</td><td>0</td><td>0</td><td>0</td><td>3</td><td>13</td><td>0</td><td></td></tr><tr><td>14</td><td>7</td><td>3</td><td>10</td><td>4</td><td>4</td><td>9</td><td>9</td><td>0</td><td></td></tr><tr><td>15</td><td>8</td><td>9</td><td>0</td><td>7</td><td>7</td><td>2</td><td>2</td><td>1</td><td>2</td></tr><tr><td>16</td><td>9</td><td>2</td><td>0</td><td>3</td><td>2</td><td>0</td><td>10</td><td>0</td><td></td></tr><tr><td>17</td><td>10</td><td>0</td><td>0</td><td>2</td><td>0</td><td>0</td><td>10</td><td>0</td><td></td></tr><tr><td>18</td><td>11</td><td>0</td><td>10</td><td>2</td><td>2</td><td>8</td><td>8</td><td>0</td><td></td></tr><tr><td>19</td><td>12</td><td>8</td><td>0</td><td>4</td><td>4</td><td>4</td><td>4</td><td>1</td><td>2</td></tr><tr><td>20</td><td>13</td><td>4</td><td>0</td><td>0</td><td>0</td><td>4</td><td>14</td><td>0</td><td></td></tr><tr><td>21</td><td>14</td><td>4</td><td>0</td><td>4</td><td>4</td><td>0</td><td>10</td><td>0</td><td></td></tr></table>

# Beginning and Ending Inventory

Table 5-5 shows a couple of weeks of the discrete event simulation of an inventory replenishment system. The second column, Beginning Inventory, is simply the Ending Inventory from the previous day. Notice that the sixth column is Ending Inventory. Although Beginning Inventory is Ending Inventory of the previous day, it cannot be for the first day, so you have to start with some number. In this case, we started beginning inventory with the order quantity. The third column is Replen Received, which we have initialized as zero for the first day. In that column the formula is =COUNTIF($J$8:J13,A14)*Q. This counts the number of cells in the range J8:J13 (which is the column titled Day Order Arrives) that are the same as the number in the Day column. When the formula is at Day 6 in the Replen Received column, there are no numbers in the Day Order Arrives column that are equal to 6 so it counts zero cells. But the next cell down, when the formula is at Day 7 in the Replen Received column, there is only one cell that is equal to 7, so it counts 1. This is then multiplied by Q, the order quantity. The order quantity is 10, so it shows that 10 units were received. Quantity Demanded is the fourth column.

We have already discussed how to use a table based on an empirical distribution. We could instead use a theoretical distribution, such as the Poisson, to create a table similar to that of the empirical distribution, and use a similar method to simulate demand. Table 5-6 is an example of a demand schedule according to a Poisson distribution with a mean of two units per day. For a Poisson distribution, the mean is equal to the variance.

Table 5-6 Poisson Demand   

<table><tr><td colspan="3">Quantity of Demand</td></tr><tr><td>Cum Prob</td><td>Units</td><td>Probability</td></tr><tr><td>0.0000</td><td>0</td><td>0.14</td></tr><tr><td>0.1353</td><td>1</td><td>0.27</td></tr><tr><td>0.4060</td><td>2</td><td>0.27</td></tr><tr><td>0.6767</td><td>3</td><td>0.18</td></tr><tr><td>0.8571</td><td>4</td><td>0.09</td></tr><tr><td>0.9473</td><td>5</td><td>0.04</td></tr><tr><td>0.9834</td><td>6</td><td>0.01</td></tr><tr><td>0.9955</td><td>7</td><td>0.00</td></tr><tr><td>0.9989</td><td>8</td><td>0.00</td></tr></table>

# Poisson Distribution of Demand

Table 5-6 is set up just like Table 5-1, so it can be used for discrete event simulation of demand in the same way it was done for the empirical distribution. In the Probability column of Table 5-6 you can use the function =POISSON.DIST(UNITS OF DEMAND, MEAN, FALSE). The last argument in the function, FALSE, designates the probability mass function as opposed to the cumulative distribution function. If you want to use a truncated2 discretized3 normal distribution, you do not need a table; you can simply insert the following inside the Quantity Demanded column:

=ROUND(MAX(NORMINV(RAND(), MEAN, STANDARD DEVIATION),0),0)

The MAX(X,0) ensures we do not get negative numbers, and ROUND(X,0) ensures that we get integers.

# Gamma Distribution of Demand

Similarly, we can use a gamma distribution, which does not need to be truncated because it starts at zero, whereas the normal distribution goes from negative infinity to positive infinity.

As mentioned before, there are two parameters you need for the gamma distribution, alpha α and beta β. The following equations allow you to use the inverse of the gamma distribution in Excel.

$$
\begin{array}{l} \alpha = \frac {\mu^ {2}}{\sigma^ {2}} \\ \beta = \frac {\sigma^ {2}}{\mu} \\ \end{array}
$$

In the Quantity Demanded column you can use the Excel function

$$
= \text {R O U N D} (\text {G A M M A I N V} (\text {R A N D} (), \text {A L P H A}, \text {B E T A}), 0)
$$

# Demand Versus Sales

Referring back to Table 5-5, the fifth column is Sales. In some cases, we don’t have enough inventory to meet the quantity demanded. If you look at Day 9, you see that the beginning inventory was 2, no inventory was received (Replen Received column), but the Quantity Demanded column was 3. So the amount sold (Sales column) is the minimum of Beginning Inventory plus Replen Received and Quantity Demanded. The formula to use in the Sales column is

$$
= \text {M I N} (\text {B e g i n n i n g I n v e n t o r y} + \text {R e p l e n R e c e i v e d}, \text {Q u a t i t y D e m a n d e d})
$$

Ending Inventory is the sixth column. This is simply Beginning Inventory + Replen Received – Sales. Inventory Position is the seventh column, which is on hand plus on order. To calculate it in Excel, take the previous inventory position, subtract sales for the current period, and add in what is on order from the previous period. To do that use IF(Order Placed Previous Period = 1, Q, 0). This function is indicating that if an order was placed in the previous period, then return Q; otherwise 0. This is added to inventory from the previous period, and sales from the current period are subtracted. In other words, it is the inventory position at the end of the period. That is an artifact of how this spreadsheet is constructed, namely, the review is conducted at the end of the day to determine whether an order should be placed. Order Placed is the eighth column. This is an “IF” statement, comparing inventory position with the reorder point ROP. If inventory

position is less than ROP, it returns a 1 indicating an order was placed, and 0 otherwise. If you want to set up the discrete event simulation so that orders can only be placed, say, once per week, or do not want to order on certain days, just enter zeros in the Order Placed column for those days.

# Lead Time and Orders

Lead Time is the ninth column, and we have already discussed how to simulate lead time. Now, if you want lead time to be deterministic, you can just enter the fixed number of days of lead time in the Lead Time column. Day Order Arrives is the tenth column and can be calculated as =IF(Lead Time ="","",Current Day Number+1+Lead Time). This is saying that if the entry in the Lead Time cell is nothing (nothing is ""), then return nothing; otherwise, return the sum of the current day, plus one, plus the lead time.

One more note about how lead time is modeled here: Orders are placed at the end of the day. If the lead time is one day and deterministic, then if an order is placed at the end of Day n, it is received at the beginning of Day 2. So, although a stockout cannot occur during that time interval, you still have a one day protection period as a result of the one day review interval. So, setting it up like this allows you to keep track of the number of days of the protection period. One caveat is based on what we discussed earlier: the option of setting up the discrete event simulation so that the review interval is longer than a day. If you were to do that, you would need to account for the additional protection interval in setting safety stock.

# Inventory Measurement

Average Inventory is the next column and is calculated by summing the beginning and ending inventory and dividing by 2. The eleventh column may seem esoteric to some degree and is labeled (min I/C) SS. The part in parentheses “min I/C” means minimum of inventory per replenishment cycle and “SS” means safety stock. This column allows for the calculation of historical safety stock, as discussed in Chapter 2, “Inventory Management Fundamentals.” The formula in Excel is

=IF(Beginning Inventory this Period > Beginning Inventory Last Period, Beginning Inventory Last Period,"")

In this discrete event simulation, replenishments are received at the beginning of the period, so, the minimum on hand inventory in a replenishment cycle is the beginning inventory.

The final column in the spreadsheet is Max I/C, which means the maximum inventory per cycle. For a pure continuous review (Q,ROP) inventory replenishment process the expected max I/C is safety stock plus the order quantity.

That is not what we are modeling here; we are modeling a periodic review (Q,ROP) process with lost sales (no back orders).

# Length of Simulation Run

One question that must be answered in setting up the discrete event simulation is how many days to simulate. In this example, we have simulated 365 days, but it is easy to change this in Excel. Many times the goal is to get to “steady state,” which means that the variance in the variable is to a level that is what it will continue to be at in the long run. However, you have to pick the variable to analyze. In this case, you could use, for example, average inventory. A discrete event simulation run has what is referred to as a “warm-up” period. There are statistical approaches to selecting the length of the run. Figure 5-1 illustrates the idea of steady state and the warm-up period.

![](images/4241a400e87736f87a4ea65490185c34583adbd9cd1017c7bd5369d9b5d21a15.jpg)  
Figure 5-1 Warm-up interval

In Figure 5-1, the vertical axis is average inventory over a day and the horizontal axis is time in days. As you can see, it takes about 50 days to get through the warmup period to steady state. Consequently, if you included the first 50 days in your metric calculations, such as average inventory over the year, it would skew the metric to be too high. As a result, when you are calculating your metrics, it is a good idea to set the calculations to begin after the warm-up period. In this example, the warm-up period is an artifact of how the beginning inventory was initialized.

# Number of Replications

The other question is how many times you should replicate the discrete event simulation. In Excel you can replicate a discrete event simulation multiple times

using the Table function. Before you run replications, you need to decide which performance metrics you want to collect. For example, you might want to collect fill rate, percentage of days in stock, average inventory, historical safety stock, and others. To calculate fill rate, sum the sales column and divide it by the sum of the demand column. To calculate the percentage of days in stock, you could use the COUNTIF function to count how many times ending inventory was positive and divide that by 365 (since 365 days are simulated). When you use the Table function in Excel, this is what you collect from the replications. In our example, we replicated it 500 times, using a Poisson demand of 2 units per day, a deterministic lead time of 2 days, a reorder point of 8, and an order quantity of 10. Averaging more than 500 replications we have a fill rate of 0.97, the system is in stock 94 percent of the time, average inventory is 7, and historical safety stock is 2. If we increase the Poisson demand to 4 units per day, the fill rate drops to 0.75, the system is in stock 62 percent of the time, average inventory is 3, and historical safety stock is almost 0. Now, if you increase Q from 10 to 20, fill rate increases to 0.86, the system is in stock 78 percent of the time, average inventory is 7.5, and historical safety stock is still almost 0. Now, suppose the lead time goes from 2 days to 3 days, then the fill rate decreases to 0.74, the system is in stock 67 percent of the time, average inventory is 6.4, and historical safety stock is even closer to 0. The point of this is just to give you an idea of the types of issues you can investigate with discrete event simulation.

# Execution Errors

Now, let’s take this same inventory process and assume it is at the store level. In this retail store, when an order is received it goes to the sales floor to be put on the shelf. If it doesn’t all fit, the rest of it goes to the backroom. Suppose you want to know how often orders received do not fit and must go to the backroom. You can simply add a couple of columns to collect this data. For example, to indicate when a replenishment will not fit on the shelf, you could use =IF(Beginning Inventory + Replen Received > Shelf_Cap,1,0). You could also calculate a new metric, the percentage of time replenishments do not fit on the shelf. You could also create another column to calculate how many units do not fit on average and the maximum overage. In our example, suppose the demand is Poisson and 2 units per day, lead time is deterministic and 2 days, ROP = 8, Q = 10, and Shelf Capacity = 15. Averaging more than 500 replications we have a fill rate of 0.97, the system is in stock 94 percent of the time, average inventory is 7, historical safety stock is 2, and the replenishment exceeds shelf capacity only 1 percent of the time. Suppose that the company has a policy of being in stock 99 percent of the time so the ROP is increased to 12. Averaging more than 500 replications we have a fill rate of 0.99, the system is in stock 99 percent of the time, average inventory is 10, historical safety stock is 6, and the replenishment exceeds shelf capacity only 22 percent of the time.

This gets to an important point: Discrete event simulations can ignore important costs or ignore problems that can arise when metrics change. Let’s take the previous example where the ROP went from 8 to 12 so as to increase the percentage of time in stock from 94 percent to 99 percent. It worked, but it caused the percentage of time replenishments that didn’t fit on the shelf to increase from 1 percent to 22 percent. One obvious problem is that this creates additional labor costs because the store associates have to go to the shelf and then to the backroom. This would be an easy cost metric to add to the analysis as long as we knew how much extra labor it costs every time a replenishment didn’t fit on the shelf.4 But this creates an additional problem, namely, product goes to the backroom more often. Product in the backroom is difficult to find, gets damaged, stolen, and lost. So, this increase in the amount of units going to the backroom may also reduce fill rate at the shelf. This could also be added but would require a study to determine the relationship between the level of backroom inventory and shelf fill rate.

Continuing with this example, suppose the demand now increased to 4 units per day. This results in the percentage of days in stock decreasing to 87 percent and the percentage of time replenishments that don’t fit on the shelf to 8 percent. Now, suppose we could reduce the lead time to one day. That would decrease the percentage of days in stock to 94 percent and the percentage of time replenishments that don’t fit on the shelf to 17 percent. That might surprise you. The reason is that the shorter lead time effectively increased the safety stock.

# Variations on the Model

The discrete event simulation model we developed in this chapter took the reorder point and reorder quantity as inputs. You could easily make the reorder point a function of a forecast. In the discrete event simulation spreadsheet you could create a new column titled Forecast for Next Period or Forecast for Lead Time Demand. You could create the forecasts using any of the techniques discussed in this book as well as others. You could then create a second column titled Error. This would be the forecast error, the difference between actual sales and the forecast in the previous period or lead time. The third column would be Absolute Error, where you would take the absolute value of the Error column (=ABS(Error)). You will need the Error column to calculate the standard deviation of the forecast error to go into the reorder point calculation. If you take the standard deviation of the Error column, that becomes the measure of uncertainty you will use in your reorder point calculation.5The forecast during the lead time will also be an input to the reorder point calculation, and because of this, you will need an additional column, Reorder Point. In our previous discrete event simulation, since the reorder point was constant over the discrete event simulation run, we did not need a column, just an input cell. However, with this model, the reorder point will be updated with new information. Setting it up to update every period is one option, but you can also set it up to update weekly or other intervals of time. In fact, you could use discrete

event simulation to determine the best updating policy for the reorder point. You could also use this to test different forecasting methods and parameters. The Absolute Error column could be used to calculate mean absolute deviation and mean absolute percent error.

Using this discrete event simulation spreadsheet you could test different types of inventory replenishment policies. As we have designed it, it does not use an order up to level method, but it could easily be adapted to use such a method: It could replace the reorder point method or be used in conjunction with it. You could keep the order quantity Q, and order in multiples of Q to bring the inventory position up to the order up to level, or you could drop Q and just order enough units to bring the inventory position up to the order up to level. This could be used to test the benefit of using break pack operations in the distribution center. That is, in the replenished node, instead of having the distribution center ship only multiples of case pack quantities, which are then used as Q, you could use individual units. Then you could compare the cost savings at that node and compare it to the additional labor cost at the distribution center to see whether it is cost justifiable. If this is a retail supply chain you could run it for an exemplary store and then multiply the savings by the number of stores. Or you could cluster the stores based on sales, running one simulation for each cluster, multiplying the savings by the number of stores in each cluster, and then adding the savings from all of the clusters. In addition to clustering by demand, you could also cluster by demand uncertainty, lead time, review interval, and other factors. At the extreme you could run a unique simulation for each store. It is probably wise to start with a good representative store and investigate whether the savings are even in the realm of possibilities for justification of the extra labor in the distribution center. If it is clearly unjustifiable, you will avoid wasting time running a lot of simulations that will not lead to anything substantial. On the other hand, it is possible that it is so easy to justify, that it is not worth a more detailed analysis. The more detailed analysis is called for in the situation where it is a close call on the cost benefit analysis.

# Calibration

It is a good idea to calibrate your simulation model. To calibrate your model, you attempt to model the existing process as closely as possible and then run the model, capture performance measures of the model, and compare them to the actual performance metrics from the inventory process. If they differ significantly, there are a number of aspects of the model to check, but one of the most important first checks is the inner workings of the spreadsheet model per se. You need to make sure there are not any calculation errors, which are easy to make. One tool in Excel that is useful for making sure that the calculations are referring to the correct cells is the Trace Precedents and Trace Dependents tool. If you put your cursor in a cell and then click Trace Precedents, it shows arrows emanating from the cells used by

the cell your cursor is in. If you put your cursor in a cell and then click Trace Dependents, it shows arrows emanating from that cell and pointing to the cells that use that number for calculations. It is tedious to go through the spreadsheet and carefully check for errors, but it is worth the investment of time and will keep you from making poor decisions based on erroneous analysis. For the part of the spreadsheet containing the simulation run, you only need to check the first cell that you copied down the spreadsheet, so you will have one cell per column. You then need to check the metric calculations based on this simulation run.

If the discrepancy is not a result of a calculation error, it is worthwhile revisiting the process documentation created from the questions at the beginning of this chapter. Perhaps promotions are not incorporated into the simulation or some other ongoing demand stimulating event. Perhaps there are more execution errors than you are aware of. Finding that the model varies from reality is common and can simply point to execution errors that are not being taken into account in the simulation model.

The metrics discussed in this chapter have not included cost metrics, but cost metrics should usually be included, such as inventory holding costs, labor costs, transportation costs, and so on. In addition, common measures such as inventory turns, days of supply, and similar metrics would be beneficial. It would be important to clearly understand which metrics are most important for the study to begin with, as we discussed at the beginning of the chapter.

Once you have made simple discrete event simulation models in Excel, you might want to consider more elaborate models, use more elaborate discrete event simulation tools such as Arena,6, 7 or have a discrete event simulation expert work with you. Your prototype helps you explain the specific details of the inventory replenishment process you are modeling. What you learned in this chapter should help you communicate about subtle, but important, nuances in the design and working of the process as well as how they are modeled. In addition, as anyone who has modeled a process with discrete event simulation knows, the effort to model the process improves your understanding of the process per se.

# ENDNOTES

1. An excellent discussion of this and other uses can be found in Ragsdale, C. T. Spreadsheet Modeling and Decision Analysis. Cincinnati, OH: South-Western, 1998.   
2. You don’t want negative demand.   
3. Integers.

4. This could be discovered with an industrial engineering study, specifically, a time motion study.   
5. The specifics of this calculation have already been discussed inChapter 3, “Inventory Control.”   
6. Rossetti, Manuel D. Discrete Event Simulation Modeling and Arena. New York: Wiley Publishing, 2009.   
7. Arena and other discrete event simulation tools can model other processes well beyond inventory processes. It can be used to model material handling, scheduling, routing, queues, and many other processes.

# 6. Additional Inventory Management Processes and Concepts

MULTI-ITEM INVENTORY MANAGEMENT

In Chapter 3, “Inventory Control,” we studied inventory models for a single item. It was important to start with a single item because it is difficult to understand multiitem inventory issues without understanding the single item issues. Let’s consider some of the reasons to understand multi-item inventory management decisions.

Consider a distribution center ordering 50 SKUs from a single supplier where each SKU is on a continuous review (Q,ROP) replenishment process. Hence, every time an SKU hits its ROP, an order is placed for that SKU and the SKU is delivered by a parcel carrier. Now, if that SKU is expensive and has a high inventory carrying cost factor, this process may be optimal because this process keeps inventory to a minimum for all of the SKUs. However, if it is an inexpensive SKU with a low inventory carrying cost factor, this process might result in too much being spent on transportation. So, instead of a (Q,ROP) model for all SKUs, the distribution center could use a (T,OUL) replenishment process for all of the SKUs, where all SKUs have the same T so that they could all be ordered together to reduce transportation costs. Suppose that T were set to one week and that the policy resulted in about two truckloads being ordered per week. Since ordering two truckloads per week has about the same transportation cost per year as ordering one truckload twice per week, it might make sense to set T to three days (assuming the distribution center does business six days per week), thus reducing the cycle stock of all the items by half and not increasing the annual transportation costs. But perhaps some of the 50 SKUs have minimum order quantities and the distribution center just don’t sell enough in three days to place an order twice per week. So, perhaps some items should be ordered weekly, others should be ordered every other week, and so on. Going back to the (Q,ROP) process, we could still have every SKU on its own (Q,ROP), but then when an item hits an ROP, we could hold its order until enough items had orders to fill a truckload. The problem with this is that it creates additional uncertainty in the lead time, which would need to be taken into account in setting the ROP. We could also use a (T,Q,ROP) process where every T periods of time, we order all of the SKUs that hit the ROP. But suppose this quantity was less than a truckload. In that case, we could just go with poor transportation utilization. But suppose that it was optimal to have full truckloads. We could then force orders of additional SKUs.1 To do so, we would need a process for determining which items to order next. For example, we could have a rule that says, order all SKUs that have hit their ROP, but if this does not fill a truck, then also order the item with the fewest days of supply. Continue with this process until the truck is filled.

Or we could calculate the expected number of units out of stock between replenishments for each SKU. Recall the loss integral fromChapter 3.

$$
\mathrm {U} (\mathrm {R O P}) = \int_ {x = R O P} ^ {\infty} (x - R O P) f (x) d x
$$

We could modify this to be

$$
\mathrm {U} (\mathrm {I}) = \int_ {x = I} ^ {\infty} (x - I) g (x) d x
$$

Where I is current on-hand inventory and g(x) is the probability density function of demand from the current time until the next review. U(I) is the expected number of units out of stock until the next review. We could then order the item with the highest U(I), and continue to ordering the SKU with the next highest U(I), and so on, until the truck is full. You can imagine other heuristics. Any method or heuristic you can imagine can be simulated and its performance evaluated. Many similar approaches have been proposed in the literature.2

Regardless of how the orders are coordinated, there might be a fixed amount of capital available for purchasing. The models we looked at inChapter 3 ignored the fact that there might be limited capital. For example, if a company uses a (T,OUL) replenishment process for all of the SKUs and the order quantity has a value of $50,000 and the company only has $20,000 available for purchasing, then the company can’t really implement the process. In this case, perhaps all of the SKUs could have their order quantities reduced by the same ratio such that the order is $20,000. Or, perhaps the most expensive items could have their purchases delayed. Or, perhaps the company could only order items with the lowest days of supply up until the $20,000 constraint is hit. Again, a number of processes could be used similar to the ones we discussed previously, but instead of trying to fill a truck, we are trying to stay within a budget constraint. In addition to budget constraints, there could also be physical space constraints. It is possible that the distribution center simply doesn’t have enough space for another truckload of product. When this happens opening another distribution center or expanding the current distribution center may be considered. Other options include ordering less than the amount recommended by the ordering process. So many idiosyncrasies are possible, it is a good idea to apply discrete event simulation since the method is so flexible.

It is possible that there are constraints requiring (1) filling the transport unit, (2) not exceeding the capacity of the facility, (3) capital available for purchases, and (4) inventory investment. In addition, there may be rules that are combinations of

periods of supply, service level, and cost. To implement these may require the use of optimization, and testing the rules may require discrete event simulation.

One could look at the literature on inventory management for multi-item situations, often referred to as coordinated item inventory management, and find a plethora of models. Unfortunately, many of them create unrealistic assumptions, making them difficult to apply. Discrete event simulation is a powerful tool for this type of decision.

# MULTI-ECHELON INVENTORY MANAGEMENT

An echelon is the level of a supply chain and all levels below it. For example, a collection of stores served by a collection of distribution centers is a two-echelon inventory system. Multi-echelon inventory management can be superior3 to single echelon inventory management but is often difficult to model.

Suppose there are 100 stores and one distribution center that serves those stores. For a given SKU, each of the stores and the distribution center can all use a continuous review (Q,ROP) replenishment process, for example, and each of them can be different. That is, the distribution center can take the orders from the stores as demand in setting Q and ROP. On the other hand, if the distribution center and the stores are all owned by the same retailer, it would seem reasonable for the distribution center to look at the demand each of the stores is experiencing rather than just using store orders as the demand signal. Suppose demand started increasing rapidly at all of the stores. It might take a while before stores place an order; then the distribution center might stockout. On the other hand, if the distribution center was monitoring the store level point-of-sale (POS), then it would purchase earlier or in a larger quantity to replenish its own inventory and satisfy store level demand. Since store orders have more noise than aggregate POS from the stores, the distribution center will hold excess safety stock than if it estimated demand uncertainty and magnitude from POS. In addition to taking into account the actual POS, it seems that the distribution center should also take into account not only how much inventory it has, but also how much inventory is in the distribution center echelon. The distribution center echelon inventory position includes all inventory at the distribution center, all units on order to the distribution center, all units in transit to the stores, and all inventory in the stores, less back-orders.

If stores have a lot of inventory compared to demand at the store level, perhaps the distribution center should not place an order even if it is relatively low on inventory. The point is that the inventory in the stores and distribution center could be managed centrally in which case it would be implementing a multiechelon inventory system. Sometimes it is better to manage centrally, and sometimes it is better to manage decentralized. Many variables go into the decision

beyond simple demand and supply characteristics and the structure of the replenishment process. Let’s consider the example of retail stores served by a distribution center owned by the same retailer. Mathematically it might be best to manage replenishment timing and quantity decisions centrally. For example, suppose 30 of 100 stores are out of stock of a particular SKU and that the distribution center is out as well. All 30 stores order this SKU from the distribution center as well as Store 31. However, Store 31 has plenty of inventory of the SKU and is ordering because the SKU is at its reorder point. Now the distribution center receives a shipment of the SKU that is enough to bring the 30 out of stock stores up to a days of supply that is less than the days of supply that Store 31 currently has on hand. In a centrally managed distribution center echelon, these 30 stores would probably get all of the inventory, but in a decentralized inventory replenishment system, the inventory the distribution center received might just be equally rationed over all the stores with outstanding orders. In this example it is easy to see the benefit of centralization of inventory replenishment. However, if corporate culture, competition, and management are taken into account, it might call this benefit into question.

Here is an example to illustrate this idea. Suppose a retailer has a decentralized inventory replenishment process where each store has its own automated replenishment system and the distribution center also has its own automated replenishment system. In other words, the distribution center’s automated replenishment system views the orders from the stores as demand and uses this to forecast demand for its replenishment system. The stores use POS to forecast demand, and the system automatically places orders on the distribution center when the store inventory position reaches the reorder point and it is at a point in time when the store can order from the distribution center. Department managers are allowed to override the system. If a department manager thinks the forecast is too low or too high, he or she can adjust the forecast. If the department manager thinks the service level setting is wrong, he or she can change it. These department managers can change any setting in the replenishment system or they can even force an order or prevent the system from ordering.

Now, at this hypothetical retailer, department managers within the stores served by the same distribution center compete against one another from different stores. Department managers in the 30 stores that are out of stock of the SKU in this example compete against one another on many different performance metrics. But the department manager at Store 31 also competes against them as well as the other department managers at the other stores served by this distribution center. In fact, once per month all of the department managers are on a conference call where they review each store’s in stock levels, inventory turns, average margin, and so on. Each month the top 10 percent of the department managers get a bonus and the top department manager gets a significant bonus. These department managers love this. In fact, over the years, competitive department managers have been

drawn to this particular retailer because they know they can make a lot of money and be promoted if they perform well. Department managers that are not competitive tend to go to other retailers. These department managers can’t wait until the monthly conference call. Game day! Even the ones who don’t win love it because they get to hear about what the other department managers are doing well, and it gives them a chance to improve their likelihood of winning in the future. These department managers appreciate the bonuses, but they also love the competitive atmosphere.

Now, suppose these managers are told that the company is moving to a centralized inventory management system and they will not be permitted to override the system. This will take away one point of competiveness from them. Forecasting won’t be something they will need to pay attention to any more. Even if they know something needs to be changed, they won’t be able to do so anymore. It is easy to see in this example that there might be a significant cost to centralizing the inventory decision-making. Even in this example it might be worth it if the centralized system is that much better, but it might not be as well. When changes to the inventory replenishment process potentially affect the culture of the company, care must be taken in making the changes. It is easy for outsiders, such as consultants, to see the decentralized approach as being archaic, and in many cases it is because there is no competitive situation such as the one described here. If a retailer has a lot of turnover and there is no such competitive culture, moving to a centralized system could be an easier choice. But if there is a lot of competition and inventory has a small impact on the profitability of the retailer, it might be good to keep the decentralized approach. This is something that can easily be overlooked but should be carefully weighed in the decision-making process.

One other important factor to consider is that many of the analytical models of multi-echelon replenishment systems make unrealistic assumptions that can dramatically impede their accuracy and effectiveness. Many of these systems make assumptions such as arborescence, which essentially means that you cannot have transshipments between stores. A transshipment between stores would mean that inventory is taken from one store and delivered to another. The mathematical assumptions in many of the inventory models do not allow for this possibility. Other unrealistic assumptions are often made to make the problem mathematically tractable.

We’re now going to describe a centralized heuristic described in Zipkin4 (2000) for which there are claims that it performs well. This heuristic fits the situation described earlier where you have one distribution center and a number of stores served by this distribution center with centralized inventory management. In this heuristic there is a difference between how much inventory to send to a collection of stores and how much to allocate to each store. In other words, you do not decide how much to allocate until after you have decided how much to ship to the stores in

aggregate. This heuristic assumes that each store is using a base stock level. A base stock level is similar to a periodic review system where each time a review is done, the inventory position is raised to OUL. It is assumed that each store has complete back-ordering as opposed to lost sales. That is, when shoppers encounter stockouts, they back-order and will come in to get their product when it becomes available. They will not just switch to another brand or size or go to another store.5 So, each store has its OUL set such that expected back-ordering costs plus inventory holding costs are equal across all stores. The distribution center finds its optimal OUL viewing orders from stores as demand and then places an order with the supplier. View all of the stores together as one entity and set the optimal OUL. Calculate the order based on this aggregate OUL and then allocate the order to the stores based on the OULs set by the stores. Many other heuristics have been developed. Pay careful attention to the assumptions that are made prior to application and be sure to test them thoroughly with discrete event simulation.

# No Fixed Ordering Costs

A store is replenished from a retailer owned distribution center once per week. A truck comes to the store every Wednesday and then returns to the distribution center. It is usually between 30 percent and 60 percent utilization but has never exceeded 65 percent utilization. A particular paper towel SKU is ordered every week such that its inventory position is brought back to the OUL. If no rolls of this paper towel have sold, then of course it is not put on the truck because its inventory position is at its OUL. The company will save no money if it isn’t put on the truck, and the company will spend no extra money if it is. The reason for this is that the distribution center has enough labor to handle a wide variety of number of SKUs ordered, and the store has plenty of labor to handle receiving and put away. This retailer puts a premium on in store shopper service, so it has plenty of labor. When the truck arrives from the distribution center on Wednesday mornings, there are few shoppers because most of the shopping occurs on the weekend, and Wednesdays are the slowest day of the week and mornings are the slowest part of the day for Wednesdays. The retailer has a policy to have the same amount of labor every day of the week. All this simply means there is no fixed ordering cost associated with placing an order for this SKU of paper towels. In Chapter 3 we assumed there was a fixed ordering cost associated with orders. These ordering costs included incremental transportation costs, which we do not have in this example because the truck is coming to the store anyway; incremental labor costs, which we do not have in this example because the replenishment system orders automatically and the labor will be in the distribution center and store whether or not we order; incremental costs associated with invoice match errors, which we do not have here because it is being ordered internally, not from an external vendor. Is it possible that there is some incremental ordering-related cost? Yes, but it is negligible and has no material impact in this example. It turns out that in this situation an optimal policy structure exists. The optimal policy is to bring the

inventory position up to the OUL each time an order is placed. The economic order quantity model does not make sense here because there are no fixed ordering costs and the economic order quantity balances the fixed ordering costs against the inventory holding costs.

So, in this situation with a fixed review interval and no fixed ordering costs the optimal replenishment process is for this SKU to be ordered up to the OUL each time it is ordered. But the question remains, what is the optimal OUL? It turns out that the optimal OUL depends on the optimal service level. The optimal service level is estimated by the ratio of the cost of being out of stock per unit and the sum of the cost of being out of stock and the cost of holding a unit of inventory. We already defined m to be the cost of a unit out of stock and h as the inventory holding cost factor, but h was defined on an annualized basis, whereas now it is defined as the cost of having a unit in stock at the end of the replenishment cycle. So the optimal service level is given by

$$
S L ^ {*} = F \left(O U L ^ {*}\right) = \frac {m}{m + h c}
$$

Where F is the cumulative distribution function of the demand during the protection interval. If OUL* is not an integer, then you round up. This approach works whether a continuous or discrete probability distribution is used.

# THE NEWSVENDOR MODEL

Joe sells newspapers on the corner of 10th and Grand. He pays $1.50 for each newspaper and sells them for $4.00 each. If he doesn’t buy enough, he loses sales and that costs him $4.00–$1.50=$2.50 in profit for every sale he loses, which in this case is m. On the other hand, if he buys too many, they go bad at the end of the day because people don’t want to buy day old newspapers the next day, and he loses his $1.50, which is v. So the optimal service level is

$$
S L ^ {\star} = F \left(O U L ^ {\star}\right) = \frac {m}{m + v} = \frac {\mathbb {S} 2 . 5 0}{\mathbb {S} 2 . 5 0 + \mathbb {S} 1 . 5 0} = 0. 6 2 5
$$

The horizontal axis of Figure 6-1 is the market price the newsvendor can sell the newspapers for, and the vertical axis is the optimal service level. You can see that the line crosses the optimal service level of 0.5 at a price of $3 per newspaper because at that price the cost of being over and the cost of being under are equal. Notice that the marginal benefit of a higher market price has diminishing returns in terms of the optimal service level. In fact, the optimal service level does not hit 0.90 in this example until the price is $15 per newspaper. At that price, the profit is

$13.50 per newspaper, and the cost of having too many is still $1.50 per newspaper. Even at a market price of $100 per newspaper, the optimal service level is 0.985.

![](images/a3f4bd61e1cda5a11b9dfe3aa4bf6794b14ccbc11152d1c2d10da8b7820b2973.jpg)  
Figure 6-1 Optimal service level for the newsvendor

The OUL* depends on the distribution of demand. In this example suppose that the demand is normally distributed with a mean of 50 newspapers per day and a standard deviation of 10 newspapers per day. Then OUL* is found from the inverse of the normal distribution.

$$
= N O R M I N V (0. 6 2 5, 5 0, 1 0) \approx 5 3
$$

So, it would be optimal to order 53 newspapers.

For this example, Figure 6-2 shows different levels of ordering for different costs v.

![](images/c9daae39ed5f890b86b4995fafb6e673a69eadc3bb3d470530299821d0ac8019.jpg)

Figure 6-2 Optimal orders for the newsvendor

In Figure 6-2, the horizontal axis is the cost to the newsvendor per newspaper, v, and the vertical axis is the optimal order quantity, OUL*. At a cost of $2 per newspaper, the cost of having too many and the cost of having too few, per unit, is equal so the OUL* is 50 units, the mean of the demand distribution. As the cost gets extremely low, say between 0.1 and 0.4, you can see that the line becomes more noticeably nonlinear, and the benefit of selling one more unit becomes relatively high, making it worthwhile to buy even more newspapers.

Instead of using a normal distribution, you could also use a discrete empirical distribution. One challenge with that is if you ever ran out of newspapers early, you wouldn’t know what demand was that day; you would only know what demand was when you had enough newspapers. Of course, that would be true even for the normal distribution because your sample mean and standard deviation would not include the demand that exceeded the newspapers you had available.

# CENSORED DISTRIBUTIONS

Let’s suppose that the newsvendor on 10th and Grand always buys 53 newspapers and on average has sold 50 newspapers, but has sold all of his newspapers 45 percent of the time. The actual mean of the demand distribution is probably higher than 50 because we were never able to observe more than 53 newspapers being sold. This is known as acensored distribution, and it is possible, with information on the average sales, percentage of time we sold all of the papers, and the maximum number of papers available each day, to estimate the mean and standard deviation of demand, assuming it is a normal distribution. To do so we solve two equations:6

$$
\bar {X} = Q \left(1 - F _ {s} (z)\right) + \left(\mu + \sigma \frac {- f _ {s} (z)}{F _ {s} (z)}\right) F _ {s} (z)
$$

and

$$
z = \frac {Q - \mu}{\sigma}
$$

= average sales

Q = number of newspapers available each day

Fs(z) = cumulative standard normal distribution at z standard deviations above the mean

fs(z) = standard normal density function at z standard deviations above the mean

μ = mean of the uncensored demand distribution

σ = standard deviation of the uncensored demand distribution

In this case, since we sold all of the newspapers 45 percent of the time, it means that we didn’t sell them all 1–45 percent or 55 percent of the time.

Consequently, $F _ { s } \left( z \right) = 0 . 5 5$ . Now, we can find z by taking the inverse of the standard normal cumulative distribution at 0.55, $z = F _ { s } ^ { - 1 } \left( 0 . 5 5 \right) = 0 . 1 2 5$ . So in this example,

$\overline { { X } } = 5 0$ newspapers per day

Q = 53 newspapers per day

$$
F _ {s} (z) = 0. 5 5
$$

$$
f _ {\mathrm {s}} (z) = 0. 3 9 6
$$

To get the value of the standard normal probability density function in Excel, fs(z) use NORMINV(z, 0, 1, FALSE). The last argument, FALSE, tells us that we want the value of the density function, not the cumulative distribution.

Substituting all of this into the previous equations, we have

$$
5 0 = 5 3 ^ {*} (1 - 0. 5 5) + \left(\mu + \sigma \frac {- 0 . 3 9 6}{0 . 5 5}\right) ^ {*} 0. 5 5
$$

and

$$
0. 1 2 5 = \frac {5 3 - \mu}{\sigma}
$$

So, we have two equations and two unknowns so we can solve for the mean and standard deviation of the uncensored normal distribution of demand. In this example, solving the two equations, we find $\mu = 5 2 , \sigma = 6$ . Recall, earlier we found that the optimal service level was 0.625, so to find the optimal OUL* we have

$$
= N O R M I N V (0. 6 2 5, 5 2, 6) \approx 5 4)
$$

Although the newsvendor has been buying 53 newspapers per day, he should be buying 54 newspapers per day. That is a small difference. Using all of the same

numbers except suppose that he was selling out 75 percent of the time, then in that case the $\mathrm { O U L ^ { * } } = 7 3$ , which is a significant difference from 53. This points out the potential sensitivity to the percentage of time he is selling out. In this case, the mean of the uncensored distribution is 67 newspapers per day.

This uncensoring can work in other situations as well. Let’s consider one other example. Suppose Joe owns a vending machine and he replenishes it once per week. Suppose he analyzes one particular candy bar in the vending machine. In this case, since Joe sold all of the candy bars 49 percent of the time, it means that he didn’t sell them all 1–49 percent or 51 percent of the time. Consequently, $F _ { s } \left( z \right) =$ 0.51. Now, we can find z by taking the inverse of the standard normal cumulative distribution at 0.51, $z = F _ { s } ^ { - 1 } \left( 0 . 5 1 \right) = 0 . 0 2 5$ . Suppose Joe sells an average of 20 candy bars per day and each slot holds 25 candy bars. Suppose this candy bar only has one slot. So in this example,

= 20 candy bars per week

Q = 25 candy bars per week

$$
F _ {s} (z) = 0. 5 1
$$

$$
f _ {s} (z) = 0. 3 9 9
$$

Solving the two equations and two unknowns we find $\mu = 2 5 , \sigma = 1 2$ . Suppose the building Joe has the vending machine in requires a 0.98 in stock level; then NORMINV(0.98,25,12) returns a value of 50. This means that to reach the in stock level requirement, Joe needs to allocate two slots to this candy bar. Achieving this required in stock level could potentially result in an assortment reduction. Prior to such decisions it would make sense to determine the mean and standard deviation of the uncensored demand distribution.

The newsvendor model can also be useful in fashion apparel because in many situations, a garment in the fashion apparel industry is purchased by a department store or boutique only one time. The buyer or merchant designs the garment, such as a new women’s dress and makes a decision regarding how many to purchase. Using the newsvendor model in this situation is not obvious because there is no historical data so the question is: How do you find the mean and standard deviation of the demand? One method that has been used in the industry7 is to use a panel of subject matter experts such as buyers, salespeople, and others, to estimate the level of demand. The average that they come up with is used as the estimate of the mean, and the standard deviation of their estimates is used as the estimate of the level of uncertainty of demand. Then the newsvendor model is applied.

# ABC INVENTORY CLASSIFICATION

The classification of SKUs for the purposes of inventory management is often referred to as ABC inventory classification. ABC classification is based on the 80/20 rule that 80 percent of the revenue is from 20 percent of the products, or 80 percent of the profit is from 20 percent of the SKUs, or 80 percent of the inventory is from 20 percent of the items in inventory. Whatever it is applied to, it is often found to be fallacious or inaccurate in practice. The purpose is to classify SKUs so all of the SKUs do not have to be treated equally. Some SKUs require careful inventory management, using a continuous review system, and some less important SKUs require less careful inventory management so they can be reviewed periodically. That line of reasoning is passé today; however, such classifications are still desired, but for other reasons, such as the need to set different service levels or fill rates for SKUs. The idea is that we shouldn’t set all service levels to the same fill rates since they have different stockout costs, but that begs the question as to why only three different levels? Why not just the optimal level for each SKU? Perhaps ABC classification is an artifact of days without computers or days where memory was expensive or processing was slow. The other purpose of ABC classification is to determine which SKUs should receive the most attention in terms of managing their lead times and making sure the product is delivered on time. It has also been used as a method to determine where to begin process improvement initiatives. For example, suppose there are business process execution errors in a number of SKUs at various points in the supply chain. The question becomes one of where to focus in terms of process improvement initiatives and so ABC classification helps to answer that question: Start with the A items since they drive most of the problems or have the most benefit from improving, or some similar reason.

# MATERIAL REQUIREMENTS PLANNING

Up to this point in the book we have focused on independent demand items, items whose demand comes directly from users, shoppers, or consumers. There are also items whose demand is derived from the demand for end items. For example, if a factory makes chairs, there is demand for the arms of the chairs, but that demand is derived from the demand for the chairs. Material requirements planning8 or MRP is used to manage the demand and inventory for items with derived demand. The three key components of MRP are the master production schedule (MPS), inventory status file (ISF), and the bill of materials (BOM). The MPS is a timephased plan of when an end product must be available for sale or shipment; the ISF is a listing of the components, their lead times, order quantities, suppliers, on-hand inventory, on order inventory, and other information; and the BOM is a recipe for the final product in the MPS. For example, a BOM would say that for each chair you need two arms and for each arm you need six screws and so on. MRP takes the

MPS, ISF, and BOM and creates a time-phased plan for producing or ordering parts, components, subassemblies, and assemblies that go into making the final product in the MPS.

An MPS has time buckets, which are the intervals of time used in planning, such as a week. If an MPS said that in Week 4 100 chairs must be produced, then the ISF would be checked for on-hand inventory that will be available in Week 4. If no chairs will be available in Week 4, then they must be produced for Week 4. From the BOM, the system would know that two arms are needed for each chair, so for Week 4, two arms must be available for assembly of each chair. That would mean that we would need a total of 200 arms. Since there are 6 screws for each arm, it would indicate that 6 × 200 or 1,200 screws must be available. This process is referred to as a BOM explosion. In addition, if the 200 arms need to be available one week in advance and the screws need to be available one week prior to that, then MRP would take that into account and create a plan for ordering the screws. It would do all of this taking into account any on-hand inventory. In this example, if the calculations showed that 400 screws would already be on hand, then MRP would only order 1,200 – 400 = 800 screws, but it would order then based on the lead time in the ISF.

There are many different lot-sizing methods in MRP, including lot-for-lot (L4L), fixed order quantity (FOQ), periodic order quantity (POQ), and more. L4L is reminiscent of just-in-time (JIT) in the sense that you only order the amount demanded. With FOQ you order some fixed amount every time your order, and with POQ you might order, for example, once every four weeks but when you order, you order up to some amount. L4L minimizes inventory but maximizes fixed ordering-related costs. With FOQ and POQ you can attempt to balance and therefore minimize the total costs. When demands are uneven, it is more difficult to minimize costs with FOQ and POQ, so part period balancing (PPB) is used, where time buckets are accumulated such that inventory costs and ordering costs are balanced.

If the MPS is changed, it has a ripple effect through all of the MRP plans for each part, component, subassembly, and assembly. It is possible that these changes could affect orders or job releases that have already been authorized based on the previous MPS. For this reason, some MPSs have a time fence. The time fence is the period of time over which an MPS cannot be changed, and that part of the schedule is referred to as afrozen schedule. Within the MPS, some of the demand is based on a forecast, and some of it is based on firm planned orders. Firm planned orders are orders that have already been received from customers. One other issue that must be addressed with MRP is the time horizon—that is, how far into the future do you want to plan? The farther into the future you plan, the more uncertain the plans.

MRP can give the impression of a lot of certainty and stability with all of the structured planning. The alternative would be to used something like a (Q,ROP) model or a (T,OUL) model or some hybrid. But why use one of those when you can just use the demand for the end product and plan backward? If it is true that the demand for the end product is fixed, which might be the result of a contractual agreement with a customer, it would clearly be better than using a traditional independent demand inventory management process. However, keep in mind that not all of the plans are fixed, and it is possible that in some cases all of the MPS is based on a forecast and forecasts change. When you have new information you want to include that in the MPS; however, doing so changes all of the MRP plans for items in the BOM. On the other hand, you can use a forecast you know is not right just to keep the MRP plans steady. Change and uncertain forecasts are not the only sources of instability in MRP plans that could lead a company to use a traditional independent demand replenishment model; lead time is too. The longer the lead time for items used in manufacturing and the more levels in the BOM, the more the MRP plans are built on uncertain forecasts. For example, if a subassembly below the final product has a lead time of five weeks and the item below it has a lead time of five weeks and the item below it has a lead time of five weeks, and continuing until we get to an item with a total of 25 weeks below the top level item (finished product) of the BOM, then the MRP plans based on the forecast in the MPS are most likely highly uncertain. If these items are used in many different end products, then perhaps the low level components in bottom level of the BOM should be treated as facing independent demand.

Another source of error that can be encountered in MRP is that there may be engineering changes resulting in changes in the BOM, while the BOM is not changed. For example, suppose instead of using screws for the arms of the chair, glue should be used based on an engineering change order. The glue may be introduced to the assembly floor and the assembly associates even trained in how to use the glue instead of screws, but the BOM might not be changed. This could result in screws continuing to be ordered unnecessarily. On the other hand, the engineering change order may have called for seven screws instead of six. In that case, if the change was not entered into the BOM, eventually there would be stockouts of screws. In general, information in the MRP system must be updated and accurate, and this is a major challenge in any inventory or planning system. Suppose a batch of screws are purchased that are too brittle, and they break periodically. If this is not entered into the ISF, there eventually will be stockouts of screws.

# DISTRIBUTION REQUIREMENTS PLANNING

MRP is often referred to as a method of time-phased planning. Another method of time-phased planning that uses a similar logic in a different situation is distribution requirements planning (DRP). Imagine a factory serving ten

regional distribution centers. The factory’s demand can be viewed as derived demand from the independent demand the distribution centers face. That is, if we knew the demand of the distribution centers, we could then calculate the demand on the factory. The structure of the distribution network is like an upside down BOM. In the BOM, a single item faces independent demand while many items have calculated dependent demand, whereas in DRP many distribution centers face independent demand while a few items face calculated dependent demand. DRP’s logic is similar to MRP’s, including using something similar to an MPS for end demand faced by the distribution centers and then applying on-hand inventory and lead times from the factory to the distribution centers, and then making the calculations of the time-phased demands on the factory. These time-phased demands on the factory can then become inputs to the MPS in the factory’s MRP system.

# AGGREGATE INVENTORY CONTROL: INVENTORY THROUGHPUT FUNCTIONS

Inventory must also be managed in aggregate, as we discussed in the multi-item inventory management section earlier in this chapter. In the multi-item inventory management discussion we examined issues associated with inventory investment constraints and space constraints, but there are also other issues associated with aggregate inventory management, such as the need to compare the inventory management performance of various distribution centers or retail stores or even items. There is also the need to estimate how much inventory will be held in a location if sales increase or how much inventory will be required in a new distribution center. We discuss a method to address this referred to as the Inventory Throughput Functions (ITFs). The ITF method also allows for comparison of different distribution centers. The problem is that if one distribution center has a throughput of 1,000,000 units per year and another has a throughput of 100,000 units per year, it is difficult to compare them because we would expect them to have different levels of inventory and there should not be a linear relationship. In this example, just because one distribution center has ten times the throughput of another distribution center does not mean that it should have ten times the amount of inventory; we would expect less than ten times the inventory.

Inventory9 and sales or throughput can be modeled empirically using regression. Let S = Sales, and I = Inventory. You can estimate the functional form of an ITF I = αSθ by taking the natural log of both sides of the equation to get $l n I = I n a + \theta l n S .$ . Then use ordinary least squares (OLS) regression to estimate $l n I = \beta _ { \mathrm { o } } + \beta _ { \mathrm { { l } } } l n S + \in$ where expon $\in$ is the rantiation of m error, that is nce the ITF is estimated, you can find α; and find directly from the estimate of ${ \widehat { \beta } } _ { 0 } .$ $\alpha = e ^ { \widehat { \beta _ { 0 } } } ;$ $\widehat { \beta } _ { 1 }$ that is $\theta = widehat { \beta } _ { 1 }$ . In $I = \alpha S ^ { \theta }$ , α can be thought of as the scale parameter, and θ can be

thought of as the shape parameter. The most important parameter is the shape parameter, θ, because it describes how efficiently inventory is used in supporting sales.

Figure $\underline { { 6 { - } 3 } }$ shows inventory on the vertical axis and sales on the horizontal axis with the functional form of the ITF as $I = a S ^ { \theta }$ where $\mathrm { ~ a ~ } = . 5$ for three different values of $\theta \in \{ \{ 0 . 5 , 1 . 0 , 2 . 0 \} $ . For a given level of the shape parameter, we see that the scale parameter magnifies the amount of inventory.

![](images/2883b90d0b1cb4c5f8ae6b22b4d564cd7d474b4655bfe2bed964d46e5d148f11.jpg)  
Figure 6-3 Inventory as a function of sales

Figure $6 { - } 4$ shows inventory on the vertical axis and sales on the horizontal axis with the functional form of the ITF as $I = a S ^ { \theta }$ where $\theta = . 5$ for three different values of $\mathfrak { a } \in \{ 0 . 6 , 1 . 0 , 1 . 4 \}$ .

![](images/9a8837243480015770b7b38a6c32b664cee18727ea5d026fd10f99ca44f572ae.jpg)  
Figure ${ \bf 6 - 4 }$ Effect of the shape parameter

For a given level of the scale parameter, we see that the shape parameter changes the nature of the relationship between sales and inventory. If a firm used the EOQ, the shape parameter would be 0.5.

$$
Q = \sqrt {\frac {2 D S}{h c}}
$$

Which is the same as

$$
Q = \left(\frac {2 D S}{h c}\right) ^ {0. 5}
$$

Taking the natural log of both sides we have

$$
\ln Q = \ln \left(\frac {2 S}{h c}\right) ^ {0. 5} + \ln (D) ^ {0. 5}
$$

$$
\ln Q = \ln \left(\frac {2 S}{h c}\right) ^ {0. 5} + 0. 5 * \ln D
$$

So, if a firm used the EOQ, the scale parameter would be $\left( \frac { 2 S } { h c } \right) ^ { 0 . 5 }$ 0.5 and the shape parameter would be 0.5.

Figure 6-5 shows an estimate of an ITF $I = a S ^ { \theta }$ where the scale parameter was found to be 2.0 and the shape parameter was found to be 0.5. Again, inventory is on the vertical axis and sales is on the horizontal axis.

![](images/59fc3d9c4af19baa99b4587a339de5148c404816024c8f736ad9d36e1c69c387.jpg)  
Figure 6-5 Estimate of the inventory throughput function

We see that most of them fall relatively close to the estimated curve, but some fall significantly above or below. If they are significantly below, it is possible that they are just managing their inventory extremely efficiently; however, it is probably worth investigating their fill rate, because they might be experiencing a lot of out of stocks. On the other hand, if they are significantly above, they might be managing very poorly; however, it is probably worth investigating their lead times and other factors that might affect the amount of inventory they carry. Although our discussion here focuses on the level of analysis at the inventory holding location, this type of analysis can also be done at the firm level.10 Using this method at a firm level can allow a company to benchmark itself against its competitors and aspirant companies. It can serve as a method of monitoring performance over time as well. Up to this point we have talked about using this method in aggregate for inventory holding locations such as distribution centers and at the firm level, but it can also be applied at the SKU level. That is, within a distribution center it can be applied to a number of different SKUs or subsets of SKUs to benchmark performance. In addition it can be applied to a single SKU across distribution centers. Finally, it can also be used at the store and factory level as well.

We have discussed ITFs from the perspective of benchmarking, but it can also be used for other purposes, such as estimating the amount of inventory requirements in a new location. For example, suppose a distribution center is at capacity, and hence a new one is being planned. The new distribution center will serve markets from several distribution centers that are near capacity. Using an ITF you could estimate the inventory investment required in the new distribution center as well as the reduction in inventory investment at the existing distribution centers that will have reduced market coverage.

The inputs and outputs to an ITF can be units of currency or units of inventory. For example, suppose the following ITF were estimated with dollars:

$$
I = 6 S _ {7}
$$

Then for sales of $100,000, it would estimate the inventory requirement to be about $19,000. Such estimates are important for cash flow management. They can also be helpful when trying to get buy-in on new inventory management approaches, new forecasting methods, new network designs, and other changes to the supply chain network. On the other hand, suppose the following ITF were estimated in tons:

$$
I = 1 8 S ^ {8}
$$

Then for 500,000 tons, it would estimate the inventory requirement to be about 1.3 million tons. Such estimates can be useful for space management decisions as well as facility design decisions.

One caution regarding the use of ITFs has to do with the range of estimate. If an IFT were estimated on outputs from, say, $50,000 to $1,000,000, it should not be considered reliable to make estimates outside that range. Even if you are using an ITF to make estimates within the range for which the ITF was estimated, you still need to be concerned with accuracy. One quick and easy approach is to look at the R-square from the regression output. R-square is the percentage of variation in the dependent variable that is explained by the model. Another approach is to use the forecasting error metrics discussed inChapter 4, “The Link Between Inventory Management and Forecasting,” such as bias, MAD, and MAPE.

One nice feature of the ITF is the interpretation of the shape coefficient—namely, for a 1 percent increase in sales, there is estimated to be a θ percent increase in inventory.11 For example, if a firm used the EOQ, a 1 percent increase in sales would result in a 0.5 percent increase in inventory since θ = 0.5 in the EOQ model.

Other variables such as lead time can also be included with the following model:

$$
\ln I = \beta_ {0} + \beta_ {1} \ln S + \beta_ {2} \text {L e a d T i m e}
$$

Such a model would allow you to explain difference in inventory more accurately, not entirely relying on sales volume to explain the changes in inventory. We could go even further and include other variables such as number of SKUs in the distribution center NSKU, number of stores served NSTORES, and other variables.

$$
\ln I = \beta_ {0} + \beta_ {1} \ln S + \beta_ {2} \text {L e a d T i m e} + \beta_ {3} \text {N S K U} + \beta_ {4} \text {N S T O R E S}
$$

The point of this is to account for as many of the drivers of inventory as possible so that what is left is a difference in how well inventory is being managed. Such an approach works well internally, but if it is being used to benchmark against other firms, many of the other input variables might not be available.

Another benefit to this expanded approach to ITF estimation is that it can be used to test hypotheses that might be important in decision-making. For example, perhaps there is a hypothesis that if the company could reduce the number of SKUs held by a given distribution center, it could reduce total inventory requirements in the company. The company might be considering going to more specialized distribution centers with longer lead times and fewer SKUs per distribution center. For such a significant change it would be worth not only checking R-square, bias, MAD, and MAPE, but also checking other metrics and assumptions. At the very least you should check the F-test to make sure the model is statistically significant and the p-values of each of the coefficients you will be using. In this example, you would want to be sure the coefficient estimates for LeadTime and NSKU were statistically significant. If such a coefficient is not significant, you might want to check for multicollinearity. Multicollinearity is a problem in regression where two or more independent variables are highly correlated. Continuing with this example, if it were the case that for distribution centers that had higher SKU variety, they had higher lead times, then it is possible that we could end up with multicollinearity, and it might make one of the variables fail the statistical significance test. Even for benchmarking purposes it is a good idea to check the assumptions of regression. For example, if there is heteroscedasticity, it will create difficulty in comparing observations at different levels of inventory. Recall that homoscedasticity is an assumption of regression that means the variance of the residuals is constant for various levels of the dependent variable.

Figure 6-6 is a scatter plot of annual U.S. retail sales and inventory, excluding automotive from 1992 to 2011 based on data from the United States Census Bureau.

![](images/a4ef54d03a5108b4dbd47c292b3ef738b36e9f94ed363befba2b5af209bbce14.jpg)  
Figure 6-6 U.S. retail sales and inventory

The vertical axis in Figure 6-6 is inventory in millions of dollars, and the horizontal axis is sales in millions of dollars. An ITF was estimated for the retail sector of the economy and was found to be

$$
I = 1 7. 9 S ^ {0. 6 5}
$$

Based on the F-test, the model is significant at the <0.001 level, and the R-square is 0.98, meaning that about 98 percent of the variance in inventory is explained by sales. The retail industry as a whole seems to be relatively efficient at managing inventory, as can be seen from the estimated shape factor of 0.65. We can speculate as to why it seems the retail sector is efficient at managing inventory. Perhaps it is due to the fierce competition in the industry, including the emergence of ecommerce during the past two decades, as well as improved decision support technology for forecasting and inventory management.

# STORAGE OF INVENTORY

The storage of inventory within a facility is often a topic in material handling and warehousing books, but not typically a focus of inventory management books. However, we briefly look at this topic, particularly from the perspective of inventory management, and less from the perspective of material handling and warehousing. In a factory, the idea of storing inventory, especially raw material inventory, components, subassemblies, and assemblies, at point of use makes sense in terms of production lead time minimization and also errors in using the wrong parts and damage. If parts inventory is held centrally within a factory, every time a part is needed for production the worker or robot has to leave the workstation to

retrieve it, or there is labor dedicated to keeping workstations in stock. Sometimes this is necessary when parts are used in common among many different workstations within the factory. If inventory comes into a factory and is stored in a central location and then retrieved for a workstation when needed, there is an additional “touch” in comparison to storing the inventory at the workstation that will need it for production. The number of times inventory is touched is often correlated with shrink, damage, and labor.

Within a warehouse, keeping inventory in a fixed location minimizes errors in terms of put away and picking. However, it does not minimize the amount of space required for inventory storage. The alternative to fixed location storage is random location storage. In this approach, when space is available, it is used for the inventory. In a retail store, backroom space is expensive and therefore, most of the storage in retail backrooms is based on the random location strategy. This makes it difficult to find specific SKUs in retail backrooms because there are typically so many different SKUs in a retail store, and many times these SKUs are rotating, new products are introduced, and some SKUs are discontinued. Storage of inventory in retail backrooms is one of the most difficult inventory storage management problems in the industry.

Inventory storage decisions and management effectiveness affect inventory holding costs because a component of the inventory holding cost factor is storage space costs, shrinkage, and damage, to name a few. In turn, the inventory holding cost factor affects the optimal level of inventory to hold, which affects the optimal order quantity and/or the optimal order up to level. Similarly, inventory management process decisions affect inventory storage decisions. For example, if safety stock increases in retail stores without increasing shelf capacity for a given SKU, it is possible that the additional inventory will need to be stored in the backroom of the retail store. Within a retail store, you will not only see inventory stored in the backroom but sometimes on the top of the gondolas. Sometimes you will notice that inventory stored on the top of the gondolas doesn’t even correspond to the inventory on the shelf below. This seems to happen often in retail wholesale clubs.

# INVENTORY RECORD MANAGEMENT

Inventory records are a salient part of any inventory management system. For automated inventory systems, there exist perpetual inventory systems. A perpetual inventory system keeps track of on-hand inventory using point of sale (POS) information and bar code scans as inventory is received. Every time a case or pallet of product is received, it is scanned and the perpetual inventory system increases by the number of units in the case or on the pallet. Every time a unit is purchased or shipped, the perpetual inventory system is reduced by that amount.

If inventory records are inaccurate12 and if the firm uses a (Q,ROP) inventory replenishment process, it will not order at the correct time. If the firm uses a (T,OUL) process, it will not order the correct quantity. If inventory records are off in the negative direction, it will cause excess inventory. If inventory records are off in the positive direction, there will be stockouts. Some products tend to have inventory records off consistently in the positive direction. For example, in retail stores small expensive items tend to be stolen more often. When they are stolen, the inventory records tend to suggest the retail store has more inventory than it actually does. For these items there is a positive bias in the inventory records. For items that have high return rates, sometimes those returns are not recorded properly and the retail store winds up with more inventory than the inventory records suggest, creating a negative bias in inventory records. For other items, the inventory records are unbiased but may still have many errors over time.

Error can enter the inventory record system in many ways, two of which have already been mentioned: namely, theft and returns that are misreported or not reported. Here is a list of possible ways errors can enter the inventory record system: theft, damage, failure to record upon receiving, misplaced inventory, mislabeled SKUs, and many others. In addition, for automated perpetual inventory systems, the error can enter the inventory record system through the point of sale system (POS). For example, if a shopper puts 2 cans of chicken noodle soup on the check stand along with 3 cans of bean and bacon soup, 2 cans of clam chowder soup, 5 cans of creamy mushroom soup, 1 can of tomato soup, and 17 cans of split pea soup, and the cashier scans a can of chicken noodle soup and then hits “× 30,” the chicken noodle soup inventory record will be much lower than it actually is, and the other cans of soup will have inventory records that are too high.

Another way error can enter the perpetual inventory system is through errors in the item file data. For example, suppose the item file says that there are 24 units per case, but the manufacturer changed the case pack quantity to 12. Then each time a case is received, it will appear as though the on-hand inventory has increased by 24 units when it has actually only increased by 12 units. This type of problem, as well as any positive bias in the inventory records, can lead to phantom inventory. Phantom inventory exists when the inventory records suggest an amount of inventory on hand that is above the reorder point. When phantom inventory exists, the automated inventory system will not placeorders for the product even when the product runs out. This leads to stockouts that persist until the error is corrected.

One would think that with current information technology all issues associated with accurate inventory records have been addressed. This is definitely not the case. Inventory record inaccuracy is still a major problem in industry, particularly in the retail industry. Given the level of the problem, what can be done? On the extreme, wall-to-wall inventory audits are possible. This is where all of the inventory is counted. Imagine a superstore that has both groceries and general

merchandise. There may be as many as 150,000 SKUs in 200,000 square feet. Think of how many man-hours that would take and how much that would cost. For a retailer, how many times could it afford that per year per store? It would take an army of people to do it on a regular basis for all stores. Cycle counts are an alternative to wall-to-wall audits. With cycle counts only small sets of items are counted. In a retail setting some SKUs may only sell once every few weeks. In those situations it doesn’t make sense to count them very often. But for high value and or high volume SKUs, especially those that consistently have problems, it might make more sense to take a physical inventory more often. Similarly, random samples of SKUs can have cycle counts taken. Similarly, if some items have not sold for too long, possibly as a result of phantom inventory, then cycle counts can be taken of those SKUs.

# IMPLEMENTATION CHALLENGES AND CHALLENGING THE INCUMBENT PROCESS

It is not unusual to encounter situations that do not neatly fit into the topics we have discussed, including the replenishment processes and other topics. However understanding these topics is crucial in being able to understand more complex processes because in many situations one of the models does work for estimation purposes even though it doesn’t appear to fit on the surface. Let’s look at an example.

A distribution center (DC) orders a large number of products from a supplier’s factories. Every week, the DC reviews the inventory position (IP) of each product. The review starts with products that are out of stock or very low in IP. If the product’s IP is below the reorder point (ROP), then an order is placed for the item and the quantity ordered (Q) is fixed. However, if Q + IP is less than the order up to level (OUL), then multiples of Q are ordered (k) until kQ + IP > OUL. The total amount ordered of all products together cannot exceed 40,000 lbs. So, if 40,000 lbs. is reached before all items have been reviewed, an order is placed and another one won’t be placed until the next week, even if some other items are below their reorder point. On the other hand, if all the products that are at their reorder point or below add up to less than 40,000 lbs., then additional products are ordered to get as close to 40,000 lbs. as possible. The supplier ships these orders from five different factories to a supplier DC where one dock door is dedicated to this customer. One factory takes one day to ship an order, another takes two days, another takes three days, another takes four days, and another takes five days. The transit time from each of the factories to the supplier DC is one day. As product arrives to the supplier DC, product is staged in front of the dock door whose destination is the customer’s DC. This staging process takes one day. Once all of the products from the five factories arrive, the order is shipped from the supplier’s DC to the customer’s DC. This takes one day. It takes one day for the customer DC to

receive the product and get it in its slot in the DC. How would you determine the time between reviews for a given product in this process? What is the lead time for a given product?

This example looks more complicated than it actually is. In this example, since the supplier doesn’t ship until the truck load is built, the retail DC only needs to consider the lead time of the longest item. So, one factory takes five days to ship the product to its own DC and the transit time from the factory to the supplier DC is a day, one day for staging in the supplier DC, one day for shipping to the retailer DC, and one day for receiving and put away. In total, the lead time is nine days because the slowest factory is the bottleneck and is used to determine the total lead time. The rest of the process can be modeled using discrete event simulation.

# ENDNOTES

1. This essentially increases the safety stock.   
2. Carlson, M., and J. Miltenburg. “Using the Service Point Model to Control Large Groups of Items.” OMEGA 16(5) (1998): 481-489.   
3. Especially from a mathematical perspective.   
4. Zipkin, P. H. Chapter 8 in Foundations of Inventory Management. New York: Irwin, 2000.   
5. Back-ordering is another typical assumption in mathematical inventory models.   
6. See Greene, William H. Econometric Analysis, 5th ed. Pearson Education India, 2003, for a more complete discussion of the censored normal distribution.   
7. Fisher, Marshall L., and J. H. Hammond. “Coping with Demand Uncertainty at Sport Obermeyer.” Harvard Business Review 72.3 (1994): 90.   
8. For a thorough treatment see Vollman, T. E., W. L. Berry, and D. C. Whybark. Manufacturing Planning and Control Systems, 3rd ed. Homewood, IL: Irwin, 1992.   
9. Ballou, Ronald H. “Expressing Inventory Control Policy in the Turnover Curve.” Journal of Business Logistics 26.2 (2005): 143-164. Ballou, Ronald H. “Estimating and Auditing Aggregate Inventory Levels at Multiple Stocking Points.” Journal of Operations Management 1.3 (1981): 143-153.   
10. Eroglu, Cuneyt, and Christian Hofer. “Lean, Leaner, Too Lean? The Inventory-Performance Link Revisited.” Journal of Operations Management 29.4 (2011):

356-369. Eroglu, Cuneyt, and Christian Hofer. “Inventory Types and Firm Performance: Vector Autoregressive and Vector Error Correction Models.” Journal of Business Logistics 32.3 (2011): 227-239.

11. This is a log-log regression model so the regression coefficients can be interpreted as elasticity estimates.

12. Waller, Matthew A., Heather Nachtmann, and Justin Hunter. “Measuring the Impact of Inaccurate Inventory Information on a Retail Outlet.” International Journal of Logistics Management 17.3 (2006): 355-376.

# 7. Managing Supply Chain Inventory Flows

# COMPONENT RISK POOLING

Risk pooling,1 the portfolios effect, and safety stock aggregation all refer to the same idea, which we will call risk pooling. Risk pooling is the phenomenon whereby combining demand streams reduces the amount of safety stock because the sum of random variables has lower levels of relative uncertainty than the aggregate amount of uncertainty of the individual random variables. This is true as long as the correlation of the random variables is less than one. The implication is that less safety stock is required. For example, if two different demand markets are fulfilled from two different distribution centers, less safety stock would be required if only one distribution center served both markets, other things being equal, as long as the correlation of demand is less than one.

Suppose the demand for an SKU has a standard deviation of 4 in the market served by Distribution Center 1, and a standard deviation of 3 in the market served by Distribution Center 2, and that the demand is not correlated. Suppose that both distribution centers have a one day lead time and that they multiply the standard deviation of demand during lead time by 3 to get safety stock. Then currently Distribution Center 1 has $4 \times 3 = 1 2$ units of safety stock and Distribution Center 2 has $3 \times 3 = 9$ units of safety stock, which is 12 + 9 = 21 units in aggregate. Now, if the two distribution centers are combined, the new standard deviation is

, so the safety stock is 5 × 3 = 15 units, which is almost a 30 percent ${ \sqrt { 4 ^ { 2 } + 3 ^ { 2 } } } = 5$ reduction in the safety stock required.

Now, if the demands are correlated, a modification is required.

X1 = random variable of the demand for SKU 1

X2 = random variable of the demand for SKU 2

Var = variance

ρ = correlation

Then the standard deviation of the sum of the two random variables is

$$
\sqrt {\operatorname {V a r} \left(X _ {1} + X _ {2}\right)} = \sqrt {\operatorname {V a r} \left(X _ {1}\right) + \operatorname {V a r} \left(X _ {2}\right) + 2 \rho \left(X _ {1} , X _ {2}\right) \sqrt {\operatorname {V a r} \left(X _ {1}\right) \operatorname {V a r} \left(X _ {2}\right)}}
$$

Using the preceding example and assuming that the correlation between the demands is 0.1, then

$$
\begin{array}{l} \sqrt {\operatorname {V a r} \left(X _ {1}\right) + \operatorname {V a r} \left(X _ {2}\right) + 2 \rho \left(X _ {1} , X _ {2}\right) \sqrt {\operatorname {V a r} \left(X _ {1}\right) \operatorname {V a r} \left(X _ {2}\right)}} \\ = \sqrt {1 6 + 9 + 2 * 0 . 1 * \sqrt {1 6 * 9}} \\ = \sqrt {2 5 + 2 ^ {*} 0 . 1 ^ {*} 1 2} \\ = \sqrt {2 5 + 3 . 2} \\ = \sqrt {2 8 . 2} \approx 5. 3 \\ \end{array}
$$

And $5 { \cdot } 3 \times 3 = 1 5 { \cdot } 9$ , which is still less than 21. In fact, it will only be the same if $\rho ( X _ { 1 } , X _ { 2 } ) = 1$ . Recall that $\rho ( X _ { 1 } , X _ { 2 } ) \in ( - 1 , 1 )$ . In the previous example, if $\rho ( X _ { 1 } , X _ { 2 } ) = -$ 1, then

$$
\begin{array}{l} \sqrt {\operatorname {V a r} \left(X _ {1}\right) + \operatorname {V a r} \left(X _ {2}\right) + 2 \rho \left(X _ {1} , X _ {2}\right) \sqrt {\operatorname {V a r} \left(X _ {1}\right) \operatorname {V a r} \left(X _ {2}\right)}} \\ = \sqrt {1 6 + 9 + 2 * (- 1) ^ {*} \sqrt {1 6 * 9}} \\ = \sqrt {2 5 + 2 * (- 1) * 1 2} \\ = \sqrt {2 5 - 2 4} \\ = \sqrt {1} = 1 \\ \end{array}
$$

Also, in the previous example, if $\rho ( X _ { 1 } , X _ { 2 } ) = 1$ , then

$$
\begin{array}{l} \sqrt {\operatorname {V a r} \left(X _ {1}\right) + \operatorname {V a r} \left(X _ {2}\right) + 2 \rho \left(X _ {1} , X _ {2}\right) \sqrt {\operatorname {V a r} \left(X _ {1}\right) \operatorname {V a r} \left(X _ {2}\right)}} \\ = \sqrt {1 6 + 9 + 2 * (1) * \sqrt {1 6 * 9}} \\ = \sqrt {2 5 + 2 ^ {*} (1) ^ {*} 1 2} \\ = \sqrt {2 5 + 2 4} \\ = 7 \\ \end{array}
$$

And $7 \times 3 = 2 1$ units, the same amount of inventory as would be required in aggregate if they remained separate distribution centers.

Risk pooling can occur by combining distribution centers, but it can also occur in other ways. If two products are exact substitutes, perhaps two brands of yellow number 2 pencils in a retail store, elimination of one of the SKUs has the same effect, assuming the same service level target remains.

This concept can also be helpful with forecasting. You can forecast in aggregate more accurately than you can at a disaggregate level. For example, you can generally forecast more accurately for one SKU at 100 stores than you can forecast

at a single store. You can also typically forecast in larger time buckets than you can in shorter time buckets. For example, it is generally true that you can forecast more accurately for a given SKU at a monthly level than you can at a daily level. The concept of risk pooling occurs in many areas of supply chain management and in many other disciplines as well, such as finance. In finance, they call it the portfolio effect.

As we mentioned earlier, risk pooling goes by the names of the portfolio effect and safety stock aggregation, but it is also sometimes called thesquare root law. It is really not a law, so we do not refer to it as such in this book. In addition, the square root law assumes that there is no correlation between the demand random variables, and that is not usually the case.

# BULLWHIP

Bullwhip2 is the amplification of uncertainty in demand as it moves up the supply chain. For example, the uncertainty of point of sale (POS) would be less than the uncertainty of orders faced by the retail distribution center, which would be less than the uncertainty of orders faced by the supplier. This is one of the reasons why it has become popular for retailers to share POS data with suppliers—it gives the suppliers a better estimate of demand than orders do since orders have more noise than POS. Nevertheless, there is another side to the issue and that is that the order data has information relevant to the forecasting—namely, the rhythm of the replenishment process per se. That is, the replenishment system itself many times has a rhythm that can be incorporated into a forecast. We discuss this in more detail later in the chapter. First, we go back to the bullwhip phenomenon per se.

In this section we discuss some of the ways bullwhip is generated.3One way bullwhip is generated is through order batching, where individual orders are in larger increments than sales. For example, shoppers might come into a store and purchase Cheerios every day of the week. But the store might only order from the distribution center twice per week. That order batching hides some of the detailed information about demand from the perspective of the retail distribution center. The retail distribution center then might be receiving orders from each of the 20 stores, which in turn places orders on the supplier once every week, further reducing the amount of demand information in the order data. Let’s look at an extreme example to illustrate the idea. Suppose on Day 1, sales at Store 1 for Cheerios go up tenfold per day, and then on Day 3, Store 1 places an order on the distribution center that is ten times the size of its typical order. One week later, on Day 10, the distribution center places an order with the supplier that is much larger than the size of its typical order. So, clearly, order batching causes a delay in information regarding demand; in this example the delay is ten days. Order batching can hide trends and other patterns, but it also simply delays information about changes in demand. Clearly order batching increases the noise in the demand

information, which leads to stockouts and the need for excess inventory. In addition it can result in the need for expedited transportation, increasing transportation costs.

Bullwhip can also be created by errors in forecasts that are used to create orders; such errors might be introduced through human error in estimation, through the forecasting method per se, or both. For example, if a trend forecasting method, such as second order exponential smoothing, also known as Holt’s models, is used when, in fact, there is no trend, and if a high smoothing constant is used in the model, there will probably be over forecasting in the creation of some orders and under forecasting in others. This is especially magnified as the time horizon of the forecast increases. If a high smoothing constant is used to update the estimate of the trend component of the forecast, most recent change in sales will be represented more persuasively in the trend component. Then if the forecast goes out further into the future, as it would with larger order batching, the error of the false trend, be it upward or downward, is magnified.

There are a number of ways of measuring bullwhip, but we discuss the most straightforward method, the ratio of the variances. Which ratios depends on where you want to measure bullwhip. For example, if you want to measure the bullwhip generated by a node, you could measure the ratio of the variance of orders to the variance of sales. If you want to measure from one echelon to another, then you could, for example, measure the variance of POS at all retail stores owned by a retailer and the variance of all orders from all of the retail stores.

Since the primary cost of bullwhip is excess inventory (that is, excess safety stock), increased stockouts, and/or increased transportation costs for a given SKU, measurement of bullwhip is most meaningful at the SKU level. A number of publications talk about bullwhip at the industry level, and that is probably worthwhile for economics, but for inventory management, it is not meaningful. Similarly, bullwhip at the monthly level, quarterly level, or annual level is not meaningful for SKUs that are replenished daily and weekly. In general, bullwhip measurement is most meaningful from a supply chain management perspective when it is at the SKU level and in time intervals that match replenishment cycles.

Using the discrete event simulation tool developed in Chapter 5, “Discrete Event Simulation of Inventory Processes,” you can investigate how a single node can generate or reduce bullwhip. Using discrete event simulation you can investigate various replenishment processes and parameters to see the impact on bullwhip. For example, using the model developed in Chapter 5, you could set the variance of demand high, the order quantity close to the mean of demand, and the safety stock high, and you would discover how a replenishment system can actually reduce bullwhip or create production smoothing. Production smoothing occurs when the variance of orders is less than the variance of demand. Earlier we mentioned that

although you can get a clearer understanding of demand by looking at POS data, there is useful information in the order data. Consider the example just described where demand variance is high, the store order quantity is set to the mean of demand, and the safety stock is high, then the store will order the same amount nearly every day while demand will have a lot of variance. If the supplying entity were to set safety stock based on point of sale data, it would have too much safety stock since the actual uncertainty in the amount ordered is low.4

![](images/b1a9f304e3e1c4e67707090cbc9269cdc9efcc75fbcbf8e493e7333bd647039e.jpg)  
Figure 7-1 compares the ideas of risk pooling and bullwhip.   
Figure 7-1 Bullwhip and risk pooling

In Figure 7-1, the bottom row represents aggregate POS for four different retailers and the circle around them represents all of that POS being aggregated. Suppose that all four of these retailers’ distribution centers are supplied by a single supplier distribution center for this particular SKU. Then the level of analysis of bullwhip appropriate is the aggregation of these orders. The middle row represents retailers processing the demand and turning the demand into orders. This could involve several levels of ordering, possibly including stores ordering from retail distribution centers, and then the retail distribution centers ordering from the suppliers. In Figure 7-1, it says, for example, “Aggregate Orders for Retailer 1.” This might include orders from one distribution center or 100 distribution centers. So, although these orders are coming from four retailers, the number of ship-to locations is probably much greater.

Measures of bullwhip compare the level of variability of the top row, in aggregate representing orders from retailers, to the bottom row. Remember, this analysis is for a single SKU since the supplier has to hold inventory for a single SKU. Risk pooling could be used to analyze the incremental cost associated with splitting the distribution center into two different distribution centers. If the supplier did that and had it set up to where one distribution center serves Retailers 1 and 2, and

another distribution center serves Retailers 3 and 4, then two bullwhip calculations would be needed instead of one. Of course this would require the supplier to hold more safety stock to achieve the same level of service, unless at least one of the new distribution centers was so much closer to the retailers’ distribution centers that the lead time decreased enough to make up the difference.

# INVENTORY POSTPONEMENT

Benetton made clothing in Italy and sold a great deal of products in stores in the United States, primarily located in shopping malls. Benetton was well-known for having a particular color theme, and it was recognized as being very good at recognizing color trends in the market.

Color trends are some of the most fickle of clothing styles. It is difficult to judge which colors will be popular for a particular season. Benetton’s approach was to offer solid colors in its clothing lines seeking to include the trendy colors.

Invariably, however, at the end of a season Benetton would have excess inventory of certain colors, which prompted markdowns to move the products out.

Markdowns are sometimes set at a price below the cost of the product just to sell or eliminate the inventory. Like many in the clothing industry, Benetton noticed that it would stockout of popular colors and have to mark down the remaining colors because no one wanted them.

Traditionally Benetton’s clothing production process involved taking bleached white yarn, then dyeing it to a particular color specification, followed by knitting the garment, say, a sweater. Finally, the manufacturer would ship the product from Italy to the United States.

The dyeing process was capital intensive and fast, while the knitting and assembling process was labor intensive and long. The question for Benetton became, “How do we deal with the problem of excess stock of colors at the end of a season?” Obvious answers might be, “Try to speed up the process by assembling faster,” or, “Find a machine that knits faster.”

Benetton decided to switch the process around and knit and assemble the garment and then dye it. This was iconoclastic. But there was no reason not to with the solid color style. Postponement was beneficial because as the season approached,

Benetton was able to more accurately predict color trends, which dictated sales.

Benetton, in this case, was able to produce in-demand colors and reduce the excess inventory at the end of the season by minimizing the production of the unwanted colors.

In general, the delay of production or distribution is referred to aspostponement.5 Another definition states that postponement6 is the number of

stages of production and distribution that are delayed before receipt of a customer order. Postponement allows a company to make product customization more cost effective. It can also be used to delay transportation and warehousing costs.

Postponement can allow for more centralized holding of inventory, and therefore, possibly increase cycle stock at the centralized location, while reducing it in the forward inventory holding locations. It can also result in less safety stock in end item inventory.

Speculation is akin to the opposite of postponement. Speculation involves conducting various value added activities well in advance of demand, including shipping the product early to locations where it is anticipated that demand will occur, customizing products prior to receiving orders, and so on. Speculation allows a company to be first or to fulfill the early demand. So, although postponement can facilitate cost savings, it must be weighed against the benefits of speculation. However, it is possible to implement a mixed strategy, including using speculation on some of the production and postponement on the remainder of the production. Furthermore, if you view speculation and postponement as a continuum, you can imagine a portfolio strategy where different portions of expected demand are produced and distributed on different points of the continuum. It would seem that the marketing function of an organization would push for speculation, and the supply chain organization would push for postponement. It is the responsibility of supply chain management to find areas of production and distribution where postponement can be implemented without jeopardizing marketing and sales opportunities.

# MERGE-IN-TRANSIT

Merge-in-transit7 is a method of bringing together components or items that have disparate origins but a common destination. For example, suppose a company bought office equipment from three sources in Southwest Michigan and that all together they cube out a 53-foot trailer for delivery to Phoenix, Arizona. Rather than paying for three different truckloads from Southwest Michigan to Phoenix, the three shipments could be combined in Southwest Michigan and then a single truckload to Phoenix. This is a type of shipment consolidation. However, merge-intransit can also be assembly-in-transit where components come from multiple sources but need to be delivered as a single unit. Merge-in-transit can reduce transportation costs as has been explained. It can also reduce inventory costs for the receiving company because everything arrives together and ready for use. Without merge-in-transit, it is possible that the components will arrive and then cannot be used until the other components arrive and are assembled, thus increasing the inventory holding cost.8

# VENDOR MANAGED INVENTORY

Vendor managed inventory9 (VMI) is an inventory management process whereby the supplier makes the decision about the replenishment timing, quantity, or both. For VMI to work, the supplier must have, at a minimum, visibility to the customer’s inventory position. However, it would be better if the supplier using VMI had visibility to point of sale data as well since inventory management requires forecasting. The key idea behind VMI is that the supplier has visibility to other customers’ demand as well so the supplier can make decisions about shipping orders, taking this into account, thus smoothing its own demand. By smoothing its own demand the supplier will need to hold less safety stock and will have fewer stockouts. Stockouts at the supplier result in lead time uncertainty from the customer’s perspective, which can result in customers holding more safety stock or experiencing more stockouts or both. To implement VMI, not only does the customer need to share inventory position and demand data, but the customer also needs to work with the supplier to understand its own performance targets such as inventory targets and fill rate targets. Customers must also be careful to understand how these metrics are to be calculated and updated. Customers are always wary of this because it is possible for the supplier to make a decision that will make their competitor better off at their expense. Another concern is that if a supplier is having a month where sales are down, the supplier could place a lot of orders, thus improving its sales. Of course, if metrics are set forth and agreed to, this would be detected. In addition to the possibility of better inventory management, customers might like VMI because it transfers some of the labor costs from the customer to the supplier.

# CONSIGNMENT

Vendor managed inventory is sometimes confused with the concept ofconsignment. Consignment occurs when the supplier owns the inventory in the customer’s facility until the customer sells the inventory. Vendor managed inventory and consignment are two separate decisions, because VMI can be implemented with or without consignment. Customers like consignment because it takes away much of their risk and can also help them with cash flow. On the other hand, because it reduces their risk of not selling, the customer might not try as hard to sell the inventory.10 Whether or not a customer is better off with consignment is not as straightforward as it might appear on the surface. Suppose the terms of sale with the supplier are net 30 days if there is no consignment, and with consignment, the customer has to transfer the funds the same day. If the customer is turning the inventory every week, the customer is better off without consignment in terms of cash to cash cycle time. Without consignment, the customer receives the inventory on Day 1 and sells it on Day 7 but does not have to pay the supplier until Day 30. This means that the customer gets the cash 23 days before he has to pay the

supplier. With consignment, the customer gets the cash and pays the supplier on the same day in this example. The point is that when analyzing the benefits and costs of consignment, you must consider (1) how it affects incentives, (2) terms of sale with consignment and without consignment, and (3) rate of inventory turns.

# REVERSE CONSIGNMENT

Reverse consignment11 occurs when the customer buys the product and owns it but does not want the supplier to ship it until a later date. This can happen when the (1) customer is at capacity in terms of inventory storage, (2) there is a shortage of the product in the market and the customer does not yet know which distribution center or location will need the inventory, and (3) there is a special deal given, a promotion, that the customer wants to take advantage of even though the customer doesn’t need the inventory yet. In addition, there are a few other reasons, but in some ways this can be considered a form of postponement because you are essentially delaying the movement of the inventory.

# COLLABORATIVE PLANNING, FORECASTING, AND REPLENISHMENT

Collaborative planning, forecasting, and replenishment12 (CPFR) is an inventory replenishment process that involves collaboration between a customer (usually a retailer) and a supplier that is implemented in many different ways, but the goal is to come to an agreement regarding the forecasts and replenishment objectives. A number of guidelines have been proposed over the years regarding how the CPFR process should work.13,14 We do not go into those here, but instead discuss the key concepts behind the process. One of the fundamental concepts behind CPFR is that retailers and suppliers have different types of information, which together can result in better forecasting and replenishment decisions. For example, suppliers have visibility to the sales of all retailers, but retailers themselves know their own shoppers better and the specific markets they are in. A supplier might be able to see a trend developing across the country more quickly than some retailers, especially regional retailers. However, a retailer is aware of changes it is making in terms of assortment, remodeling, changes in local demographics, road construction, and so on.

# PUSH VERSUS PULL

A push inventory system forecasts demand and sends inventory based on the forecast, whereas a pull inventory system sends inventory based on inventory being used or purchased. Is a (Q,ROP) inventory replenishment system push or pull? When enough inventory has been taken away, it sends inventory; that is, the ROP is the trigger to send inventory when enough has been removed. In this sense, it is a

pull system. However, the reorder point is usually based on a forecast, which makes it a push system. Consider a situation where the reorder point isROP1 but at time t the forecast increases so that the reorder point increases to ROP2. Now, an order will be triggered even if no inventory has been removed. So technically, a (Q,ROP) replenishment process is a hybrid; the same argument can be made about the (T,OUL) replenishment process. Both of these inventory replenishment processes fall on the pull side of the push versus pull continuum in comparison to a material requirements planning (MRP) system or a distribution requirements planning (DRP) system.15 In these systems, inventory is pushed based on a forecast into the future planning horizon.

A kanban16 system, developed in Japan, is the epitome of a pull system and is typically used within a production environment. There are many kanban system designs, but one of the simplest is a two-bin kanban system. Imagine on the factory floor, at a workstation, you have a bin full of components used in the production of some product. When the bin is empty, the empty bin is taken to the inventory storage area where another bin is full. The empty bin is left in the inventory storage area, and the full bin is taken to the workstation on the factory floor. Instead of moving a bin, many times a kanban card is moved to the inventory storage area. The kanban card includes information about how much to move, where it goes, when it is due, and so on. This allows for additional inventory prior to the bin being completely empty. In this regard, it is a (Q,ROP) process. The size of the bin determines Q, and either the size of the bin or the information on the kanban card determines the reorder point. In the two-bin kanban system described earlier, Q and ROP are equal to the size of the bin. Many unique aspects of the kanban system are visual in nature; you can see when something needs to be replenished.

# CHANNEL SEPARATION

Channel separation17 is the notion that marketing channels and physical distribution channels do not need to be the same. For example, Firm A can buy from Firm B and then sell to Firm C, but the product can flow from Firm B to Firm C. That is channel separation because the marketing channel is different from the physical distribution channel: In this example the marketing channel flows from Firm B to Firm A and then to Firm C, but the physical distribution channel flows from Firm B to Firm C. This reduces transportation costs, labor costs, and inventory costs in many cases. Channel separation can be thwarted by lack of trust. For example, if Firm A does not trust Firm B, because Firm A thinks that Firm B might cut Firm A out of the relationship with Firm C, then channel separation will probably not occur. Sometimes Firm A will help Firm B set up operations so that Firm B can print labels so that Firm C is not even aware that product is coming directly from Firm B. This type of arrangement is often referred to as drop shipping. For example, Amazon.com offers drop shipping services for firms so that

all they have to do is marketing; Amazon.com handles the holding and shipping of the inventory.

# INVENTORY PLACEMENT OPTIMIZATION

Inventory placement optimization has to do with where inventory, and especially safety stock, is held in the supply chain. As discussed earlier, a node can order near demand quantities frequently, with high safety stock levels to shield the higher levels in the supply chain from having to hold as much safety stock. However, it is often the case that it is less expensive to hold inventory at higher echelons in the supply chain. At the extreme, retail locations tend to be in higher rent locations, near population centers, whereas distribution centers and factories tend to be located in rural areas away from the population where rent is low. Similarly, in retail facilities there are high opportunity costs for the shelf space because there is a fixed amount of space and when safety stock is held on the shelf, there is less space for additional assortment depth and/or breadth. Nevertheless, for some SKUs with very high stockout costs, in some cases it makes sense to hold the preponderance of the inventory at the retail store. But finding the optimal placement of inventory, including safety stock, cycle stock, and so on, requires careful analysis of transportation costs, inventory holding costs, stockout costs, and must take into account various inventory replenishment process options, including cross docking.

# THE GLOBAL SUPPLY CHAIN IMPACT

There are two categorically different challenges with global inventory management: (1) inventory management for global sourcing and (2) inventory management for selling in foreign markets. These are fundamentally different and have different challenges. Inventory management for global sourcing is a challenge because of the long lead times, customs clearance, and communication challenges. Inventory management for selling in foreign markets is a challenge due to differences in legal systems, lack of infrastructure, differences in consumer and shopper behavior, and taxation rules and complexities. We begin with inventory management for global sourcing.

In managing inventory for global sourcing it is important to take into account various transportation options and their impact on cycle stock, safety stock, and intransit stock, because the differences can be dramatic. The difference between air and inland water/ocean can be three to four weeks. For example, going from the inland water/ocean combination to air, if the difference is four weeks, then intransit stock could be reduced by around 90 percent. In addition, for a given level of demand uncertainty, the reduction in safety stock could be around 75 percent.18 Of course the transportation costs are also dramatically different, but the point is that good inventory management for global sourcing must carefully consider transportation options and not just assume one method is better than

another. In addition, it is possible that in some circumstances that typically ocean should be used with the allowance for emergency shipments using air or that some base percentage of demand should be covered with ocean carriage while the most uncertain portion of demand is covered with air carriage. All of these options must be considered with respect to all of the costs and customer service targets. Many times production and labor costs are the key drivers in sourcing decisions when in fact other factors should be weighed such as inventory holding costs,

transportation costs, stockout costs, as well as taxation and regulatory compliance costs. It is also important to notice where costs are added to the inventory. For example, a garment sourced from a country in Asia might have the preponderance of value added in that country, whereas ocean carriage may be a small fraction of the total cost of the garment. At the same time, the duty on the garment could be around the same magnitude as that of the production cost in Asia. Consequently, it might make sense to use a foreign trade zone (FTZ). If product is brought into the United States through an FTZ, it is possible that duty can be delayed until product leaves the FTZ. Details like this can affect the optimal inventory positioning in the supply chain.

When products are imported, they must go through customs, and the products must be classified according to the Harmonized Tariff Schedule of the United States (HTSUS). The origin of the product and the product classification have a significant impact on whether a tariff is imposed and the magnitude of the tariff. Consequently, this has an impact on the inventory investment and the inventory cost after the product is imported, which has an impact on optimal product placement and logistics network design. If you have a silk tie, where the silk comes from China, the product is sewn and assembled in Bangladesh, and is designed and sold from an Italian company, what is the country of origin? Generally, from a cost perspective you would like the country of origin to be one with the lowest tariff, but from a marketing perspective, you might want it to be from the country with the most caché. Determining country of origin is important and requires expertise from someone such as a customs broker. If a product has a questionable country of origin or a debatable product classification, it can cause shipments to be held up in customs, depending on the product and the country where importation is occurring.

In managing inventory for sale and distribution in foreign markets it is difficult to make many generalizations. Developing countries on the same continent or developed countries on the same continent can vary significantly in terms of infrastructure, shopper preferences, homogeneity of product assortment, transportation capacity and competition, warehouse availability, land costs, labor costs, labor regulations, and value added tax (VAT) rules.

As a company moves operations to a foreign country to sell or distribute its product, forecasting can be difficult because of the fact that the country has

different cultural events and holidays. For example, a retailer running operations in a foreign country would need to understand holidays, not only for shopping behaviors but also for hourly labor behaviors. In some countries, hourly labor travel to their hometowns for certain holidays. For a retailer, this has implications for forecasting demand since some cities have high densities of transient labor and therefore may face a reduced demand in those areas when people leave for a holiday, whereas the areas where the labor is going to for the holidays may face increased demand. Incorporating these differences into the forecasting and replenishment processes can appear easy on the surface, but in reality it can be challenging, especially early in a company’s foray into a foreign market.

Managing retail inventory in foreign markets can be challenging, especially when coming from a homogeneous market. For example, while there are many different demographics in the United States, the overall grocery and general merchandise assortment is relatively homogeneous, especially in comparison to a country like China. Throughout China there are many different cuisines and raw materials that go into making those cuisines. Consequently, the retail assortments in China are more heterogeneous than those in the United States. In China, the sources of the grocery products are more regional as well. This leaves fewer products for centralized distribution. So on the one hand you have more homogeneous assortments and more regional sourcing. All of this leads to the need for more inventory, and lower transportation efficiency.

In addition, the economics of using distribution centers in various countries differs widely due to land costs, labor costs, and labor regulations. These variables clearly affect the optimal level of automation in a distribution center, which in turn affects the fixed versus variables costs, the payback, and the ROI. In some countries where land is relatively expensive you find distribution centers that are multilevel and highly automated, whereas in countries with low land costs you find sprawling distribution centers with large yards. If the optimal solution is to have a multilevel, highly automated distribution center, the distribution center will probably be smaller than it would otherwise be. In a retail distribution setting this may result in a higher number of products being shipped by direct store delivery (DSD).

# RETAIL AND CONSUMER PRODUCTS INVENTORY MANAGEMENT

There are three primary methods of store replenishment: (1) direct store delivery, (2) from retail distribution center to store, and (3) from supplier, cross docked through the distribution center to the store. With direct store delivery the supplier delivers the product to the store and many times actually puts the product on the shelf. If you have 100 stores and receive deliveries from one supplier 300 days per year that is 100 stores × 300 days = 30,000 invoices and receiving documents.

That is just for one supplier. Whereas, if you received one truckload from the supplier each week at a distribution center that serves 100 stores, then that is just 52 invoices and receiving documents. This reduces the transaction costs, which can be significant due to invoice match failures—the invoice or the receiving document or the order do not match. When a match failure occurs, the accounts payable department has to investigate the failure. From a supply chain perspective, transportation costs are higher than if the product was just put on the truck from the distribution center with all of the other products going to the store. However, there are benefits to DSD. Consider fresh bread. The bakeries are local and bread goes out of date quickly so DSD makes sense. Other benefits of DSD include the value knowledgeable DSD delivery professionals bring to keeping the shelves looking attractive.

# Cross Docking

Cross docking in the retail setting has a different meaning than it does in less-thantruckload (LTL). In retail it means that when product from a supplier arrives at the distribution center it is divided up based on specific store orders and then staged for trucks heading to specific stores. If the allocation to the specific stores is based on the original orders from the store, at the time the order was placed with the supplier, then cross docking requires more inventory to be held in the store to hit the same service levels as would be the case with the product being stored in the distribution centers. The reason for this is that the lead time to the store with cross docking is the lead time from the supplier to the distribution center and then through the distribution center and from the distribution center to the store. Whereas if it is held in the distribution center, the relevant lead time to the store is just the lead time from the distribution center to the store. There is a means of overcoming this problem, namely, post receipt allocation. Post receipt allocation means that once the product arrives at the distribution center for cross docking, the product is then allocated to the stores; it is not allocated to the stores based on the requirements at the time the order was placed with the supplier.19 So without post receipt allocation, there is a clear trade-off between more inventory in the stores with cross docking, and more inventory in the distribution center without cross docking, just holding the inventory in the distribution center. With post receipt allocation, orders can be generated using the distribution echelon inventory position and later using a heuristic for allocation to the stores.

# Assortment

Assortment decisions are typically based on demand and space availability, but these decisions have a significant impact on inventory management and forecasting as well. Assortment depth in a category has to do with the number of different SKUs of a given number of brands in the category, whereas assortment breadth is the number of different brands the category carries. In a fixed amount of space, as

the assortment increases, the inventory holding capacity per SKU decreases. This increases the expected number of units out of stock per replenishment cycle. However, oddly enough, it can also increase the inventory holding cost.20 The reason for this is when SKU n is added it tends to have lower volume than SKU n-1. That is, retailers tend to start with the highest volume SKUs in their markets and then add additional SKUs in order of decreasing volume. This is not always true, but it is true in many cases. As SKUs continue to be added, eventually stockouts of the top sellers increase and the average inventory in the category increases. Of course the additional need to replenish the shelf for the fastest moving SKUs can be addressed through the addition of store labor and simply moving product more often from the backroom to the shelf. This can be difficult during the busiest shopping times, when it is needed most. There is a limit to how much additional labor can solve the shelf replenishment problem.21 As more SKUs are added, it can increase market share for the retailer, bringing in additional customers that perhaps would have shopped elsewhere. This is one of the reasons why assortment decisions cannot be made in isolation. But this effect must be traded off against the additional stockouts that might occur at the shelf as a result.

# New Item Introductions

New item introductions also cause similar challenges from an inventory management perspective. When a new item is introduced to a category, it creates uncertainty in inventory management and often takes space from a top selling SKU. The top-selling SKUs typically have the most facings and are sometimes the only ones with multiple facings. In those cases, the only choice in terms of making space for the new item is from the top selling items. This assumes that none of the existing SKUs in the assortment are deleted. However, in addition to taking space from top selling SKUs, new item introductions have highly uncertain demand, and it is difficult to make forecasts for new items, because of a lack of historical data. The majority of sales forecasting methods rely on historical sales. Most of the time new item demand is forecasted simply using the judgment of salespeople and merchandising managers. Another approach to new item forecasting is using historical data of similar items, but this requires knowledge of which item is similar. Even if it is similar, that doesn’t imply that the future sales will be similar. Another source of uncertainty that new items create is uncertainty about substitution. That is, these new items may absorb some of the demand from existing items, making it more difficult to forecast their demand.

# Pallet, Case Pack, Inner Pack, and Units

The most common retail store replenishment quantities are pallet, case pack, inner pack, and individual units. Replenishing in pallet quantities is common in the retail club business and also occurs in other retail formats in a more limited way, such as for special retail pallet display promotions. Case pack replenishment is perhaps the

most common, especially in grocery and fast moving consumer goods.

Replenishing in inner packs22 and individual units requires a break pack process at the distribution center. That is, instead of, for example, sending a case of 24 to a store that sells one per week (24 weeks of supply), the distribution center might break down the case and send individual units to each store (one week of supply). This decreases inventory holding costs at the stores but increases labor costs at the distribution center. Regarding case pack quantities, they are often determined by the need for the cases to fit on a pallet and/or the need to cube out a truck. One might think that suppliers would have many different case pack quantities for different retailers and volumes, but there is actually very little variety. So, for one store, a case pack might represent a half year of supply while at another retail store it might represent a week of supply.

# Retail Shelf Layout

The layout of the retail shelf and space allocation for products on the shelf are important aspects of inventory management. How product is positioned on the shelf can affect sales.23 Some products sell better on the ends of the aisles or on the ends of the category, whereas others sell better in the middle. Some items are better positioned high on the shelf and others lower on the shelf. Some items sell better when they are next other specific items than when they are not. For some items, having more inventory of it on the shelf increases sales.24 This is especially true for impulse items and less true for destination items. Some research indicates that shoppers have trouble distinguishing assortment variety versus space allocation in a category.25 As you can see, there are many things to consider in laying out a retail shelf, especially from a demand perspective. All these decisions, where the item is placed, the SKU it is placed next to, the amount of inventory on the shelf, and so on, affect the demand, and therefore, should affect the forecast, reorder point, and reorder quantity or the order up to level.

Another challenge with shelf layout from an inventory management perspective is that the demand for items changes by day of the week in some cases. For example, more people shop at the grocery store on the weekend. Furthermore, some items sell more on certain days than on others, even throughout the work week. This means that the optimal space allocation one day might be different from the optimal space allocation for another day of the week, but retailers change their shelf layout infrequently. Demand also varies by time of day. At some retail store locations, the retailers face heavy after work shopping patterns. Again, the amount of inventory allocated to the shelf might be sufficient for the average day of the week but might be insufficient for Saturday morning, for example. In an extreme example, suppose that the top selling cinnamon roll sells 90 percent of the units on Saturday morning between 6:00 a.m. and noon. If the space was allocated based on average weekly demand, it would have enough demand for about 14 percent of weekly sales. This means that on average, the store would sell out of those

cinnamon rolls before 7:00 a.m. On the other hand, if the store gave enough space for 90 percent of the sales, then most of the week that space would be underutilized because not all items have such uneven sales. This is a trade-off that must be considered in retail inventory management. Optimization can be used to model this trade-off and maximize profit.26

Retail shelf space allocation for seasonal merchandise is also challenging, because space must be allocated for the seasonal merchandise and some of that space may come from the inventory of some staple items. Some retailers maintain space for seasonal merchandise, but the amount of seasonal merchandise needed changes by season. For example, in the canned goods category, during the Thanksgiving season, a certain brand of canned peas is in high demand in the south part of the United States. This can be managed in multiple ways, including special promotional displays and taking space from some existing items in the canned goods category. This will affect forecasting and inventory management not only for this SKU of canned peas but also for many other SKUs in the category. Generally, people might not leave the store and go to another store looking for a certain SKU of canned peas, but in the South during a particular season for a particular brand of peas, many shoppers will take that path. This change in the cost of a stockout must be considered in the inventory allocation decisions.

# ENDNOTES

1. Zinn, Walter, Michael Levy, and Donald J. Bowersox. “Measuring the Effect of Inventory Centralization/Decentralization on Aggregate Safety Stock: The Square Root Law’ Revisited.” Journal of Business Logistics 10.1 (1989): 1-14.   
2. Lee, Hau. L., Venkata Padmanabhan, and Seungjin Whang. “Information Distortion in a Supply Chain: The Bullwhip Effect.”Management Science 43 (4) (1997): 546-559.   
3. Ibid.   
4. This may not be wise since it is usually more expensive to hold inventory at the store than upstream from the store.   
5. Waller, Matthew A., Pratibha A. Dabholkar, and Julie J. Gentry. “Postponement, Product Customization, and Market-Oriented Supply Chain Management.” Journal of Business Logistics 21.2 (2000): 133-160.   
6. Ibid.

7. Croxton, Keely L., Bernard Gendron, and Thomas L. Magnanti. “Models and Methods for Merge-in-Transit Operations.” Transportation Science 37.1 (2003): 1- 22.   
8. This assumes the consignee owns the goods once they are received.   
9. Waller, Matt, M. Eric Johnson, and Tom Davis. “Vendor-Managed Inventory in the Retail Supply Chain.” Journal of Business Logistics 20 (1999): 183-204.   
10. Known as moral hazard.   
11. Lee, Hau Leung, and Seungjin Whang. “The Whose, Where and How of Inventory Control Design.” Supply Chain Management Review 12.8 (2008): 22- 29.   
12. Stank, Theodore P., Patricia J. Daugherty, and Chad W. Autry. “Collaborative Planning: Supporting Automatic Replenishment Programs.” Supply Chain Management: An International Journal 4.2 (1999): 75-85.   
13. Kahn, Kenneth B., Elliot N. Maltz, and John T. Mentzer. “Demand Collaboration: Effects on Knowledge Creation, Relationships, and Supply Chain Performance.” Journal of Business Logistics 27.2 (2006): 191-221.   
14. McCarthy, Teresa M., and Susan L. Golicic. “Implementing Collaborative Forecasting to Improve Supply Chain Performance.”International Journal of Physical Distribution and Logistics Management 32.6 (2002): 431-454.   
15. MRP and DRP were discussed in Chapter 6.   
16. Schonberger, Richard J. Japanese Manufacturing Techniques: Nine Hidden Lessons in Simplicity. SimonandSchuster. com, 1982.   
17. Hutt, Michael D., and Thomas W. Speh. “Realigning Industrial Marketing Channels.” Industrial Marketing Management 12.3 (1983): 171-177.   
18. For a rough estimate of the reduction in safety stock you could use the following formula. Let L1 be the current lead time and L2 be the proposed lead time, then a rough estimate of the percentage change in safety stock is given

$\begin{array} { r } { \frac { \left( \sqrt { L _ { 1 } } - \sqrt { L _ { 2 } } \right) } { \sqrt { L _ { 1 } } } } \\ { \mathrm { b y } } \end{array}$

19. Waller, Matthew A., C. Richard Cassady, and John Ozment. “Impact of Cross-Docking on Inventory in a Decentralized Retail Supply Chain.”Transportation Research Part E: Logistics and Transportation Review42.5 (2006): 359-382.   
20. Stassen, Robert E., and Matthew A. Waller. “Logistics and Assortment Depth in the Retail Supply Chain: Evidence from Grocery Categories.” Journal of Business Logistics 23.1 (2002): 125-143.   
21. Eroglu, Cuneyt, Brent D. Williams, and Matthew A. Waller. “The Backroom Effect in Retail Operations.” Production and Operations Management (2012). Waller, Matthew A., et al. “Marketing at the Retail Shelf: An Examination of Moderating Effects of Logistics on SKU Market Share.” Journal of the Academy of Marketing Science 38.1 (2010): 105-117.   
22. Inner packs are within a case and are multiple units bound together by plastic or some other method. The inner packs are not for sale but for distribution at stores. The stores then must break open the inner pack before displaying the product on the shelf.   
23. Dreze, Xavier, Stephen J. Hoch, and Mary E. Purk. “Shelf Management and Space Elasticity.” Journal of Retailing 70.4 (1995): 301-326.   
24. Urban, Timothy L. “An Inventory-Theoretic Approach to Product Assortment and Shelf-Space Allocation.” Journal of Retailing 74.1 (1998): 15-35.   
25. Broniarczyk, Susan M., Wayne D. Hoyer, and Leigh McAlister. “Consumers’ Perceptions of the Assortment Offered in a Grocery Category: The Impact of Item Reduction.” Journal of Marketing Research (1998): 166-176.   
26. Dulaney, Earl F., and Matthew A. Waller. “System, Method and Article of Manufacture to Optimize Inventory and Merchandising Shelf Space Utilization.” U.S. Patent No. 6,341,269. 22 Jan. 2002.

# 8. Inventory Performance Measurement

Considering the central nature of inventory as an indication of the effectiveness of supply chain operations and decisions, inventory measurement and performance assessment are paramount. For example, Gartner annually publishes a Top 25 Supply Chain1 ranking that highlights the firms that are innovators and leaders in terms of their supply chain processes and strategies.2 Roughly 40 percent of Gartner’s ranking logic is associated directly with inventory. One of the key performance indicators (KPIs) it uses is Return on Assets (ROA), which is considered a robust measure of a firm’s overall operational efficiency and calculated as

ROA = Net Income/Total Assets

Because inventory is an asset, a firm’s inventory management performance has a direct impact on its ROA. All else being equal, reductions in inventory lead to lower total assets and, as a result, a higher ROA.

In addition to ROA, Gartner also includes inventory turns in its assessment. Inventory turns is often considered an indicator of the overall effectiveness of a firm’s inventory management practices and calculated as

Inventory Turns = Cost of Goods Sold/Average Inventory

Generally, higher turns are interpreted to suggest that the firm has lower obsolescence, deficiencies, and carrying costs. Thus, the extent to which an organization appropriately manages its inventory is captured, in many ways, by its inventory turns measure. Of course it can go too far and result in stockouts.

Taken together, the Gartner ranking places a significant amount of value on inventory as a measure of overall supply chain performance and vitality. Such a focus on inventory is in line with other frameworks and research initiatives that attempt to assess supply chain performance, particularly in a quantitative and financially based fashion. Due to the intricacies of inventory management practices outlined throughout this book, favorable inventory-related measures are often the first point of departure in determining an organization as “good” or even “best in class” in supply chain management.

In the following sections we highlight several measures that are vital when assessing the inventory management performance of an organization. These measures are all different, in that they provide unique indications of inventory performance from a particular vantage point and in a specific context. They are, however, alike in the sense that each connects inventory to the overall financial viability of an organization and provides a means to benchmark firms within particular industries with each other.

# TRADE-OFF ANALYSIS

Perhaps the best place to start with discussing inventory measurement is to put it in context. Inventory, though a vital aspect of a firm’s supply chain management performance, does not exist in a vacuum. Several other interconnected areas are involved in supply chain management. For example, transportation is a significant cost driver and function in supply chains. Interestingly, changes in inventory performance due to managerial decisions often have an impact on transportation costs and performance. This is the concept of the “trade-off.”3

Trade-offs are an important topic to consider when discussing inventory performance measurement, as the net effect of inventory decisions is the “true” performance metric that ultimately matters. Consider the hypothetical inventory decision that results in a significant reduction in inventory costs and associated carrying costs, yet also causes an increase in transportation costs to maintain adequate customer service levels. Are the inventory-related cost reductions “true” cost reductions? It would actually depend on the magnitude of the increase in transportation expenses, and whether the inventory savings are significant enough to outweigh them. As such, inventory trade-off issues are vital when measuring

inventory performance, because there is almost always a net effect of inventory performance improvements. Let’s discuss a few of these trade-offs.

# Inventory-Transportation Trade-Off4

Generally, transportation costs decrease as transportation volumes increase. This allows for the spreading out of operating costs across more items during transit. As such, shipping in full truckload (TL) and full container load (FCL) quantities is usually always cheaper than quantities that are less-than-full. In and of itself, this is a great concept, but inventory costs must also be taken into consideration.

In many cases, demand for inventory will not be in full-load quantities. Hence, shipping in such quantities inevitably results in associated inventory-related costs. Hence, the trade-off. First, many companies use shipment consolidation to ensure as many full-load quantities as possible. In many cases, this involves holding shipments to merge them with other shipments that may be travelling to (or near) the same destination point. Even further, sometimes this is done by holding some shipments for days (instead of hours or minutes). As a result, inventory carrying costs increase to allow for the transportation cost saving. Likewise, receiving shipments from suppliers in full-load quantities is often done to take advantage of the inbound transportation cost efficiencies. However, demand is often significantly less, resulting in the carrying of more inventory (with associated costs) to realize the transport savings.

It is also important to highlight the reverse of this concept. One of the key aspects of lean operations is the adoption of the “smaller, more frequent shipments” mentality. This clearly results in reduced inventory costs, as less inventory is being held due to the speed of product being shipped and, thus, moving through the supply chain system. Inventory performance measures will likely all move in a positive direction, which is one of the reasons why lean operations became popular. However, the trade-off of this is also obvious. Smaller, more frequent shipments go directly against the “larger quantities” transportation savings approach discussed previously. Hence, while inventory is improving, transportation cost efficiencies are suffering. This trade-off effect is important, particularly because inventory and transportation costs are two significantly large cost categories in supply chain management. Improving inventory is, therefore, a great thing, but only if the potential associated increases in transportation costs don’t fully consume the inventory performance enhancements. It is possible to become too lean.5

# Product Variety-Inventory Trade-Off

How many variations of Coca-Cola are there? Clearly, this question would take some time to answer, as one would have to consider the many different sweeteners, caffeine-levels, and flavor add-ins available. Truth be told, a precise answer was

actually not the intended purpose of the question. The follow-on question of why there are so many variations of Coca-Cola is the main point.

Customers have preferences, which ultimately lead many firms to manufacture a multitude of different products as a means of catering to the needs of various customer segments. Product variety is often viewed as a revenue-generating strategy, where more products that meet the specific needs of different market segments should lead to increases in current and future sales. Many firms forego the product variety benefits, however, because they prefer to manufacture in larger lot sizes due to the inventory cost benefits of more simplified and standardized products.6 Moreover, product variety requires more inventory to maintain customer service levels, since more products have to be held due to the various stock keeping units (SKUs) available.7

The benefits of keeping product offerings simple must, therefore, be considered in the context of potential lost sales and service opportunities. Sure, inventory costs have been maintained and efficiencies realized, but could the revenue lift associated with increasing the variety of products made available to the market outweigh the inventory performance benefits? This trade-off concept is one that many firms, like Coca-Cola, constantly struggle with and consider when planning customer service and product strategies.

# Lot Size-Inventory Trade-Off

As alluded to earlier, manufacturing organizations likely prefer to produce in large lot size quantities. This allows for better process control, per unit costs to decrease, and overall efficiency gains. The issue with this, however, is that demand is typically in much smaller lot size quantities. Thus, to take advantage of large production runs, firms often have to hold more inventory to service customers. This trade-off must be considered when, for example, inventory performance measures appear to be an indication of poor management decisions and inefficiencies (lower turns, for example). The reality may be that the net effect of the seemingly lackluster inventory position is a level of manufacturing cost reductions that eclipse the costs due to slower moving inventory.

# TYPES OF MEASURES

Now that we have established that inventory performance measures should be considered in context, let’s discuss some of the key metrics used to assess inventory management effectiveness. A plethora of measures could be discussed, as inventory-related measures are often industry-specific and situational. For example, Gross Margin Return on Inventory Investment (GMROI) is often used in the retail industry.8It’s a measure of a firm’s capability to convert inventory to cash above the cost of the inventory and calculated as

GMROI = Gross Margin/Average Inventory

A GMROI greater than one indicates that the firm is selling inventory for more than it costs. While this is, of course, a measure that any firm could use to assess inventory performance, it has become popular in retailing. Because margins and inventory turns vary greatly by product or location, many retailers use this measure to constantly gauge the return associated with product lines or store locations. In a broader sense, this example highlights how inventory measures can be somewhat context-specific and vary by industry setting.

# 4-V MODEL

One way to approach inventory measures, then, is to focus not so much on the actual measure (because there are a large variety of them), but the intent and purpose of the measure. A helpful framework is the 4-V Model, where inventory measures are categorized based on whether the purpose of the measure is to assess the VOLUME, VALUE, VELOCITY, or VARIANCE of the inventory.

# Volume Measures

Volume inventory measures focus on capturing how much inventory a firm has. Thus, these measures are typically stated in units and are used to assess how much physical inventory is available. Thus, reports of how many units of a firm’s materials, finished goods, and the units being processed are all indicators of inventory volume. In addition, many firms translate inventory units into “total weight” denominations. This is particularly useful when considering transportation of inventory during routing and scheduling.

In addition to the sheer count of inventory, many firms find it useful to measure the relative volume of their inventory by assessing how much of their intended inventory is in stock. Percentage Out-of-Stock (OOS%)9 is a simple calculation that assists in measuring the volume of inventory that is available.

OOS% = Number of Inventory Items OOS * 100/Number of Inventory Items

It’s important to note that this is not necessarily based on individual piece-count, but instead often applied to individual SKUs. So, the measure quantifies the percentage of SKUs that are completely out-of-stock—in other words, the volume of inventory that is available relative to what should be available.

# Value Measures

Value inventory measures emphasize two aspects of inventory. First, value measures can focus on the total dollar value and total cost of inventory. These

measures are typically stated in dollars and are used to gauge how much money has been invested in inventory. For example, a popular value measure is Average Inventory, which is calculated as follows:

Average Inventory = (Beginning Inventory + Ending Inventory)/2

This simple calculation is used to estimate the amount of inventory that a business typically has on hand over a longer time period than just one month. Average inventory is also useful for comparison to revenue. Many firms often calculate the average inventory for the year-to-date, and then match the average inventory balance to year-to-date revenues, to see how much inventory investment was needed to support a current level of sales. This measure is also used to compare inventory investment levels across several periods to track significant changes that may have occurred in supporting firm operations.

Another perspective on inventory “value” is the value contribution of inventory investment—in other words, measures that capture the magnitude of the return gained by investing in inventory. Earlier we used the GMROI measure in an example. GMROI is, indeed, a value measure because it represents the value that a firm receives from its inventory.

Another measure that captures the magnitude of a firm’s return on inventory dollars is Sales to Working Capital (SWC). SWC is essentially a measure of the amount of working capital that was necessary to generate sales. It is calculated as follows:

SWC = Annualized Sales/(Accounts Receivable + Inventory – Accounts Payable)

As this ratio indicates, a primary driver of this measure is inventory. As such, this measure is often used to further quantify the value of inventory investment by putting it in the context of working capital and associating it with sales. This measure, unlike other measures that capture dollar values of inventory, is stated as a numerical ratio. For example, if a firm has an SWC of 3.1 it could be interpreted to suggest that a dollar in working capital yields three dollars in revenue. Stated differently, the firm has roughly a third of its level of sales tied up in working capital.

Of course, this measure is broader than just inventory. It’s easy to see how a higher SWC is considered more favorable. While inventory reductions can be a significant means of producing a better SWC, other approaches (like increases in sales, all else being equal) can also drive up the ratio. Hence, it’s often used as an indication of the return on inventory investment, but it is clearly more of a comprehensive working capital measure. Thus, the Sales-to-Inventory Ratio (SIR) is also often

used, as it provides a more granular and direct reflection of the return associated with inventory. It’s simply calculated as follows:

Sales-to-Inventory = Annualized Sales/Inventory

Another category of inventory value measures deals with the value that firms gain from being able to service customers. In essence, inventory availability yields a firm a level of value by allowing for sales to occur. Thus, measures that capture service due to inventory availability, such as fill rates, are important assessments of the value associated with investing in stock.

Fill rates capture the degree to which orders placed by customers can be filled with inventory on hand, as discussed in Chapter 2, “Inventory Management

Fundamentals.” This is an important value measure, because it captures the extent to which the return on the inventory investment can be realized and, thus, provide value to the organization. Fill rates can be calculated in a variety of ways, primarily differentiated by the unit of analysis. For example, Line Item Fill Rate (LIFR) (which is different from the fill rate metric we discussed earlier in the book) measures the extent to which line items of a customer order are filled upon the first shipment. The measure is calculated as follows:

LIFR = Number of Order Lines Shipped on First Shipment/Number of Order Lines

Consider the customer that places an order consisting of ten products (one order line per product). Now, in the scenario where the manufacturer ships eight of the products (order lines) in an initial shipment and then follows up with shipping the remaining two products some days later, the LIFR for this purchase order is 80 percent. In other words, only 80 percent of the inventory associated with this order was available to provide immediate value to the manufacturer because the other 20 percent of order lines were not in stock or available.

In addition to fill rates at the order line level, firms also often measure them at the SKU level (Number of SKUs Shipped on First Shipment/Number of SKUs) and even at the dollar value level (Value of Order Lines Shipped on First Shipment/Total Order Value).

# Velocity Measures

Perhaps the most popular category of inventory management performance measures is the set of measures that assess inventory velocity. As was mentioned in Chapter 1, “Introduction to Inventory,” inventory is often used as an indication of the overall health and vitality of a firm’s supply chain operations. Considering that the primary emphasis of supply chains is to move product toward the customer, such that inventory can be converted into sales, the measures that

capture whether inventory is truly moving—and the rate at which it’s moving—are of significant importance. Velocity measures pertain to how quickly inventory is accepted and paid for by the customer.

Inventory turns has become one of the most adopted and utilized measures of inventory management effectiveness. As mentioned previously, supply chain consultants and researchers often use it to assess the velocity of a firm’s supply chain processes and operations. Again, it is calculated as follows:

Inventory Turns = Cost of Goods Sold/Average Inventory; where

Average Inventory = (Beginning Inventory + Ending Inventory)/2

Inventory turnover is best interpreted as the number of times that a firm’s inventory “turns over” or cycles through its supply chain network in a year. For example, if inventory turnover is 12, this means the average inventory moves through the network once per month; inventory turnover of 4 means the average inventory circulates through the supply chain every three months. A common inventory management goal focuses on improving inventory turnover by increasing the amount of turns, on average, in a year. Low inventory turnover means that a firm is carrying too much inventory, causing a slower supply chain speed, or velocity. This perhaps unnecessarily restricts access to cash that the firm could be using to invest in more profit-generating activities.

Another popular velocity measure is Days of Inventory On-Hand (DOI). This measure is essentially a further interpolation of the inventory turns measure, but it puts the velocity assessment into days instead of turns. There are a few ways to calculate DOI:

DOI = 365/Inventory Turns

Or:

DOI = Average Inventory/(Cost of Good Sold/365); where

Average Inventory = (Beginning Inventory + Ending Inventory)/2

DOI measures the average number of days a product or line of products spends in inventory. If average days of inventory in hand are small, the organization is said to have a high inventory velocity, which suggests an efficient supply chain. Furthermore, firms with a low DOI require less working capital to invest in inventory, allowing saved working capital to be utilized for other purposes.

Another velocity metric that has grown in popularity is the Cash-to-Cash Cycle (C2C). C2C, which is also referred to as the Cash Conversion Cycle, expresses the length of time in days that it takes for a company to convert resource inputs, such as inventories, into cash flows. In essence, C2C attempts to capture the amount of time each net input dollar is tied up in the production and sales process before it is converted into cash through sales to customers. This metric is composed of the amount of time associated with selling inventory (Days of Inventory), collecting receivables (Days of Sales Outstanding), and paying the bills of the firm (Days of Payable Outstanding). Thus, C2C is calculated as

C2C = DOI + DSO – DPO; where,

DOI = Average Inventory/(Cost of Goods Sold/365)

DSO = Average Receivables/(Sales/365)

DPO = Average Payables/(Cost of Goods Sold/365)

The shorter the cycle, the less time capital is tied up in the supply chain. Of course, C2C is more than a reflection of inventory, as it is driven by not only how well the organization manages its inventory, but also how it handles payment and receivables terms. However, it is considered an extremely important inventory velocity measure, as it captures how long inventory takes to be converted from cash-out to cash-in.

# Variance Measures

Variance measures are assessments of inventory accuracy. Thus, this category of measures focuses on the extent to which inventory records are correctly managed and are a true representation of the firm’s inventory levels. The foundations of variance measures are cycle counts and perpetual inventory management. Hence, inventory records are maintained continuously, and portions of inventory are physically counted as a comparison.

There are no predominant means of measuring inventory variance, but in their simplest form, these measures capture the degree of difference (or variance) between on-hand and on-record inventory. A few approaches involve

Inventory Variance = |Inventory Count-Inventory On-Record|/Inventory Count

Thus, the absolute value of the difference between the physical count and on-record amount is divided by the amount of the physical count. This can be multiplied by 100 to get a percentage. For example, consider the firm that has 95 items in

inventory based on the cycle count and 100 items per its inventory records. The inventory variance would be 5/95, or roughly 5 percent.

Other methods involve comparing the value of the inventory difference in dollars (that is, the absolute value of the difference between the dollar value of counted inventory versus the dollar value of the inventory on record), and even an extension of this approach, whereby the dollar value is assigned either a positive or negative value depending on the direction of any difference. For example, a firm that physically counts 100 items valued at $5, but expected 95 items at $5, would find that its inventory is over by $25, or +$25. If the firm had expected 101 items, its inventory would be under by $5, or –$5.

Overall, these approaches to capturing variance provide organizations with a snapshot of the degree of accuracy reflected in the records used to manage perpetual inventory. These measures are of particular importance in the retail industry, where inventory inaccuracies can have significant impacts on lost sales. Moreover, the adoption of more advanced cycle counting techniques, such as leveraging RFID technology, have shown to provide more immediate visibility to record inaccuracies and potential variance issues.

# MEASUREMENT SYSTEMS AND FRAMEWORKS

Beyond the articulation of measures that are often used to capture inventory management performance, it is also important to highlight the ways that many firms gain visibility to these measures. With so many items in inventory to be managed, inventory measures available, and interrelated aspects associated with measuring supply chain performance, the tracking and monitoring of measures can be overwhelming. Many firms have found it beneficial to go beyond just measuring inventory performance and have applied management frameworks to their inventory performance monitoring.

# MANAGEMENT BY EXCEPTION

Management by exception (MBE) is the practice of examining the financial and operational performance of a firm, and bringing to the attention of management only those results that represent significant differences from budgeted or expected measurement thresholds. For example, a replenishment manager might be required to notify upper management of those SKUs whose Out-of-Stock Percentage falls below 95 percent. Or, management might request to be made aware of scenarios where inventory variance measures reach a point that the magnitude of inaccuracies goes above or below a $1,000 threshold.

It is easy to see that the overall purpose of the management by exception concept is to only manage the most important variances from the planned direction or results

of the business. MBE can be beneficial because it reduces the amount of financial and operational results that management must review, allowing for a more efficient inventory measurement process. However, one potential drawback of management by exception is the fact that the exceptions are based on a budget or threshold against which results are compared. If the expectations and budgets are not well formulated, variances from them may prove to be irrelevant or bring attention to issues that could detract from more important management areas. Also, MBE can often require an additional layer of oversight, as the compilation of exceptions may necessitate full-time attention of a responsible party.

# MEASUREMENT DASHBOARDS

To manage performance measures by exception, many organizations have found it beneficial to adopt and implement dashboard systems. In essence, performance measurement dashboards are systems that help to visually represent KPIs (that is, inventory measures) and provide a means of gathering a snapshot of those KPIs. Many dashboard systems use sophisticated color-coding techniques to indicate potential problem areas or exceptions. Thus, it is possible for management to monitor dashboard systems to engage in managing inventory performance by exceptions only. The dashboard may, for example, indicate that the LIFR has gotten into a “red zone,” whereby the LIFR performance measure has gone below a level considered acceptable. Management can now determine the best plans-ofaction to address this issue and investigate potential root causes.

Another popular performance measurement framework is the balanced scorecard (BSC).10 The balanced scorecard is a performance planning and management system used extensively to align business processes and activities to the vision and strategy of the firm. According to developers Kaplan and Norton, the purpose of the BSC is to monitor KPIs against the strategic direction of the firm by mixing strategic nonfinancial performance measures with traditional financial metrics, thus giving managers and executives a more “balanced” view of organizational performance. This is done by comparing each measure to a target value within a single concise report, thus allowing for management by exception. According to Eckerson,11 one of the primary differences between performance dashboards and the BSC concept is that the dashboard tracks performance, where the BSC tracks progress. In essence, the balanced scorecard also gives light to the company’s vision and mission because these two elements must always be the basis for preparing a balanced scorecard.

While the balanced scorecard concept was not specifically developed for supply chain performance measurement, it has become a popular framework to articulate the goals and performance of a firm’s supply chain operations. The BSC considers four categories of performance: financial, customer service, internal business processes, and learning/growth. In a supply chain BSC context, these categories are

used to track how well the firm is managing supply chain costs and service. Because inventory is such a large portion of supply chain costs, and has such a great impact on supply chain service outcomes, applying the BSC to supply chain management inevitably captures inventory performance.

The financial aspect of the BSC focuses on the financial performance of the firm. This BSC element would, therefore, involve several of the inventory measures mentioned previously, particularly measures such as Sales to Working Capital and Gross Margin Return on Inventory Investment. In other words, inventory measures that focus specifically on the financial aspects of inventory performance would be considered in the financial component of the BSC.

The customer BSC component deals with how well the organization can service customers and impact positive customer perceptions. Thus, inventory-related measures such as fill rates and Out-of-Stock Percentages would be appropriate here, as these measures are assessments of how well the firm is maintaining inventory levels that allow for customer order fulfillment.

Measures such as those that highlight inventory accuracy and velocity could be considered aspects of the Internal Business Processes component of the BSC. This section focuses on how well the firm is managing its operations and the degree to which processes are run efficiently. Thus, the aforementioned inventory measure categories are often used here, because metrics such as inventory turns and inventory variance provide a snapshot into how well the firm is being managed.

Finally, the BSC captures performance relative to how well the firm has developed in terms of innovation, growth, and improvement initiatives. This can clearly be applied to inventory management, as it provides a framework to allow for assessments of not only how well inventory is being managed but also the relative improvements of inventory management performance.

Overall, the BSC has proven to be a useful tool for organizing inventory performance measures. As mentioned in the opening of this chapter, there are several inventory performance metrics that a firm can utilize, and frameworks such as the BSC help organizations ensure that measures are managerially relevant and strategically appropriate.

# ENDNOTES

1. Ellram, Lisa M., and Martha C. Cooper. “Supply Chain Management: It’s All About the Journey, Not the Destination.” Journal of Supply Chain Management 50.1 (2014): 8-20. Greer, Bertie M., and Peter Theuri. “Linking Supply Chain Management Superiority to Multifaceted Firm Financial Performance.” Journal of Supply Chain Management48.3 (2012): 97-106.

2. Ellinger, Alexander E., et al. “Supply Chain Management Competency and Firm Financial Success.” Journal of Business Logistics32.3 (2011): 214-226.   
3. Bliemel, Friedhelm. “Inventory Decisions by Trade-Off Analysis: A New Approach in Product-Oriented Marketing Strategies.” Journal of Business Logistics 1.2 (1979): 103-119. Sheffi, Yosef, Babak Eskandari, and Haris N. Koutsopoulos. “Transportation Mode Choice Based on Total Logistics Costs.” Journal of Business Logistics 9.2 (1988): 137-154. Zinn, Walter, and Howard Marmorstein. “Comparing Two Alternative Methods of Determining Safety Stock Levels: The Demand and the Forecast Systems.” Journal of Business Logistics 11.1 (1990): 95-110.   
4. Campbell, James F. “Designing Logistics Systems by Analyzing Transportation, Inventory and Terminal Cost Tradeoffs.” Journal of Business Logistics 11.1 (1990): 159-179.   
5. Eroglu, Cuneyt, and Christian Hofer. “Lean, Leaner, Too Lean? The Inventory-Performance Link Revisited.” Journal of Operations Management 29.4 (2011): 356-369. Hofer, Christian, Cuneyt Eroglu, and Adriana Rossiter Hofer. “The Effect of Lean Production on Financial Performance: The Mediating Role of Inventory Leanness.” International Journal of Production Economics 138.2 (2012): 242-253. Eroglu, Cuneyt, and Christian Hofer. “Inventory Types and Firm Performance: Vector Autoregressive and Vector Error Correction Models.” Journal of Business Logistics 32.3 (2011): 227-239.   
6. Waller, Matthew A., Pratibha A. Dabholkar, and Julie J. Gentry. “Postponement, Product Customization, and Market-Oriented Supply Chain Management.” Journal of Business Logistics 21.2 (2000): 133-160.   
7. Stassen, Robert E., and Matthew A. Waller. “Logistics and Assortment Depth in the Retail Supply Chain: Evidence from Grocery Categories.” Journal of Business Logistics 23.1 (2002): 125-143.   
8. Ingene, Charles A., and Robert F. Lusch. “The Declining Rate of Return on Capital in US Retailing.” International Journal of Physical Distribution and Logistics Management 11.1 (1981): 25-39.   
9. Notice the difference between this metric and PPIS, introduced inChapter 2.   
10. Kaplan, Robert S., and David P. Norton. “Using the Balanced Scorecard as a Strategic Management System.” Harvard Business Review 74.1 (1996): 75-85.   
11. Eckerson, Wayne W. “Deploying Dashboards and Scorecards.” The Data Warehouse Institute (2006): 1-24.