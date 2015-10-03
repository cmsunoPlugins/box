<?php
if(!isset($_SESSION['cmsuno'])) exit();
?>
<?php
if(file_exists('data/'.$Ubusy.'/box.json'))
	{
	$q1 = file_get_contents('data/'.$Ubusy.'/box.json');
	$a1 = json_decode($q1,true);
	if(isset($a1['box'])) foreach($a1['box'] as $a2)
		{
		$Uhtml = str_replace('[[box-'.$a2['n'].']]',str_replace('&lt;','<',$a2['b']),$Uhtml);
		$Ucontent = str_replace('[[box-'.$a2['n'].']]',str_replace('&lt;','<',$a2['b']),$Ucontent);
		}
	}
?>
