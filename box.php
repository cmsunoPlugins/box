<?php
session_start(); 
if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])!='xmlhttprequest') {sleep(2);exit;} // ajax request
if(!isset($_POST['unox']) || $_POST['unox']!=$_SESSION['unox']) {sleep(2);exit;} // appel depuis uno.php
?>
<?php
include('../../config.php');
include('lang/lang.php');
// ********************* actions *************************************************************************
if (isset($_POST['action']))
	{
	switch ($_POST['action'])
		{
		// ********************************************************************************************
		case 'plugin': ?>
		<div class="blocForm">
			<h2><?php echo _("Box");?></h2>
			<p><?php echo _("This plugin allows you to add small blocks of content. For example: a date, an address, a phone number.");?></p>
			<p><?php echo _("It can also add a big HTML content as a sidebar or something else. For this you should choose HTML editor.");?></p>
			<p><?php echo _("Just insert the code");?>&nbsp;<code>[[box-<?php echo _("nameofthebox");?>]]</code>&nbsp;<?php echo _("in the template or in the page content.");?></p>
			<p><?php echo _("You can create as many box as you need.");?></p>
			<h3><?php echo _("Add a box :");?></h3>
			<table class="hForm">
				<tr>
					<td><label><?php echo _("Name of the box");?></label></td>
					<td>
						<input type="text" class="input" name="boxName" id="boxName" style="width:80px;margin-right:20px;" value="" />
						<select name="boxEd" id="boxEd">
							<option value="T"><?php echo _("Plain text");?></option>
							<option value="E"><?php echo _("HTML Editor");?></option>
						</select>
						<div class="bouton" style="margin:0;" onClick="f_add_box(document.getElementById('boxName').value,document.getElementById('boxEd').options[document.getElementById('boxEd').selectedIndex].value);" title="<?php echo _("Add the box");?>"><?php echo _("Add");?></div>
					</td>
				</tr>
			</table>
			<h3><?php echo _("Existing boxes :");?></h3>
			<form id="frmBox">
				<table id="curBox"></table>
			</form>
			<div class="bouton fr" onClick="f_save_box();" title="<?php echo _("Save settings");?>"><?php echo _("Save");?></div>
			<div class="clear"></div>
		</div>
		<?php break;
		// ********************************************************************************************
		case 'save':
		$q = file_get_contents('../../data/busy.json'); $a = json_decode($q,true); $Ubusy = $a['nom'];
		$a = array(); $c=0;
		foreach($_POST as $k=>$v)
			{
			if ($k!='action' && $k!='unox')
				{
				$a['box'][$c]['n'] = substr($k,1); // name
				$a['box'][$c]['t'] = substr($k,0,1); // type
				$a['box'][$c]['b'] = stripslashes(str_replace('<','&lt;',$v)); // box content
				}
			++$c;
			}
		$out = json_encode($a);
		if (file_put_contents('../../data/'.$Ubusy.'/box.json', $out)) echo _('Backup performed');
		else echo '!'._('Impossible backup');
		break;
		// ********************************************************************************************
		}
	clearstatcache();
	exit;
	}
?>
