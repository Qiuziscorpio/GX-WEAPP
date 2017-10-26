const common = {
	shiftMoney(num) {
		num = num * 0.01; //分到元
		num += ''; //转成字符串
		var reg = num.indexOf() > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g; //千分符的正则
		return num = num.replace(reg, '$1,'); //千分位格式化
	}
}

export default common