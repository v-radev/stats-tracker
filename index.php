<!doctype html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>Test page</title>
    <script type="text/javascript" src="jquery-1.11.2.js"></script>
    <script type="text/javascript" src="stats-tracker.js"></script>
</head>
<body>

<a href="index.php" id="pageRefresh" class="clickable">Refresh</a>
<a href="index.php" id="goLink" class="ignore">Go</a>
<a href="index.php" id="returnLink" class="only">Return</a>
<a href="index.php" id="backLink" class="only">Back</a>

<br/><br/>

<div style="background:blue;">Some text here</div>

<br/>

<div id="incredibleDiv" style="background:blue;">Element</div>

<br/>

<div id="awesomeDiv" class="cool" style="background:blue;">Element</div>

<br/>

<div class="cool" style="background:blue;">Another element</div>

<script type="text/javascript">

    var stats = new Stats();

    stats.track();

    window.addEventListener("beforeunload", function(){
        stats.write();
    });

</script>
</body>
</html>