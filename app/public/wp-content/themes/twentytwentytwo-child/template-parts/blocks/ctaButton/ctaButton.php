<?php 
$blockName = "cta-button";
$label = get_field('label');
$destination = get_field('destination');
$align = get_field('align');

?>
<div class="<?php echo $blockName; ?>">
<?php 
echo $label = get_field('label');

?>
</div>
<style>
  .<?php 
echo $blockName;

?>{
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    display: inline-block;
    background: #ec489a;
}  
</style>