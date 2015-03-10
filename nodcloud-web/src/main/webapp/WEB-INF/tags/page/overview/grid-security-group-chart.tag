<%@ tag pageEncoding="utf-8" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags/common" %>
<%@ taglib prefix="charts" tagdir="/WEB-INF/tags/common/charts" %>
<div class="grid simple">
    <tags:gridtitle title="安全组"/>
    <div class="grid-body no-border grid-content-center">
        <charts:easyPie id="raw-security-group-summary" value="0"/>
    </div>
</div>