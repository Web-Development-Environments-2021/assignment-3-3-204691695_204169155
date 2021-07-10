<template>
  <div class="col-lg-4 mb-5">
    <div class="bg-light p-4 rounded">
        <div class="widget-body">
            <div class="widget-vs">
                <div class="d-flex align-items-center justify-content-around justify-content-between w-100">
                    <div class="team-1 text-center">
                        <img src="../assets/logo.png" alt="Image">
                        <h3>Team 1</h3>
                    </div>
                    <div>
                        <span class="vs"><span>VS</span></span>
                    </div>
                    <div class="team-2 text-center">
                        <img src="../assets/logo.png" alt="Image">
                        <h3>Team 2</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center widget-vs-contents mb-4">
            <h4>League Name</h4>
            <p class="mb-5">
            <span class="d-block">December 20th, 2020</span>
            <span class="d-block">9:30 AM GMT+0</span>
            <strong class="text-primary">Staduim</strong>
            </p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"MatchPreview",
}
</script>

<style>
.widget-body {
  padding: 20px;
}
.widget-vs {
  width: 100%; }
  .widget-vs img {
    max-width: 120px; }
  .widget-vs h3 {
    color: #fff;
    font-weight: 700;
    font-size: 18px; }
  .widget-vs .vs > span {
    display: inline-block;
    font-size: 12px;
    background: #ee1e46;
    padding: 5px 20px;
    border-radius: 30px;
    color: #fff;
    font-weight: 700; 
}
.widget-vs-contents {
  padding-bottom: 0px; }
  .widget-vs-contents h4 {
    color: #ee1e46;
    font-size: 16px;
    font-weight: 700;
}
.team-vs .team-1, .team-vs .team-2 {
    padding: 30px; 
}
.team-vs .team-2 {
    position: relative;
}
.team-vs .team-2:before {
    position: absolute;
    background: #f6d743;
    background: #ee1e46;
    content: "";
    left: -12%;
    right: 0;
    top: 0;
    width: 200%;
    height: 200%;
    -webkit-transform: skew(-15deg);
    -ms-transform: skew(-15deg);
    transform: skew(-15deg);
}

</style>