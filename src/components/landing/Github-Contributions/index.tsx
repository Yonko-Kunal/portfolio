import { Suspense } from "react";

import { getGitHubContributions } from "../../../data/Github-Contributions";
import { Panel } from "./panel";
import { GitHubContributionFallback, GitHubContributionGraph } from "./graph";
import Container from "@/components/common/Container";

export function GitHubContributions() {
  const contributions = getGitHubContributions();

  return (
    <div className="border-t border-b border-currentColor/20">
      <Container className="border-l border-r border-currentColor/20">
        <Panel>
          <h2 className="sr-only">GitHub Contributions</h2>

          <Suspense fallback={<GitHubContributionFallback />}>
            <GitHubContributionGraph contributions={contributions} />
          </Suspense>
        </Panel>
      </Container>

    </div>
  );
}
