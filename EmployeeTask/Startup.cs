using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EmployeeTask.Startup))]
namespace EmployeeTask
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
